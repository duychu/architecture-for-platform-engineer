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

We migrated to SPIFFE-issued, short-lived workload identities across three regions. Pods now
receive an identity, not a credential; the mesh mints and rotates it. No long-lived secrets
live in the workload, and revocation is a control-plane action rather than a secret rotation
scramble.
