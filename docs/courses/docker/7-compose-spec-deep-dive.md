---
title: Compose Spec Deep Dive
---

# Module 7 — Docker Compose: Compose Spec Deep Dive

Beyond the basics, the Compose spec offers fine control over builds, startup ordering, and developer workflows. Mastering these keys lets you create stacks that are reproducible in production and pleasant to work with locally.

<ExampleBox title="Build, command, healthcheck, profiles, watch" lang="yaml">
```yaml
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        VERSION: 1.2.3
    command: ["node", "server.js"]
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 10s
      timeout: 3s
      retries: 3
      start_period: 20s
    env_file:
      - .env
    profiles:
      - full
    develop:
      watch:
        - action: sync
          path: ./src
          target: /app/src
        - action: rebuild
          path: Dockerfile
```
</ExampleBox>

Key points:
- `build.args` passes build-time variables into the Dockerfile; `command` overrides the image's default command.
- `healthcheck.start_period` gives the app time to boot before failures count against it; combine with `depends_on.condition: service_healthy`.
- `profiles` keeps optional services (e.g. admin tooling) from starting unless you enable the profile: `docker compose --profile full up`.
- `develop.watch` enables live reload during local development without rebuilding the image.

Override files layer on top of the base config for environment-specific tweaks:

<ExampleBox title="Local override" lang="bash">
```bash
docker compose -f compose.yaml -f compose.override.yaml up
```
</ExampleBox>

<ExerciseBox title="Gate startup with a healthcheck" difficulty="Medium">
Add a `healthcheck` to a service using `curl -f` against a `/health` route, set `start_period` to 20s, and make a dependent service wait on `service_healthy`. Verify the ordering with `docker compose up`.
</ExerciseBox>

<ExerciseBox title="Use profiles and watch" difficulty="Easy">
Add a `profiles: ["debug"]` adminer service to an existing stack and configure `develop.watch` to sync a local `./src` folder. Start the full stack with `--profile debug` and confirm live reload works.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-compose-spec-deep-dive" :cards="[
  { q: 'What does <code>build.args</code> do in compose.yaml?', a: 'It passes build-time variables into the Dockerfile during the build.' },
  { q: 'What does <code>healthcheck.start_period</code> do?', a: 'Gives the app time to boot before healthcheck failures count against it.' },
  { q: 'How do you start optional services gated by a profile?', a: 'Run <code>docker compose --profile &lt;name&gt; up</code>.' },
  { q: 'What does <code>develop.watch</code> enable?', a: 'Live reload during local development without rebuilding the image.' }
]" />

## Resources

<ResourceTable title="Compose Spec Deep Dive" :resources="[
  { label: 'Compose file reference', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/compose/' },
  { label: 'Docker tutorial hub', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/docker/' },
  { label: 'Docker for beginners', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/docker/' },
  { label: 'Docker Compose explained', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=QjzI2QZj3k0' },
  { label: 'Awesome Compose', platform: 'GitHub', type: 'GitHub', url: 'https://github.com/docker/awesome-compose' }
]" />

## Checklist

<ProgressChecklist :items="['Used healthcheck', 'Used profiles', 'Used watch', 'Used override file']" storageKey="docker/7-compose-spec-deep-dive" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
