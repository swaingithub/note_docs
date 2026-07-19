---
title: Compose Basics
---

# Module 7 — Docker Compose: Compose Basics

Docker Compose lets you define and run multi-container applications from a single declarative file. Instead of typing long `docker run` commands, you describe your services, networks, and volumes in `compose.yaml` and manage the whole stack with a few commands.

<ExampleBox title="A minimal compose.yaml (web + database)" lang="yaml">
```yaml
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: pw
      POSTGRES_DB: app
    volumes:
      - db-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app"]
      interval: 10s
      retries: 5

  app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      db:
        condition: service_healthy
    environment:
      DB_URL: postgres://app:pw@db:5432/app

volumes:
  db-data:
```
</ExampleBox>

Key points:
- The top-level `services` key lists each container; `image` pulls a base or `build` builds from a Dockerfile in context.
- `depends_on` with `condition: service_healthy` waits for the database to be ready before starting the app.
- Named volumes declared under the top-level `volumes` key persist data independently of the container lifecycle.

Common lifecycle commands:

<ExampleBox title="Managing the stack" lang="bash">
```bash
docker compose up -d            # build (if needed) and start in background
docker compose ps               # show service status
docker compose logs -f app      # follow the app's logs
docker compose down             # stop and remove containers/networks
docker compose down -v          # also remove named volumes
```
</ExampleBox>

<ExerciseBox title="Define and run your first stack" difficulty="Easy">
Create a `compose.yaml` for a small web app plus a Redis cache. Use `depends_on` so the app waits for Redis, expose the app on `8080:8080`, and persist nothing for the cache. Run `docker compose up -d` and confirm both services are healthy with `docker compose ps`.
</ExerciseBox>

<ExerciseBox title="Add a healthcheck and verify startup order" difficulty="Medium">
Add a `healthcheck` to the Redis service (e.g. `redis-cli ping`) and change the app's `depends_on` to require `service_healthy`. Restart the stack and observe that the app only starts once Redis reports healthy.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-compose-basics" :cards="[
  { q: 'What command builds (if needed) and starts a Compose stack in the background?', a: '<code>docker compose up -d</code>.' },
  { q: 'What does <code>depends_on</code> with <code>condition: service_healthy</code> do?', a: 'It waits for the dependency to report healthy before starting the dependent service.' },
  { q: 'How do you stop and remove a stack\'s containers and networks?', a: '<code>docker compose down</code> (add <code>-v</code> to also remove named volumes).' },
  { q: 'Where are named volumes declared in compose.yaml?', a: 'Under the top-level <code>volumes:</code> key, referenced from services.' }
]" />

## Resources

<ResourceTable title="Compose Basics" :resources="[
  { label: 'Compose specification', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/compose/' },
  { label: 'Docker CLI overview', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/docker/' },
  { label: 'Docker tutorial hub', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/docker/' },
  { label: 'Docker Compose in 100 seconds', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=QjzI2QZj3k0' },
  { label: 'Awesome Compose examples', platform: 'GitHub', type: 'GitHub', url: 'https://github.com/docker/awesome-compose' }
]" />

## Checklist

<ProgressChecklist :items="['Wrote compose.yaml', 'Ran the stack', 'Stopped with down']" storageKey="docker/7-compose-basics" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
