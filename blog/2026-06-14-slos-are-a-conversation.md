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

We wired the budget into the deploy pipeline: when it is healthy, ship; when it is spent, the
team *chooses* to slow down because they can see the cost. The number is computed the same way
for every service, so the conversation is about risk, not about whose metric is right.
