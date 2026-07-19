---
title: 'Lesson 14 — End-to-End Designs'
---

# Lesson 14 — End-to-End Designs

> **Module 4 · Real Designs & Interview · Lesson 14 of 15**

Put it all together. We design three classic systems end-to-end using the building blocks from Lessons 4–13.

## Design 1 — URL Shortener (e.g. bit.ly)

**Requirements:** given a long URL, return a short key; redirect; high read volume.
**Estimation:** 100M new URLs/mo, 1B reads/mo.
**Design:**

```
write: client -> LB -> app -> [hash(longUrl)] -> store (key->url) in DB + cache
read:  GET /abc -> LB -> app -> cache? -> DB -> 301 redirect
```

- **Key gen:** base62 of a counter or hash; check collision.
- **Store:** NoSQL (DynamoDB) keyed by short key; **cache** hot keys in Redis.
- **Redirect:** 301 (cacheable) vs 302 (track clicks) — tradeoff.
- **Scale:** read-heavy → heavy caching + CDN for static; replicas for DB.

## Design 2 — Twitter timeline (post + feed)

**Requirements:** post tweet; see following users' tweets.
**Challenge:** fan-out. Writing to followers' timelines is expensive at scale.
**Two strategies:**

- **Fan-out on write (push):** post → write to each follower's timeline. Fast reads, heavy writes for celebrities.
- **Fan-out on read (pull):** read → query each followed user's tweets, merge. Cheap writes, slow reads.
- **Hybrid:** push to most, pull for celebrities (celebrity = pull).

```
post -> queue -> for each follower: add to their timeline (cache)
timeline read -> get own timeline (cached, sorted)
```

## Design 3 — Rate-limited API / web crawler (brief)

- Crawler: politeness (robots.txt, delay), distributed queues per domain, dedup (Bloom filter), store at scale (S3 + index).
- API: gateway + token-bucket per key in Redis + circuit breakers to backends.

## 4. Exercise

<ExerciseBox title="Design a chat app" difficulty="Hard">
Design a 1:1 + group chat: messages delivered in real time, persisted, searchable. Pick sync vs async, store, cache, scaling. Sketch the components.
</ExerciseBox>

## 5. Self-Test (Flashcards)

<Quiz storageKey="quiz-sd-14" :cards="[
  { q: 'URL shortener redirect: 301 vs 302?', a: '301 = cacheable (less load, no click tracking); 302 = not cached (track clicks).' },
  { q: 'Fan-out on write vs read?', a: 'Write pushes to followers (fast read, heavy write); read pulls at read time (cheap write, slow read).' },
  { q: 'Hybrid fan-out?', a: 'Push to normal users, pull for celebrities to avoid storm.' },
  { q: 'Why a queue in the timeline design?', a: 'Decouples post from fan-out; absorbs bursts, enables retries.' }
]" />

## 6. Resources

<ResourceTable title="Lesson 14 — further reading" :resources="[
  { label: 'System Design Primer (examples)', platform: 'GitHub', type: 'Book', url: 'https://github.com/donnemartin/system-design-primer' },
  { label: 'Designing a URL shortener', platform: 'Official', type: 'Docs', url: 'https://www.geeksforgeeks.org/system-design-url-shortening-service/' },
  { label: 'Twitter architecture', platform: 'Official', type: 'Docs', url: 'https://www.infoq.com/presentations/Twitter-Timeline-Scalability/' }
]" />

## 7. Checklist

<ProgressChecklist :items="['Designed URL shortener', 'Explained fan-out push/pull', 'Used cache + queue + DB', 'Sketched a chat app']" storageKey="system-design/14-end-to-end-designs" />

> Use the [Live Editor](/editor) to take notes as you learn.
