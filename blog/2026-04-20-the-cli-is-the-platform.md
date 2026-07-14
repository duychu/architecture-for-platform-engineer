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

Notes on designing a CLI engineers do not fight: verbs match intent, defaults match the common
case, errors say what to do next, and the same command works locally and in CI. The CLI is the
product surface — treat it like one.
