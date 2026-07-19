---
title: All Dockerfile Instructions
---

# Module 3 — Building Images (Dockerfile): All Dockerfile Instructions

A Dockerfile supports a fixed set of instructions. Knowing what each one does — and when to use `ARG` versus `ENV`, or `COPY` versus `ADD` — is essential for writing correct, maintainable images. The table below summarizes the most important instructions.

<ExampleBox title="Key Dockerfile instructions" lang="yaml">
Instruction | Purpose
FROM          | Base image (must be first)
RUN           | Execute a command, create a layer
CMD           | Default command (one per image)
ENTRYPOINT    | Fixed executable; CMD = args
COPY          | Copy files from build context
ADD           | Like COPY + can fetch URLs/extract tars
ENV           | Environment variable (in image)
ARG           | Build-time variable (not in image)
WORKDIR       | Set working directory
EXPOSE        | Document a port
USER          | Run as non-root user
VOLUME        | Declare a mount point
LABEL         | Metadata
HEALTHCHECK   | Container health command
ONBUILD       | Trigger for child images
SHELL         | Override shell (Windows)
</ExampleBox>

<ExampleBox title="Using ARG and LABEL" lang="dockerfile">
ARG NODE_VER=20
FROM node:${NODE_VER}-alpine
LABEL maintainer="you@example.com"
</ExampleBox>

Key points:
- `ARG` values exist only at build time; `ENV` values persist into the running container.
- Prefer `COPY` over `ADD` unless you need URL fetching or tar extraction.
- `LABEL` adds searchable metadata; `HEALTHCHECK` lets the engine report container health.

<ExerciseBox title="Build with ARG, ENV, and LABEL" difficulty="Easy">
Write a Dockerfile that uses an `ARG` to select a base image tag, an `ENV` to set `APP_ENV=production`, and a `LABEL` with your name. Build it with `--build-arg` overriding the tag and confirm the label with `docker image inspect`.
</ExerciseBox>

<ExerciseBox title="Compare ARG vs ENV" difficulty="Medium">
Create an image where `ARG BUILD_DATE` and `ENV BUILD_DATE` both appear. Build it, then run `docker inspect` and a container shell (`docker run -e` aside) to show that the `ARG` is gone at runtime while the `ENV` remains. Explain the security implication.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-all-dockerfile-instructions" :cards="[
  { q: 'What is the key difference between <code>ARG</code> and <code>ENV</code>?', a: '<code>ARG</code> exists only at build time; <code>ENV</code> persists into the running container.' },
  { q: 'When should you prefer <code>COPY</code> over <code>ADD</code>?', a: 'Prefer <code>COPY</code> unless you need URL fetching or tar extraction, which only <code>ADD</code> provides.' },
  { q: 'Which instruction declares metadata searchable on the image?', a: '<code>LABEL</code>.' },
  { q: 'Which instruction lets the engine report container health?', a: '<code>HEALTHCHECK</code>.' }
]" />

## Resources

<ResourceTable title="Dockerfile Instructions — further reading" :resources="[
  { label: 'Dockerfile reference', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/builder/' },
  { label: 'Docker CLI reference', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/commandline/cli/' },
  { label: 'Docker Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/docker/' },
  { label: 'Docker Overview', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/docker/' },
  { label: 'Docker Crash Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo' },
  { label: 'awesome-compose', platform: 'GitHub', type: 'GitHub', url: 'https://github.com/docker/awesome-compose' }
]" />

## Checklist

<ProgressChecklist :items="['Memorized the instruction table', 'Used ARG + ENV', 'Used LABEL']" storageKey="docker/3-all-dockerfile-instructions" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
