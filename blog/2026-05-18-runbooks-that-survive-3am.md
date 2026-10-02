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

## Make them executable

Each step is a command the on-call can run — or a script the platform runs for them. Prose
that describes what you *should* do is a suggestion; a command is a runbook.

## Test them in daylight

Exercise runbooks on a schedule so drift is caught at noon, not at 3am. A runbook that has not
been run recently is documentation, not a tool.

## Boring is the goal

Surprise is the enemy of recovery. The best runbook is one the on-call has seen succeed a
dozen times before the night it matters.
