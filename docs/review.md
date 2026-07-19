---
title: Spaced Repetition Review
---

# 🧠 Spaced Repetition Review

A dashboard of every flashcard deck you've studied across the site. It reads your browser's local schedule (set by each 🧠 Flashcards box) and shows what's **due now** vs. scheduled for later.

<ClientOnly>
  <StreakWidget />
  <SrsDashboard />
</ClientOnly>

> Reviews live in your browser only — this dashboard has no server. Study a few cards on any lesson, then return here to see your schedule. Nothing here is sent anywhere.

## How it works

1. Each lesson/course page has a **🧠 Flashcards** box with spaced repetition (SM-2).
2. As you rate cards *Again / Hard / Good*, the due dates are saved in `localStorage`.
3. This page scans all saved decks, groups them by course, and highlights what's due.

> Tip: pair this with the [Progress Dashboard](/progress) to track course completion alongside memory retention.
