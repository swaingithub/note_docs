---
title: Multi-Environment Compose
---

# Module 7 — Docker Compose: Multi-Environment Compose

Real projects need different settings for development, staging, and production. Compose supports this through multiple files merged in order and through variable substitution, so you keep one base definition and layer differences on top.

<ExampleBox title="Base + override pattern" lang="bash">
```bash
docker compose -f compose.yaml -f compose.prod.yaml up -d
```
</ExampleBox>

The later file wins on conflicting keys. A typical setup keeps `compose.yaml` for shared services and `compose.prod.yaml` for production-only overrides like replicas, resource limits, and restart policies.

<ExampleBox title="Variable substitution in compose.yaml" lang="yaml">
```yaml
services:
  app:
    image: myapp:${TAG:-latest}
    deploy:
      replicas: ${REPLICAS:-1}
    environment:
      LOG_LEVEL: ${LOG_LEVEL:-info}
```
</ExampleBox>

Key points:
- `${VAR:-default}` uses `default` when `VAR` is unset; `${VAR}` requires it to be set (Compose errors if missing).
- Pass variables with a `.env` file in the project directory or inline: `TAG=2.0 REPLICAS=3 docker compose up -d`.
- `docker compose up -d --scale worker=3` increases replica count for non-Swarm stacks (prefer `deploy.replicas` for Swarm).

<ExerciseBox title="Split dev and prod configs" difficulty="Medium">
Create `compose.yaml` with a base web service and `compose.prod.yaml` that sets `restart: unless-stopped` and `deploy.replicas: 2`. Run both with `-f` flags and confirm the production override applies via `docker compose config`.
</ExerciseBox>

<ExerciseBox title="Parameterize with env vars" difficulty="Easy">
Use `${TAG}` and `${PORT}` in your compose file, provide them through a `.env` file, and run the stack. Change the values in `.env` and re-run to confirm the exposed port and image tag change.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-multi-environment-compose" :cards="[
  { q: 'What does <code>${VAR:-default}</code> do in a Compose file?', a: 'Uses <code>default</code> when VAR is unset; <code>${VAR}</code> requires it to be set.' },
  { q: 'When merging multiple Compose files, which file wins on conflicting keys?', a: 'The later file wins; e.g. <code>-f compose.yaml -f compose.prod.yaml</code> applies prod overrides.' },
  { q: 'How do you scale a service in a non-Swarm stack?', a: 'Use <code>docker compose up -d --scale worker=3</code> (or <code>deploy.replicas</code> for Swarm).' },
  { q: 'How can you pass variables like TAG to Compose?', a: 'Via a <code>.env</code> file in the project directory or inline, e.g. <code>TAG=2.0 docker compose up -d</code>.' }
]" />

## Resources

<ResourceTable title="Multi-Environment Compose" :resources="[
  { label: 'Compose environment variables', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/compose/' },
  { label: 'Docker env tutorials', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/docker/' },
  { label: 'Docker guides', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/docker/' },
  { label: 'Docker Compose walkthrough', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=QjzI2QZj3k0' },
  { label: 'Compose samples', platform: 'GitHub', type: 'GitHub', url: 'https://github.com/docker/awesome-compose' }
]" />

## Checklist

<ProgressChecklist :items="['Used multiple -f files', 'Used variable substitution', 'Scaled a service']" storageKey="docker/7-multi-environment-compose" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
