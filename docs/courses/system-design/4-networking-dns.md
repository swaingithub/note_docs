---
title: 'Lesson 4 — Networking & DNS'
---

# Lesson 4 — Networking & DNS

> **Module 2 · Core Building Blocks · Lesson 4 of 15**

Every distributed system rides on the network. Know **the request path, DNS, TCP, and HTTP** cold — interviewers probe these constantly.

## 1. What happens when you type a URL

```
browser
  → DNS resolve (domain → IP)
  → TCP handshake (SYN/SYN-ACK/ACK)
  → TLS handshake (cert verify)
  → HTTP request
  → load balancer / CDN
  → app servers → DB/cache
  → response back
```

## 2. DNS

- **Resolver** → root → TLD (`.com`) → authoritative (returns A/AAAA/CNAME).
- Record types: **A** (IPv4), **AAAA** (IPv6), **CNAME** (alias), **MX** (mail), **TXT** (verify), **NS** (delegation).
- **TTL** controls caching duration — lower TTL = faster propagation, more queries.
- **Anycast** DNS routes to nearest healthy server.

<ExampleBox title="Inspect DNS" lang="bash">

```bash
dig +short example.com
dig example.com NS
nslookup -type=AAAA example.com
```

</ExampleBox>

## 3. TCP vs UDP

| | TCP | UDP |
|---|-----|-----|
| Connection | yes (handshake) | none |
| Reliable | yes (retx, order) | no |
| Use | HTTP, DB, SSH | DNS, video, games, metrics |

## 4. HTTP essentials

- **Keep-alive** reuses connections; **HTTP/2** multiplexes streams; **HTTP/3** runs on QUIC (UDP).
- **Idempotency**: GET/PUT/DELETE safe to retry; POST not.
- **Status**: 2xx ok, 3xx redirect, 4xx client, 5xx server.

## 5. Exercises

<ExerciseBox title="Trace a request" difficulty="Easy">
Use `curl -v https://example.com` and identify the TCP + TLS + HTTP phases in the output. Note the resolved IP.
</ExerciseBox>

<ExerciseBox title="DNS records" difficulty="Medium">
Create a mental model: a domain `api.shop.com` is a CNAME to `shop-elb.us-east-1.elb.amazonaws.com`. Explain what a client resolves step by step and why TTL matters during a failover.
</ExerciseBox>

## 6. Self-Test (Flashcards)

<Quiz storageKey="quiz-sd-4" :cards="[
  { q: 'What does a DNS A record return?', a: 'An IPv4 address for the domain name.' },
  { q: 'TCP vs UDP in one line?', a: 'TCP is connection-oriented and reliable; UDP is connectionless and fast but unreliable.' },
  { q: 'Why does TTL matter?', a: 'It sets how long resolvers cache a record; low TTL = fast failover, more queries.' },
  { q: 'Which HTTP methods are idempotent?', a: 'GET, PUT, DELETE (safe to retry); POST is not.' }
]" />

## 7. Resources

<ResourceTable title="Lesson 4 — further reading" :resources="[
  { label: 'DNS explained (Cloudflare)', platform: 'Official', type: 'Docs', url: 'https://www.cloudflare.com/learning/dns/what-is-dns/' },
  { label: 'HTTP/2 explained', platform: 'Official', type: 'Docs', url: 'https://developers.google.com/web/fundamentals/performance/http2' },
  { label: 'Computer Networking (top-down)', platform: 'Book', type: 'Book', url: 'https://gaia.cs.umass.edu/kurose_ross/' }
]" />

## 8. Checklist

<ProgressChecklist :items="['Can trace a URL request', 'Explained DNS resolution', 'Know TCP vs UDP', 'Know HTTP status classes + idempotency']" storageKey="system-design/4-networking-dns" />

> Use the [Live Editor](/editor) to take notes as you learn.
