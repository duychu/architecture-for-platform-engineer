---
slug: runbooks-that-survive-3am
title: Runbooks that survive contact with 3am
authors: [sam]
tags: [Operations]
description: A runbook you only read during an incident is already too late. Making them executable, tested, and boring.
---

A runbook you only read during an incident is already too late. If it has not run since it was
written, assume it is wrong.

<!-- truncate -->

We make runbooks executable, tested, and boring: each step is a command the on-call can run
(or a script the platform runs for them), exercised on a schedule so drift is caught in
daylight, not at 3am. Boring is the goal — surprise is the enemy of recovery.
