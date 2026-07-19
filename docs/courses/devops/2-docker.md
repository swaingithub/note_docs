---
title: Docker
---

# Containers: Docker

Docker packages an application with its dependencies into an immutable **image**, run as isolated **containers**. A `Dockerfile` declares the base image, working directory, copied files, and the start command — making environments reproducible across machines.

<ExampleBox title="A Dockerfile and compose" lang="yaml">

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
CMD ["node", "server.js"]
```
```yaml
# docker-compose.yml
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
```
</ExampleBox>

Key points:
- `FROM` sets the base image; `WORKDIR` defines the working directory.
- `COPY` adds files; `RUN` executes build steps in the image.
- `CMD` is the command run when the container starts.
- `docker-compose` orchestrates multi-container apps with one file.
- Keep images small (alpine, multi-stage builds) for faster deploys.

<ExerciseBox title="Containerize an app" difficulty="Medium">

Write a Dockerfile for a small Node or Python app, build the image, run it with a port mapping, and confirm it responds at `localhost`.

</ExerciseBox>

<ExerciseBox title="Compose a stack" difficulty="Easy">

Add a `docker-compose.yml` that runs your app alongside a Postgres service, wiring the connection string via an environment variable.

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Wrote a Dockerfile', 'Containerized an app', 'Used docker-compose']" storageKey="devops/2-docker" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-2-docker" :cards="[
{ q: 'What sets the base image in a Dockerfile?', a: 'The <code>FROM</code> instruction.' }, { q: 'What runs at container start?', a: 'The <code>CMD</code> instruction.' }, { q: 'What copies files into the image?', a: 'The <code>COPY</code> instruction.' }, { q: 'What orchestrates multi-container apps?', a: '<code>docker-compose</code> via a single YAML file.' }
]" />

## Resources

<ResourceTable title="Docker Resources" :resources="[
  { label: 'Docker Docs', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/get-started/' },
  { label: 'Dockerfile Reference', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/builder/' },
  { label: 'Compose Reference', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/compose/' },
  { label: 'Docker Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/docker/' },
  { label: 'Docker Crash Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo' }
]" />
