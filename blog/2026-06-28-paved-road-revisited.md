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

A good golden path removes decisions — runtime, pipeline shape, base image, observability
wiring. A bad one just adds a form in front of the same decisions. If your "paved road"
still asks the team to pick a logging stack, it is a toll booth, not a road.

Keep the happy path genuinely happy: fewer prompts, sane defaults, and a documented exit for
the 20% who need to leave it.
