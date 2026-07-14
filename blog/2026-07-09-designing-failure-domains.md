---
slug: designing-failure-domains
title: Designing failure domains before you design features
authors: [priya]
tags: [Architecture]
description: Most platform outages trace back to a boundary nobody drew on a diagram. Here is how we reason about blast radius across the control, data, and edge planes — and the three questions we ask before shipping any new reconciler.
---

Most platform outages trace back to a boundary nobody drew on a diagram. Before we design a
feature, we design where it is allowed to fail.

<!-- truncate -->

We reason about blast radius across three planes — control, data, and edge — and ask three
questions before shipping any new reconciler:

1. **What is the blast radius if this fails closed?** And if it fails open?
2. **Which plane owns the state?** State that crosses a plane boundary is a failure domain
   you did not mean to create.
3. **Can a tenant take down a neighbor through this path?** If yes, it is not done.

A failure domain you drew on purpose is a design. One you discover in an incident is a bug.
