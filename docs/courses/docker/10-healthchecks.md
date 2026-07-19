---
title: Healthchecks
---

# Module 10 — Resource Limits & Health: Healthchecks

A container can be "running" yet unable to serve traffic. A healthcheck lets Docker (and orchestrators) distinguish healthy from unhealthy and act accordingly — restarting, stopping routing, or delaying dependent startup.

<ExampleBox title="HEALTHCHECK in a Dockerfile" lang="dockerfile">
```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=20s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1
```
</ExampleBox>

For Compose services without a baked-in check, define it inline:

<ExampleBox title="Healthcheck in compose.yaml" lang="yaml">
```yaml
services:
  db:
    image: postgres:16
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 10s
```
</ExampleBox>

Inspect the result with:

<ExampleBox title="Check health status" lang="bash">
```bash
docker inspect --format '&#123;&#123; .State.Health.Status &#125;&#125;' myapp
docker ps      # shows (healthy)/(unhealthy) in STATUS
```
</ExampleBox>

Key points:
- Exit code `0` = healthy, `1` = unhealthy; the check runs on the container's own network/localhost.
- `start_period` grace time prevents early failures during boot; `retries` controls how many failures before "unhealthy".
- Orchestrators use health to route traffic and restart unhealthy containers; plain `docker run` shows status but does not auto-restart.
- Avoid expensive checks; keep them fast and dependency-light.

<ExerciseBox title="Add a healthcheck to your image" difficulty="Easy">
Add a `HEALTHCHECK` to a Dockerfile that curls a `/health` endpoint. Build and run it, then watch `docker ps` transition from `(health: starting)` to `(healthy)`.
</ExerciseBox>

<ExerciseBox title="Gate startup with depends_on" difficulty="Medium">
Give a database service a `healthcheck` and make an app service depend on `condition: service_healthy`. Run the stack and use `docker compose ps` to confirm the app only becomes ready after the database is healthy.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-healthchecks" :cards="[
  { q: 'In a HEALTHCHECK, what exit codes mean healthy versus unhealthy?', a: 'Exit <code>0</code> = healthy; exit <code>1</code> = unhealthy.' },
  { q: 'What is the purpose of <code>start_period</code> in a healthcheck?', a: 'It gives the app grace time during boot before failures count against it.' },
  { q: 'How do you see a container\'s health status?', a: '<code>docker inspect --format \'&#123;&#123; .State.Health.Status &#125;&#125;\'</code> or <code>docker ps</code> shows (healthy)/(unhealthy).' },
  { q: 'Does <code>docker run</code> auto-restart an unhealthy container?', a: 'No; plain docker run only shows the status. Orchestrators restart unhealthy containers.' }
]" />

## Resources

<ResourceTable title="Healthchecks" :resources="[
  { label: 'HEALTHCHECK in Dockerfile', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/builder/#healthcheck' },
  { label: 'Compose healthcheck', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/compose/' },
  { label: 'Container health guides', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/docker/' },
  { label: 'Healthcheck tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/docker/' },
  { label: 'Healthchecks explained', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=QjzI2QZj3k0' }
]" />

## Checklist

<ProgressChecklist :items="['Added a HEALTHCHECK', 'Inspected health status']" storageKey="docker/10-healthchecks" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
