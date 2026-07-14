---
slug: notes-from-the-paved-road
title: Notes from building the paved road
authors: [platform-team]
tags: [platform, golden-paths]
---

The first golden path we shipped was not the one we planned. We planned "deploy a service."
We shipped "get a Postgres database in under a minute" — because that was the ticket queue
everyone was actually stuck in.

<!-- truncate -->

## The lesson

A platform earns adoption by removing a *specific*, *felt* pain — not by announcing a
capability. We had a beautiful service-scaffolding flow ready, and almost nobody used it,
because scaffolding a repo was never the bottleneck. Provisioning a database was.

So the rule we now follow when picking the next paved road:

1. **Find the queue.** Where do tickets pile up and people wait on a human?
2. **Pave that, end to end.** Self-service from request to ready — no hand-offs.
3. **Bake the guardrails into the path**, not into a review gate.
4. **Measure adoption**, not launch. If the numbers don't move, the path is wrong.

The paved road is a product. Ship the part people are already waiting for, and the rest of
the platform earns the right to exist.
