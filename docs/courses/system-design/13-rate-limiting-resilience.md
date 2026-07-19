---
title: 'Lesson 13 — Rate Limiting & Resilience'
---

# Lesson 13 — Rate Limiting & Resilience

> **Module 3 · Architecture Patterns · Lesson 13 of 15**

Systems fail; good designs **degrade gracefully**. Rate limiting protects; resilience patterns recover.

## 1. Rate limiting algorithms

- **Token bucket**: tokens refill at rate; burst allowed up to capacity.
- **Leaky bucket**: fixed outflow; smooths bursts.
- **Fixed/Calendar window**: count per window — simple but allows 2x at boundary.
- **Sliding window log**: accurate, memory-heavy.

## 2. Where & what

- Per-user, per-IP, per-API-key limits.
- Return **429** with `Retry-After`.
- Use a fast store (Redis) shared across nodes.

## 3. Resilience patterns

- **Retry + backoff (with jitter):** avoid thundering herd on recovery.
- **Circuit breaker:** open after N failures, fail fast, half-open to test recovery.
- **Timeout:** never wait forever.
- **Bulkhead:** isolate failures (one pool per dependency).
- **Fallback/cache:** serve stale on failure.

<ExampleBox title="Circuit breaker states" lang="text">

```
 CLOSED --failures--> OPEN --timeout--> HALF-OPEN --success--> CLOSED
                              |                         |
                           (still failing) ---------->
```

</ExampleBox>

## 4. Exercises

<ExerciseBox title="Pick algorithm" difficulty="Easy">
An API must allow bursts of 100 req but 10/sec steady. Which algorithm and why?
</ExerciseBox>

<ExerciseBox title="Cascading failure" difficulty="Medium">
Service A calls B calls C; C is slow. Without timeouts/breakers, what happens? Describe the cascade and two fixes.
</ExerciseBox>

## 5. Self-Test (Flashcards)

<Quiz storageKey="quiz-sd-13" :cards="[
  { q: 'Token vs leaky bucket?', a: 'Token bucket allows bursts up to capacity; leaky bucket smooths to constant rate.' },
  { q: 'Why jitter on retries?', a: 'Prevents synchronized retry storms (thundering herd) after recovery.' },
  { q: 'What does a circuit breaker do?', a: 'Opens after failures to fail fast, then half-opens to test recovery.' },
  { q: 'What is a bulkhead?', a: 'Isolating dependencies into pools so one failure does not exhaust all resources.' }
]" />

## 7. Resources

<ResourceTable title="Lesson 13 — further reading" :resources="[
  { label: 'Rate limiting (Cloudflare)', platform: 'Official', type: 'Docs', url: 'https://www.cloudflare.com/learning/bots/what-is-rate-limiting/' },
  { label: 'Resilience patterns', platform: 'Official', type: 'Docs', url: 'https://learn.microsoft.com/en-us/azure/architecture/patterns/category/resiliency' },
  { label: 'Circuit Breaker (Martin Fowler)', platform: 'Official', type: 'Docs', url: 'https://martinfowler.com/bliki/CircuitBreaker.html' }
]" />

## 8. Checklist

<ProgressChecklist :items="['Token/leaky/sliding window', 'Rate limit placement + 429', 'Retry+backoff+jitter', 'Circuit breaker + bulkhead']" storageKey="system-design/13-rate-limiting-resilience" />

> Use the [Live Editor](/editor) to take notes as you learn.
