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

## Compute is the easy half

You can add regions. Spinning up more compute is a capacity exercise with a known playbook.

## Data is the hard half

What is the source of truth, how stale can a replica be, and what happens to a write during a
partition? These are the questions that actually decide your architecture.

## Decide consistency first

Pick the consistency model up front; the routing config falls out of it, not the other way
around. Teams that start from the load balancer end up rewriting the data layer twice.
