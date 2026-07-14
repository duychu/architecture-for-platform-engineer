---
slug: error-budgets-are-a-conversation
title: Error budgets are a conversation, not a gate
authors: [platform-team]
tags: [reliability, slo]
---

An error budget is not a number that blocks deploys. It is a shared language that lets a
product team and a platform team argue about risk *with the same units*.

<!-- truncate -->

## Why teams get this wrong

The failure mode is treating the budget as an automated gate: "budget spent → freeze
deploys." That turns a conversation into a tripwire, and teams learn to game the SLI rather
than improve reliability.

What the budget is *for*:

- **Making the trade explicit.** Shipping faster spends reliability; the budget prices it.
- **Aligning incentives.** When the budget is healthy, ship. When it's exhausted, the
  team *chooses* to slow down — because they can see the cost, not because a robot said no.
- **Ending the "is it reliable enough?" argument.** The SLO answers it, once, in advance.

## The platform team's job

Give every service the three signals wired at deploy time, compute the budget the same way
for everyone, and make it visible. Then get out of the way. The budget is a thermostat the
teams read — not a lock you hold the key to.
