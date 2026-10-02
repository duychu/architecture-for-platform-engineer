---
slug: slos-are-a-conversation
title: SLOs are a conversation, not a dashboard
authors: [dana]
tags: [Observability]
description: Error budgets only work when product and platform share the same number. How we wired budgets into the deploy pipeline.
---

Error budgets only work when product and platform share the same number. A dashboard nobody
negotiates over is just wall art.

<!-- truncate -->

## One number, shared

The budget is computed the same way for every service, so the conversation is about risk, not
about whose metric is right. Product and platform look at the same figure and make the same
trade.

## Wire it into the pipeline

When the budget is healthy, ship. When it is spent, the team *chooses* to slow down because
they can see the cost — not because a robot blocked the deploy. The gate is a signal, not a
lock.

## What it replaces

The endless "is it reliable enough?" argument. The SLO answers it once, in advance, so every
release decision is already framed.
