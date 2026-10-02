---
title: "Part 5 — Database secrets engine"
description: Replace shared database passwords with short-lived, per-workload credentials — how the database engine creates, leases and revokes users, when to use static roles, and what fails at scale.
sidebar_label: 5. Database engine
---

# Database secrets engine

## TL;DR

The database engine turns "the app's DB password" into **a fresh database user per
workload, per lease**. Vault holds one privileged connection per database; when a workload
reads `database/creds/<role>`, Vault runs your **creation statements** (`CREATE ROLE …
VALID UNTIL …`), returns the username/password with a **lease**, and runs the **revocation
statements** when the lease expires or is revoked. For accounts that must keep a fixed name,
**static roles** keep the username and rotate only the password. Both remove the shared,
never-rotated password — and both make Vault a dependency of every database connection.

## Why it matters (platform lens)

Database credentials are the classic long-lived secret: shared by every replica of a service
(and often by several services), copied into CI, laptops and runbooks, and never rotated
because rotation means downtime. When one leaks you cannot tell *which* consumer leaked it,
and revoking it breaks everyone.

With dynamic credentials:

- **Attribution** — every connection's username identifies the Vault token that created it.
- **Expiry by default** — a leaked credential dies with its lease, usually within hours.
- **Revocation by scope** — revoke one lease, one role, or every credential the engine issued.
- **No human knows a production password** — including the root one, after `rotate-root`.

## The Big Picture

```mermaid
flowchart LR
    subgraph Vault["Vault"]
        CFG["database/config/appdb<br/>connection + privileged user<br/>(allowed_roles)"]
        DR["database/roles/app-readonly<br/>dynamic: creation + revocation SQL, TTLs"]
        SR["database/static-roles/reporting<br/>static: fixed username, rotation_period"]
        EXP["Expiration manager<br/>(leases)"]
        DR --> CFG
        SR --> CFG
        DR --> EXP
    end
    APP1["payments-api pod 1"] -->|"read database/creds/app-readonly"| DR
    APP2["payments-api pod 2"] -->|"read database/creds/app-readonly"| DR
    BATCH["reporting job"] -->|"read database/static-creds/reporting"| SR
    CFG -->|"privileged connection<br/>(plugin: postgresql, mysql, mssql, mongodb...)"| PG[("PostgreSQL")]
    APP1 -.->|"v-token-app-read-AbC..."| PG
    APP2 -.->|"v-token-app-read-XyZ..."| PG
    BATCH -.->|"reporting_svc"| PG
```

*Caption: three objects — a **connection**, **dynamic roles** and **static roles**. Each
pod gets its **own** database user; the batch job keeps a stable username whose password
Vault rotates.*

## How it works

### Dynamic credentials: create → lease → revoke

```mermaid
sequenceDiagram
    autonumber
    participant W as Workload
    participant V as Vault database engine
    participant X as Expiration manager
    participant DB as PostgreSQL
    W->>V: read database/creds/app-readonly (token with policy)
    V->>V: Generate username v-token-app-read-... + random password
    V->>DB: CREATE ROLE "v-..." LOGIN PASSWORD '...' VALID UNTIL 'now+1h'
    V->>DB: GRANT app_readonly TO "v-..."
    V->>X: Register lease (default_ttl 1h, max_ttl 24h)
    V-->>W: username, password, lease_id, lease_duration
    W->>DB: Connect as v-...
    loop Every ~2/3 of TTL while healthy
        W->>V: lease renew (up to max_ttl)
    end
    alt Lease expires or is revoked
        X->>V: Revoke lease
        V->>DB: REVOKE ... and DROP ROLE "v-..."
    end
    Note over W,DB: At max_ttl the workload must read a NEW credential and reconnect
```

*Caption: `VALID UNTIL` is a belt-and-braces expiry inside the database itself — even if
Vault never runs the revocation, PostgreSQL refuses new logins after the deadline. Existing
sessions are not killed by `VALID UNTIL`, which is why revocation statements matter.*

### Static roles: fixed username, rotating password

```mermaid
sequenceDiagram
    participant V as Vault
    participant DB as PostgreSQL
    participant J as Reporting job
    V->>DB: ALTER ROLE reporting_svc PASSWORD 'new' (on create + every rotation_period)
    J->>V: read database/static-creds/reporting
    V-->>J: username reporting_svc, current password, ttl until next rotation
    Note over V,DB: rotate-role forces an immediate rotation
```

*Caption: use static roles when the username is load-bearing — legacy apps, third-party tools,
row-level security keyed on user name, or databases where creating users is expensive.*

### The root credential

Vault's connection user (`vault_admin` below) can create users, so it is the most sensitive
credential in the setup. `rotate-root` changes its password to one **only Vault knows**.
Run it right after configuring the connection — and make sure you have a break-glass path
(a separate admin account, held offline) before you do.

| | Dynamic roles | Static roles |
| --- | --- | --- |
| Username | New per lease (`v-token-…`) | Fixed (`reporting_svc`) |
| Created / dropped by Vault | Yes | No — must already exist |
| Rotation trigger | Every lease (expiry) | `rotation_period` / schedule, or `rotate-role` |
| Attribution per consumer | **Per lease** | Shared by all readers |
| Load on the database | User churn (CREATE/DROP) | Minimal |
| **Default** | **Services and humans** | Legacy apps, fixed-name integrations, very high fan-out |

## Hands-on setup

:::info Hands-on exception
Dev-mode lab, verified end-to-end against Vault 2.1 and PostgreSQL 16. Any PostgreSQL works;
adjust the connection URL.
:::

**1. Prepare PostgreSQL** (as a superuser, once):

```bash
psql -h 127.0.0.1 -U postgres -d appdb <<'SQL'
-- The user Vault connects as: can create roles, is not a superuser
CREATE ROLE vault_admin WITH LOGIN PASSWORD 'bootstrap-only' CREATEROLE;
-- A group role that holds the actual privileges; Vault only grants membership
CREATE ROLE app_readonly NOLOGIN;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO app_readonly;
-- PostgreSQL 16+: CREATEROLE alone is not enough to GRANT or ALTER other roles.
-- vault_admin needs ADMIN OPTION on every role it grants or rotates.
GRANT app_readonly TO vault_admin WITH ADMIN OPTION;
-- An existing account for the static-role example
CREATE ROLE reporting_svc WITH LOGIN PASSWORD 'initial';
GRANT reporting_svc TO vault_admin WITH ADMIN OPTION;
SQL
```

**2. Configure the engine:**

```bash
export VAULT_ADDR=http://127.0.0.1:8200 VAULT_TOKEN=root
vault secrets enable database

vault write database/config/appdb \
    plugin_name=postgresql-database-plugin \
    connection_url="postgresql://{{username}}:{{password}}@127.0.0.1:5432/appdb?sslmode=disable" \
    username="vault_admin" \
    password="bootstrap-only" \
    password_authentication="scram-sha-256" \
    allowed_roles="app-readonly,reporting"

vault write database/roles/app-readonly \
    db_name=appdb \
    creation_statements="CREATE ROLE \"{{name}}\" WITH LOGIN PASSWORD '{{password}}' VALID UNTIL '{{expiration}}' INHERIT; GRANT app_readonly TO \"{{name}}\";" \
    revocation_statements="REVOKE app_readonly FROM \"{{name}}\"; DROP ROLE IF EXISTS \"{{name}}\";" \
    default_ttl=1h \
    max_ttl=24h
```

**3. Use it:**

```bash
vault read database/creds/app-readonly
# username   v-token-app-read-nrR1jvXX8jzFgAKN0dym-1790941721
# password   BkQSSfth-...
# lease_id   database/creds/app-readonly/wlMTAAVqcyF3ywYTpfyV9eig

vault lease lookup  database/creds/app-readonly/<lease-id>
vault lease renew -increment=30m database/creds/app-readonly/<lease-id>
vault lease revoke  database/creds/app-readonly/<lease-id>   # Vault DROPs the role

# Incident button: revoke every credential this role ever issued
vault lease revoke -prefix database/creds/app-readonly
```

**4. Static role and root rotation:**

```bash
vault write database/static-roles/reporting \
    db_name=appdb username=reporting_svc rotation_period=24h
vault read database/static-creds/reporting          # current password + ttl to rotation
vault write -f database/rotate-role/reporting        # rotate now

vault write -f database/rotate-root/appdb            # vault_admin's password: now only Vault knows it
```

Dev-mode runs everything as root. In production, the workload's policy needs only
`read` on `database/creds/app-readonly`; lease renewal (`sys/leases/renew`) and token
self-renewal are already granted by the built-in `default` policy.

## Design decisions & tradeoffs

| Decision | Option A | Option B | Default & why |
| --- | --- | --- | --- |
| TTL | Long (24h+) | Short (1h) + renew, `max_ttl` hours–days | **Short** — renewals are cheap; set `max_ttl` to how long a pod can hold one connection pool |
| Privileges in SQL | Grant table privileges in `creation_statements` | Grant a **group role** | **Group role** — privilege changes happen in the DB, not by editing Vault roles |
| Object ownership | Dynamic users own objects they create | Objects owned by a fixed owner role | **Fixed owner** for migrations — a dropped dynamic user cannot own tables |
| Who reads creds | Each pod | One per deployment (shared via K8s Secret) | **Each pod** for attribution — unless the DB cannot handle the user churn |
| Connection user | Superuser | `CREATEROLE` + ADMIN OPTION on group roles | **Least privilege** — plus `rotate-root` |
| Network | Vault → DB directly | Vault → DB via private link / TGW | Vault must **reach every database** it manages — plan this in Part 3's network design |

```mermaid
flowchart TD
    Q1{"Can the app reconnect with<br/>new credentials (pool refresh)?"} -->|No| S["Static role<br/>(or fix the app first)"]
    Q1 -->|Yes| Q2{"Does the username matter?<br/>(RLS, grants, external tool)"}
    Q2 -->|Yes| S
    Q2 -->|No| Q3{"Thousands of short-lived<br/>consumers per minute?"}
    Q3 -->|Yes| S2["Dynamic role per deployment<br/>or static role - protect the DB"]
    Q3 -->|No| D["Dynamic role per pod"]
```

*Caption: dynamic-per-pod is the goal; the escape hatches exist for apps that cannot refresh
credentials and for fan-out that would overwhelm the database's catalog.*

## Failure modes & critical questions

- **What breaks first?** Applications that read credentials once at boot and never refresh.
  At `max_ttl` the user is dropped and every connection in the pool fails at the same moment.
  Test with a short `max_ttl` in staging.
- **What's the hidden cost?** **Lease explosion.** Every read creates a lease; CronJobs and
  autoscaling can create hundreds of thousands, slowing Vault's expiration manager and
  bloating storage. Watch the lease count per role; reuse credentials per pod, not per request.
- **What assumption is load-bearing?** That **revocation succeeds**. If the database is down
  or unreachable when a lease expires, Vault retries — meanwhile the user still exists.
  `VALID UNTIL` (or the engine's equivalent) is your safety net; not every database plugin has one.
- **What about a Vault outage?** Existing connections keep working; new pods cannot get
  credentials and renewals fail until Vault returns. Size lease TTLs against your Vault
  recovery time objective.
- **How do we know it's working?** No application config contains a database password; the
  DB's user list is almost entirely `v-…` users; the lease count per role is stable;
  `rotate-root` has been run on every connection.
- **What would make me choose the opposite?** Managed cloud databases with **IAM database
  authentication** (RDS/Aurora IAM auth, Cloud SQL IAM, Entra auth for Azure SQL/PostgreSQL)
  give short-lived tokens without Vault in the path. If every database supports it and every
  workload has a cloud identity, that can be simpler.

## Golden-path implementation checklist

1. For each database: create a least-privilege **connection user** and **group roles** per
   access level (`readonly`, `readwrite`, `migrate`).
2. Configure one connection per database; restrict `allowed_roles`; run **`rotate-root`**.
3. Create dynamic roles per access level with short TTLs; static roles only by exception.
4. Ensure the network path **Vault → database** exists (Part 3).
5. Deliver credentials via an agent or operator that **renews and refreshes the pool**.
6. Alert on lease count, revocation errors and database connection failures per role.

## Anti-patterns / when NOT to do this

- ❌ **Superuser as the connection user** — Vault (and anyone who compromises the mount config)
  can do anything to the database.
- ❌ **Reading new credentials per request** — creates a user per request; the database and
  Vault both suffer.
- ❌ **Hard-coding privileges in `creation_statements`** — every privilege change becomes a Vault
  change; grant group roles instead.
- ❌ **Skipping revocation statements** — "the TTL will handle it" leaves sessions and roles
  behind when `VALID UNTIL` is not supported.
- ⚠️ **Skip dynamic credentials when** the application cannot reload credentials and cannot
  be changed — use a static role so at least the password rotates.

## Further reading

- [Database secrets engine](https://developer.hashicorp.com/vault/docs/secrets/databases) —
  concepts, static roles, rotation schedules.
- [PostgreSQL plugin](https://developer.hashicorp.com/vault/docs/secrets/databases/postgresql) —
  connection options and statement templates.
- [PostgreSQL 16 `CREATEROLE` changes](https://www.postgresql.org/docs/16/release-16.html) —
  why ADMIN OPTION is now required.
- Previous: [Part 4 — Secrets engines & KV v2](./secrets-engines-kv2.md) ·
  Next: [Part 6 — Policies & delivery to apps](./policies-and-delivery.md)
