---
title: CPU & Memory Limits
---

# Module 10 — Resource Limits & Health: CPU & Memory Limits

Without limits, a single container can consume all host memory or CPU and starve everything else. Setting explicit constraints keeps the host stable and makes capacity planning predictable.

<ExampleBox title="Set limits at runtime" lang="bash">
```bash
docker run -d --memory=512m --memory-swap=512m --cpus=1.0 myapp
docker update --cpus=2 --memory=1g myapp     # change at runtime
```
</ExampleBox>

In Compose, declare limits per service:

<ExampleBox title="Limits in compose.yaml" lang="yaml">
```yaml
services:
  app:
    image: myapp:1.0
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: "1.0"
        reservations:
          memory: 256M
          cpus: "0.5"
```
</ExampleBox>

Key points:
- `--memory` caps RAM; `--memory-swap` equal to `--memory` disables swap so the container cannot burst into swap.
- `--cpus` is a fractional limit (e.g. `1.5` = one and a half cores). `docker update` changes limits on a running container.
- `reservations` are soft guarantees used by orchestrators for scheduling, not hard caps.
- Going over a memory limit triggers the OOM killer, which stops the container — always set limits in production.

<ExerciseBox title="Constrain a noisy container" difficulty="Easy">
Run a container with `--memory=128m --cpus=0.5` and use a stress tool or `docker stats` to observe that usage stays within the limits. Then raise the limit with `docker update` and confirm it changes.
</ExerciseBox>

<ExerciseBox title="Declare limits in Compose" difficulty="Medium">
Add `deploy.resources.limits` and `reservations` to a service in `compose.yaml`, start the stack, and verify the effective limits with `docker inspect &lt;id> | grep -A5 Memory`. Explain the difference between limit and reservation.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-cpu-memory-limits" :cards="[
  { q: 'What does setting <code>--memory-swap</code> equal to <code>--memory</code> do?', a: 'It disables swap so the container cannot burst into swap space.' },
  { q: 'What is a fractional value like <code>--cpus=1.5</code>?', a: 'A limit of one and a half CPU cores.' },
  { q: 'How do you change a running container\'s limits?', a: 'With <code>docker update --cpus=2 --memory=1g &lt;container&gt;</code>.' },
  { q: 'What is the difference between a limit and a reservation?', a: 'A limit is a hard cap; a reservation is a soft scheduling guarantee, not a cap.' }
]" />

## Resources

<ResourceTable title="CPU & Memory Limits" :resources="[
  { label: 'Resource constraints', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/config/containers/resource_constraints/' },
  { label: 'Runtime options (CPU/mem)', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/run/' },
  { label: 'Docker resource limits', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/docker/' },
  { label: 'Limits tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/docker/' },
  { label: 'Resource limits video', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=QjzI2QZj3k0' }
]" />

## Checklist

<ProgressChecklist :items="['Set memory limit', 'Set CPU limit', 'Updated at runtime']" storageKey="docker/10-cpu-memory-limits" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
