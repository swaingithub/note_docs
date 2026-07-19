---
title: 'Lesson 6 — CDN & Edge'
---

# Lesson 6 — CDN & Edge

> **Module 2 · Core Building Blocks · Lesson 6 of 15**

A CDN (Content Delivery Network) caches content at **edge locations** close to users, slashing latency and origin load.

## 1. How it works

```
user (Tokyo)
   → nearest edge (Tokyo)  → HIT → return cached
   → MISS → fetch from origin (us-east-1) → cache → return
```

## 2. Cache keys & invalidation

- **Cache key** = usually URI + headers (e.g. `Accept-Encoding`). Too broad = low hit rate; too narrow = misses.
- **TTL** via `Cache-Control: max-age=3600`.
- **Invalidation**: purge by path; prefer versioned URLs (`app.v2.js`) over purges.

## 3. Static vs dynamic

- Static (images, JS, video): perfect CDN fit.
- Dynamic (API): use **edge compute** (CloudFront Functions, Workers) for auth/rewrite; or cache with short TTL + `Vary`.

## 4. Benefits

- Lower latency, offloaded origin, DDoS absorption, TLS at edge.

<ExampleBox title="Cache-Control" lang="http">

```http
Cache-Control: public, max-age=86400, stale-while-revalidate=3600
```

</ExampleBox>

## 5. Exercises

<ExerciseBox title="Cache strategy" difficulty="Easy">
A logo changes rarely; a user avatar changes often. Propose Cache-Control + URL strategy for each.
</ExerciseBox>

<ExerciseBox title="Hit ratio" difficulty="Medium">
Explain how adding a query string `?utm=...` to every request hurts CDN hit rate, and how to fix it (cache-key normalization).
</ExerciseBox>

## 6. Self-Test (Flashcards)

<Quiz storageKey="quiz-sd-6" :cards="[
  { q: 'What is a CDN hit vs miss?', a: 'Hit = served from edge cache; Miss = fetched from origin then cached.' },
  { q: 'Why version URLs instead of purge?', a: 'Versioned URLs (app.v2.js) let old/new coexist and avoid purge latency/storms.' },
  { q: 'What does stale-while-revalidate do?', a: 'Serves stale content while fetching fresh in the background.' },
  { q: 'How do UTM params hurt caching?', a: 'They change the cache key per request, lowering hit rate; normalize the key.' }
]" />

## 7. Resources

<ResourceTable title="Lesson 6 — further reading" :resources="[
  { label: 'CloudFront Developer Guide', platform: 'Official', type: 'Docs', url: 'https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/' },
  { label: 'Caching best practices', platform: 'Official', type: 'Docs', url: 'https://web.dev/articles/http-cache' }
]" />

## 8. Checklist

<ProgressChecklist :items="['Explained CDN path', 'Know cache key + TTL', 'Used versioned URLs', 'Know edge compute']" storageKey="system-design/6-cdn-edge" />

> Use the [Live Editor](/editor) to take notes as you learn.
