---
slug: paved-road-revisited
title: "The paved road, revisited: what a golden path actually removes"
authors: [marcus]
tags: [Reference architecture]
description: Golden paths fail when they add ceremony instead of removing decisions. A field guide to keeping the happy path genuinely happy.
---

Golden paths fail when they add ceremony instead of removing decisions. The test is simple:
does the paved road remove choices a team would otherwise have to make?

<!-- truncate -->

## Remove decisions, not effort

A good golden path removes decisions — runtime, pipeline shape, base image, observability
wiring. A bad one just adds a form in front of the same decisions. If your "paved road" still
asks the team to pick a logging stack, it is a toll booth, not a road.

## Keep the happy path happy

Fewer prompts, sane defaults, and a documented exit for the 20% who need to leave the road.
The moment the paved path is slower than going around it, engineers go around it — and you
have built a bottleneck with better branding.

## Measure the road, not the launch

Adoption is the only score that matters: what fraction of new services take the paved path,
and how fast do they reach production? If those numbers are not moving, the road is in the
wrong place.
