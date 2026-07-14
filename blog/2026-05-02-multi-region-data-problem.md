---
slug: multi-region-data-problem
title: Multi-region is a data problem wearing a compute costume
authors: [priya]
tags: [Reference architecture]
description: Active-active sounds like a load-balancer setting. It is really a set of consistency decisions you make once and live with.
---

Active-active sounds like a load-balancer setting. It is really a set of consistency decisions
you make once and live with for years.

<!-- truncate -->

Compute is the easy half — you can add regions. The hard half is data: what is the source of
truth, how stale can a replica be, and what happens to a write during a partition? Decide the
consistency model first; the routing config falls out of it, not the other way around.
