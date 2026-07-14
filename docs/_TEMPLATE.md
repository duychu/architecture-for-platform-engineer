---
title: "<Paper title: a system-design topic>"
description: "<One sentence: what a reader learns and decides.>"
sidebar_label: "<Short sidebar label>"
---

<!--
  WHITE-PAPER TEMPLATE — copy this file, don't edit it in place.

  House rules:
    • Diagram-first. If a picture can carry the idea, let it. Prose = captions + "why".
    • High-level only. Boxes/arrows/flows, NOT config. No Helm/Terraform/YAML dumps.
    • Every paper MUST end with critical thinking: what breaks, what to challenge.

  Diagram engines:
    • Mermaid  → DEFAULT. Flow, sequence, state, class, decision trees, gantt.
    • PlantUML → ONLY when clearly better: C4 (context/container/component),
                 deployment, rich component diagrams. Rendered view-time (see README).
  Delete these comments and all <angle-bracket> placeholders before publishing.
-->

# <Paper title>

## TL;DR

<2–3 sentences. The whole idea, compressed. A reader who stops here should still
walk away with the core mental model.>

## Why it matters (platform lens)

<What problem does this design solve *for the platform team and its users*? Who feels
the pain today, and what does "good" look like? 3–5 sentences or a short bullet list.>

## The Big Picture

<ONE primary diagram of the moving parts. This is the heart of the paper.>

```mermaid
flowchart TB
    subgraph Users["Who uses it"]
        U["Developers / Consumers"]
    end
    subgraph System["The system"]
        A["Component A"] --> B["Component B"]
        B --> C["Component C"]
    end
    U --> A
```

*Caption: one line on how to read the diagram — the thing the reader should notice.*

## How it works

<The key workflow, end to end. Prefer a sequence diagram for request/response or
provisioning flows.>

```mermaid
sequenceDiagram
    actor Dev as Developer
    participant P as Platform
    participant R as Resource
    Dev->>P: Request (self-service)
    P->>R: Provision / act
    R-->>P: Ready
    P-->>Dev: Result + feedback
```

## Design decisions & tradeoffs

<The decisions that actually matter, as tables. Give a default AND the tension.>

| Decision | Option A | Option B | Default & why |
| --- | --- | --- | --- |
| <Axis 1> | <A> | <B> | <pick + one-line reason> |
| <Axis 2> | <A> | <B> | <pick + one-line reason> |

<Optional: a decision tree for "which path do I take?">

```mermaid
flowchart TD
    Q1{"<First question?>"} -->|Yes| P1["<Path 1>"]
    Q1 -->|No| Q2{"<Second question?>"}
    Q2 -->|Yes| P2["<Path 2>"]
    Q2 -->|No| P3["<Path 3>"]
```

<Use PlantUML instead of Mermaid ONLY for C4 / deployment / rich component views.
Example (delete if unused):>

```plantuml
@startuml
' A C4-ish container view. Rendered view-time via the PlantUML server.
skinparam componentStyle rectangle
actor Developer
rectangle "System" {
  [Interface]  as UI
  [Service]    as SVC
  database "Store" as DB
}
Developer --> UI
UI --> SVC
SVC --> DB
@enduml
```

## Failure modes & critical questions

<The "think like a platform engineer" section. This is mandatory. Do not skip.>

- **What breaks first?** <blast radius, single points of failure>
- **What's the hidden cost?** <cognitive load, operational toil, $$$>
- **What assumption is load-bearing?** <name it — what happens when it's false?>
- **How do we know it's working?** <the signal / metric that proves it, not vibes>
- **What would make me choose the opposite?** <the honest counter-argument>

## Golden-path implementation checklist

<High-level, ordered steps. The "paved road", not the config. Keep it portable.>

1. <Step — what, not how>
2. <Step>
3. <Step>
4. <Step — how you'll measure success>

## Anti-patterns / when NOT to do this

- ❌ **<Anti-pattern>** — <why it bites, what to do instead>
- ❌ **<Anti-pattern>** — <why it bites>
- ⚠️ **Skip this design when** <the conditions where it's overkill or wrong>

## Further reading

- <Source / book / talk — 1 line on why it's worth your time>
- <Source>
