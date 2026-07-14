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

## Draw the boundary first

A failure domain you drew on purpose is a design. One you discover in an incident is a bug.
We sketch the blast radius across three planes — control, data, and edge — before a line of
code is written, and we mark every place state crosses a plane boundary.

## The three questions

Before shipping any new reconciler, we ask:

1. **What is the blast radius if this fails closed?** And if it fails open?
2. **Which plane owns the state?** State that crosses a plane boundary is a failure domain
   you did not mean to create.
3. **Can a tenant take down a neighbor through this path?** If yes, it is not done.

## Why it pays off

Designing the failure domain up front turns incident response from archaeology into a lookup:
you already know what this component can take down, because you decided it on purpose.
