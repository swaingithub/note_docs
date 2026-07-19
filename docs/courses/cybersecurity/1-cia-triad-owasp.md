---
title: CIA Triad & OWASP
---

# Fundamentals: CIA Triad & OWASP

Security rests on the **CIA triad**: Confidentiality (only authorized access), Integrity (data isn't tampered with), and Availability (systems stay up). The **OWASP Top 10** lists the most critical web application security risks.

<ExampleBox title="Mapping controls to the triad" lang="yaml">

```yaml
confidentiality: encryption at rest + in transit (TLS), access control
integrity:       hashes/HMAC, digital signatures, checksums
availability:    redundancy, rate limiting, DDoS protection
owasp_top_10:
  - A01 Broken Access Control
  - A02 Cryptographic Failures
  - A03 Injection
  - A07 Identification & Authentication Failures
```
</ExampleBox>

Key points:
- **Confidentiality**: keep secrets secret (encryption, ACLs).
- **Integrity**: detect tampering (hashes, signatures).
- **Availability**: resist outages and abuse (redundancy, throttling).
- OWASP Top 10 is the baseline checklist for web app security.
- Security is a trade-off: stronger controls often add latency or cost.

<ExerciseBox title="Classify controls" difficulty="Easy">

For each of three controls (password hashing, TLS, load balancer), state which CIA property it primarily protects and why.

</ExerciseBox>

<ExerciseBox title="OWASP mapping" difficulty="Medium">

Name the OWASP Top 10 risk that best matches "an API lets a user fetch another user's records by changing an id" and describe a fix.

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Listed the Top 10', 'Explained the CIA triad']" storageKey="cybersecurity/1-cia-triad-owasp" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-1-cia-triad-owasp" :cards="[
{ q: 'What are the three CIA properties?', a: 'Confidentiality, Integrity, and Availability.' }, { q: 'What protects confidentiality?', a: 'Encryption and access control.' }, { q: 'What detects tampering (integrity)?', a: 'Hashes, HMAC, or digital signatures.' }, { q: 'What is A01 in the OWASP Top 10?', a: 'Broken Access Control.' }
]" />

## Resources

<ResourceTable title="CIA Triad & OWASP Resources" :resources="[
  { label: 'OWASP Top 10', platform: 'Official', type: 'Docs', url: 'https://owasp.org/www-project-top-ten/' },
  { label: 'Cyber Security Basics', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/cybersecurity/index.php' },
  { label: 'Cyber Security (GeeksforGeeks)', platform: 'GeeksforGeeks', type: 'Tutorial', url: 'https://www.geeksforgeeks.org/cyber-security/' },
  { label: 'Security Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=inWWhr9oI8U' }
]" />
