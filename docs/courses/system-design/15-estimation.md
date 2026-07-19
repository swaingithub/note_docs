---
title: 'Lesson 15 — Estimation & Capacity Planning'
---

# Lesson 15 — Estimation & Capacity Planning

> **Module 4 · Real Designs & Interview · Lesson 15 of 15**

Back-of-the-envelope math shows whether a design fits. Interviewers expect quick, sane estimates.

## 1. Powers of 2 (memory)

| Value | Size |
|-------|------|
| 2^10 | 1 KB |
| 2^20 | 1 MB |
| 2^30 | 1 GB |
| 2^40 | 1 TB |

## 2. Requests per second

```
1M users, 1 req/user/day, 100K sec/day
≈ 1M / 100K = 10 req/s average
peak ≈ 10 × 3 = 30 req/s (use 2-5x for peaks)
```

## 3. Storage estimate

```
100M URLs/mo × 500 bytes = 50 GB/mo → ~600 GB/yr
+ replicas/copies → ~2 TB
```

## 4. Bandwidth

```
1B reads/mo × 0.5 KB = 500 GB/mo
÷ (30×86400s) ≈ 200 KB/s ≈ 1.6 Mbps
```

## 5. Worked example (URL shortener)

- **Read:write ratio:** ~10:1 → optimize reads (cache).
- **Cache hit 90%:** only 10% hit DB → DB does ~100M reads/mo ÷ 10 = 10M/mo.
- **Nodes:** 1 modern server handles ~5–10K req/s; 30 req/s peak → 1–2 app nodes + replicas suffice at start.

## 6. Exercise

<ExerciseBox title="Estimate a video site" difficulty="Medium">
Estimate storage + bandwidth for a site with 1M videos (avg 100 MB), 10M views/day at 100 MB each. State assumptions clearly.
</ExerciseBox>

## 7. Self-Test (Flashcards)

<Quiz storageKey="quiz-sd-15" :cards="[
  { q: 'Why estimate in interviews?', a: 'To show the design fits (nodes, storage, bandwidth) and to make tradeoffs explicit.' },
  { q: 'How convert daily users to req/s?', a: 'requests/day ÷ seconds/day (86400), then × peak factor (2-5x).' },
  { q: 'What is a sane cache-hit assumption?', a: '90% is common for read-heavy workloads; tune by data.' },
  { q: 'Why state assumptions?', a: 'Estimates are only as good as assumptions; explicit ones let interviewers correct them.' }
]" />

## 8. Resources

<ResourceTable title="Lesson 15 — further reading" :resources="[
  { label: 'System Design Primer (estimation)', platform: 'GitHub', type: 'Book', url: 'https://github.com/donnemartin/system-design-primer#step-3-back-of-the-envelope' },
  { label: 'Latency numbers every engineer should know', platform: 'Official', type: 'Docs', url: 'https://gist.github.com/jboner/2841832' }
]" />

## 9. Checklist

<ProgressChecklist :items="['Know powers-of-2', 'Estimated req/s + storage', 'Estimated bandwidth', 'Sized a design end-to-end']" storageKey="system-design/15-estimation" />

> Use the [Live Editor](/editor) to take notes as you learn.
