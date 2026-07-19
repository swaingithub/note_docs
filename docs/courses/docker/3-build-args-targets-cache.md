---
title: Build Args, Targets & Cache
---

# Module 3 — Building Images (Dockerfile): Build Args, Targets & Cache

`docker build` accepts options that make builds flexible and fast. `--build-arg` passes values into `ARG` instructions at build time, `--target` stops the build at a named stage (useful for tests or dev images), and BuildKit cache mounts (`--mount=type=cache`) persist directories like package caches across builds without bloating the image.

<ExampleBox title="Build with args and targets" lang="bash">
# Pass a build argument and tag the result
docker build --build-arg NODE_VER=18 -t myapp:18 .

# Build only up to a named stage (e.g. a "build" stage)
docker build --target build -t myapp:buildstage .
</ExampleBox>

<ExampleBox title="BuildKit cache mount" lang="dockerfile">
RUN --mount=type=cache,target=/root/.npm npm ci
</ExampleBox>

Key points:
- `--build-arg` only fills `ARG` instructions; it cannot override `ENV` at build time without an `ARG` declared first.
- `--target` lets you ship a lean runtime image while reusing the same Dockerfile for a heavier build/test stage.
- Cache mounts keep `node_modules`, `~/.cache`, and similar directories on the host, speeding up repeated builds.

<ExerciseBox title="Build with a build argument" difficulty="Easy">
Add an `ARG NODE_VER` to a Dockerfile that picks `node:${NODE_VER}-alpine` as the base. Build twice with `--build-arg NODE_VER=18` and `--build-arg NODE_VER=20`, tagging each differently, and confirm both images exist with `docker images`.
</ExerciseBox>

<ExerciseBox title="Build a specific target" difficulty="Medium">
Write a multi-stage Dockerfile with a `build` stage and a `runtime` stage. Use `--target build` to produce an image that contains the toolchain, then compare its size to the default (final) build. Explain when targeting an intermediate stage is useful in CI.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-build-args-targets-cache" :cards="[
  { q: 'What does <code>--build-arg NODE_VER=18</code> do?', a: 'It passes the value into an <code>ARG</code> instruction at build time.' },
  { q: 'Can <code>--build-arg</code> override an <code>ENV</code> at build time?', a: 'No, not without an <code>ARG</code> declared first that feeds the ENV.' },
  { q: 'What does <code>--target build</code> do during a build?', a: 'It stops the build at the named stage, useful for test or dev images.' },
  { q: 'What does a BuildKit cache mount <code>--mount=type=cache</code> persist across builds?', a: 'Directories like package caches on the host, without bloating the image.' }
]" />

## Resources

<ResourceTable title="Build Args, Targets & Cache — further reading" :resources="[
  { label: 'Dockerfile reference', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/builder/' },
  { label: 'docker build reference', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/commandline/build/' },
  { label: 'BuildKit cache mounts', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/build/cache/optimize/#use-cache-mounts' },
  { label: 'Docker Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/docker/' },
  { label: 'Docker Overview', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/docker/' },
  { label: 'Docker Crash Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo' }
]" />

## Checklist

<ProgressChecklist :items="['Passed --build-arg', 'Built a specific --target', 'Used a cache mount']" storageKey="docker/3-build-args-targets-cache" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
