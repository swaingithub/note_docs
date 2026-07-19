---
title: Multi-Stage Builds
---

# Module 3 — Building Images (Dockerfile): Multi-Stage Builds

Multi-stage builds let you use one image (with a full toolchain) to compile or build your app, then copy only the resulting artifacts into a minimal runtime image. The final image contains no build tools, source, or intermediate dependencies — dramatically reducing size and attack surface.

<ExampleBox title="A two-stage Dockerfile" lang="dockerfile">
FROM node:20 AS build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
</ExampleBox>

<ExampleBox title="Compare the result" lang="bash">
docker images
</ExampleBox>

Key points:
- Each `FROM` starts a new stage; `AS build` gives it a name you can reference later.
- `COPY --from=build` pulls files only from a previous stage, leaving the toolchain behind.
- The final image is just `nginx:alpine` plus your static files — no Node.js runtime included.

<ExerciseBox title="Write a multi-stage build" difficulty="Easy">
For a Node app, create a `build` stage that runs `npm ci && npm run build`, then a final `nginx:alpine` stage that copies the `dist` folder. Build it and confirm with `docker images` that the resulting image is far smaller than the build stage.
</ExerciseBox>

<ExerciseBox title="Ship a minimal Go binary" difficulty="Medium">
Write a multi-stage Dockerfile that compiles a Go program in a `golang:1.22` stage and copies the static binary into a `scratch` or `alpine` final stage. Compare the final image size to a single-stage `golang` image and explain why `scratch` works for statically linked Go binaries.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-multi-stage-builds" :cards="[
  { q: 'What does <code>AS build</code> do in a Dockerfile?', a: 'It names the stage so you can reference it later with <code>COPY --from=build</code>.' },
  { q: 'How do you copy build output from an earlier stage into the final stage?', a: 'Use <code>COPY --from=&lt;stage&gt; /src /dest</code>.' },
  { q: 'What is the main benefit of a multi-stage build?', a: 'The final image contains only artifacts, no build tools or source, shrinking size and attack surface.' },
  { q: 'Why does a Go binary work in a <code>scratch</code> final stage?', a: 'Statically linked Go binaries need no shared libraries, so a scratch image suffices.' }
]" />

## Resources

<ResourceTable title="Multi-Stage Builds — further reading" :resources="[
  { label: 'Dockerfile reference', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/builder/' },
  { label: 'Multi-stage builds', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/build/building/multi-stage/' },
  { label: 'Docker Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/docker/' },
  { label: 'Docker Overview', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/docker/' },
  { label: 'Docker Crash Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo' },
  { label: 'awesome-compose', platform: 'GitHub', type: 'GitHub', url: 'https://github.com/docker/awesome-compose' }
]" />

## Checklist

<ProgressChecklist :items="['Wrote a multi-stage Dockerfile', 'Compared image sizes', 'Confirmed smaller output']" storageKey="docker/3-multi-stage-builds" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
