---
slug: the-cli-is-the-platform
title: The CLI is the platform, whether you meant it to be or not
authors: [marcus]
tags: [Developer experience]
description: Your abstraction is only as good as its command surface. Notes on designing a CLI engineers do not fight.
---

Your abstraction is only as good as its command surface. Engineers judge the platform by the
first three commands they type, not by your architecture diagram.

<!-- truncate -->

## The command surface is the product

Verbs should match intent, and defaults should match the common case. If the first command a
new engineer runs fails, no diagram will win them back.

## Errors that say what to do next

A good error names the problem and the next command. A bad one prints a stack trace and a
shrug. The error path is part of the design, not an afterthought.

## Same command everywhere

The same command should work locally and in CI. The moment they diverge, engineers stop
trusting the CLI and start scripting around it.
