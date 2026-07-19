---
title: Expert Knowledge Standard
---

# Expert Knowledge Standard

Use this page as the quality bar for every DevNotes lesson. A page is **10/10** only when it teaches the concept, shows the real-world tradeoffs, proves the idea with examples, and gives the learner a way to verify mastery.

## The 10/10 Lesson Rubric

| Dimension | 10/10 Standard |
| --- | --- |
| Mental model | Explains the core idea in plain language, then connects it to the underlying mechanism. |
| Production reality | Covers performance, reliability, security, failure modes, costs, and operational tradeoffs where relevant. |
| Worked examples | Includes runnable code, commands, queries, diagrams, or configurations that demonstrate the idea end to end. |
| Edge cases | Names what breaks, when the simple explanation stops working, and how professionals debug it. |
| Comparisons | Explains alternatives and when to choose each one. |
| Practice | Includes easy, medium, and hard exercises with a clear success condition. |
| Assessment | Includes flashcards or questions that test understanding, not memorization only. |
| Sources | Prefers official docs, specifications, papers, books, and battle-tested engineering references. |
| Navigation | Fits into a clear learning path with prerequisites and next steps. |
| Polish | Uses consistent headings, correct terminology, clean code formatting, and no broken links. |

## Required Structure

Every expert-grade lesson should include:

1. **What you will learn** - concrete outcomes.
2. **Prerequisites** - what the reader must already understand.
3. **Mental model** - the simple explanation.
4. **Deep mechanics** - what actually happens under the hood.
5. **Worked example** - runnable or reproducible.
6. **Production notes** - security, reliability, performance, observability, and cost.
7. **Failure modes** - common mistakes, symptoms, and fixes.
8. **Decision guide** - when to use this, avoid this, or choose an alternative.
9. **Exercises** - easy, medium, and hard.
10. **Self-test** - recall plus scenario questions.
11. **Resources** - authoritative references.

## Depth Levels

- **Level 1: Use it** - commands, syntax, and beginner examples.
- **Level 2: Understand it** - concepts, internals, diagrams, and tradeoffs.
- **Level 3: Operate it** - debugging, monitoring, scaling, deployment, and failure handling.
- **Level 4: Master it** - architecture choices, security posture, advanced patterns, and real case studies.

## Source Quality Rules

- Prefer official documentation first.
- Prefer original papers, specifications, and respected books for theory-heavy topics.
- Use tutorials only as secondary support.
- Avoid generic links when a better primary source exists.
- Add one sentence explaining why each resource matters when the lesson is advanced.
- Pull deep references from the [Expert Resource Library](/expert-resource-library).

## Upgrade Workflow

1. Keep the current beginner explanation.
2. Add missing depth sections instead of replacing everything.
3. Replace weak resources with authoritative ones.
4. Add at least one realistic failure mode.
5. Add at least one production checklist.
6. Run `npm.cmd run build` before calling the page complete.

Use the [Expert Mastery Roadmap](/expert-mastery-roadmap) to decide which courses and lessons to upgrade first.

## Definition of Done

A lesson is ready when a learner can:

- Explain the topic to another person.
- Build a small working example.
- Debug the most common failures.
- Compare it with alternatives.
- Apply it safely in a real project.
- Know where to continue learning.
