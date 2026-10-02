---
slug: secrets-series-vault-openbao
title: "New series: secrets management with Vault and OpenBao"
authors: [wei]
tags: [Security]
description: A six-part series on running Vault or OpenBao as the secrets platform — from the barrier and the seal to a central Vault in AWS serving EKS, AKS and GKE.
---

A secret you can't attribute, rotate or revoke is a liability. We just published a series on
the platform that fixes that: **Vault**, and its open-source fork **OpenBao**.

<!-- truncate -->

## Why a series, not a paper

Secrets management is about two separate things: **identity** (how a workload proves who it
is) and **secrets engines** (what it gets back, and for how long). Squeezing both into one
paper loses the part that matters most in real estates — how a single Vault serves clusters
spread across AWS accounts, Azure and GCP.

## What's in it

1. [How Vault works & why it's everywhere](/docs/secrets-management/how-vault-works) —
   barrier, seal, tokens, leases, policies, and Vault vs OpenBao.
2. [Authentication with common cloud platforms](/docs/secrets-management/auth-methods-cloud) —
   AWS IAM, Azure, GCP, Kubernetes and JWT/OIDC, and how to choose.
3. [Integration patterns](/docs/secrets-management/integration-patterns) — a central Vault in
   AWS serving EKS in other accounts, AKS and GKE.
4. [Secrets engines & KV v2](/docs/secrets-management/secrets-engines-kv2) — versioning,
   check-and-set, and a path layout that scales.
5. [Database secrets engine](/docs/secrets-management/secrets-engines-database) — per-pod,
   short-lived database users.
6. Policies & delivery to apps — coming next.

## One change to the house style

These papers keep the usual diagram-first layout, but each one adds a single, clearly marked
**hands-on** lab. We ran the KV v2 and PostgreSQL labs end to end on a dev server, so you can
see a lease expire for yourself.

If you read our [workload-identity migration](/blog/killing-long-lived-credentials) story,
this series covers the other half: what the workload does with its identity once it has one.

[Start with the series overview →](/docs/secrets-management/overview)
