---
slug: killing-long-lived-credentials
title: Killing long-lived credentials with workload identity
authors: [wei]
tags: [Security]
description: Every secret in a pod is a liability. Our migration to SPIFFE-issued, short-lived identities across three regions.
---

Every secret in a pod is a liability — it can leak, it rarely rotates, and it outlives the
workload that needed it.

<!-- truncate -->

## Identity, not credentials

We migrated to SPIFFE-issued, short-lived workload identities across three regions. Pods now
receive an identity, not a credential; the mesh mints and rotates it automatically.

## Revocation becomes a control-plane action

No long-lived secrets live in the workload, so revocation is a control-plane change rather
than a frantic secret-rotation scramble across every cluster.

## The migration path

We ran both models in parallel, cut over service by service behind a flag, and deleted the
static credentials only after the identity path carried real traffic.
