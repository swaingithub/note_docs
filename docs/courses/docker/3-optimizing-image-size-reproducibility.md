---
title: Optimizing Image Size & Reproducibility
---

# Module 3 — Building Images (Dockerfile): Optimizing Image Size & Reproducibility

Small, reproducible images are faster to pull and safer to run. Choose minimal base images (`alpine`, `distroless`, or `scratch`), pin base images by digest for reproducible builds, inspect layers to find bloat, and enable BuildKit for faster, cache-aware builds.

<ExampleBox title="Pin a base by digest" lang="dockerfile">
FROM node:20-alpine@sha256:&lt;digest>
</ExampleBox>

<ExampleBox title="Enable BuildKit and build" lang="bash">
export DOCKER_BUILDKIT=1
docker build --progress=plain -t myapp .
</ExampleBox>

Key points:
- Minimal bases cut size and reduce the packages that need security patching.
- Pinning by `@sha256:` digest ensures the exact same base layers are used every build — tags can move.
- Inspect layers with [dive](https://github.com/wagoodman/dive) and `docker image history` to spot wasted space.
- BuildKit (now the default in modern Docker) parallelizes and caches builds more efficiently.

<ExerciseBox title="Pin and inspect" difficulty="Easy">
Find the current digest of `node:20-alpine` with `docker pull node:20-alpine` and `docker image inspect`. Pin your Dockerfile `FROM` to that digest, rebuild, and run `docker image history` to review the layer sizes.
</ExerciseBox>

<ExerciseBox title="Audit image size with dive" difficulty="Medium">
Install [dive](https://github.com/wagoodman/dive) and analyze one of your images. Identify the largest layer and the instruction that created it, then apply a multi-stage build or dependency cleanup to reduce it. Report the before/after image size.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-optimizing-image-size-reproducibility" :cards="[
  { q: 'Why pin a base image by <code>@sha256:</code> digest instead of a tag?', a: 'Tags can move; a digest guarantees the exact same base layers every build.' },
  { q: 'Name three minimal base image choices for smaller images.', a: '<code>alpine</code>, <code>distroless</code>, or <code>scratch</code>.' },
  { q: 'Which tool is mentioned for inspecting layers to find wasted space?', a: '<code>dive</code> (or <code>docker image history</code>).' },
  { q: 'What does enabling BuildKit do for builds?', a: 'It parallelizes and caches builds more efficiently.' }
]" />

## Resources

<ResourceTable title="Optimizing Images — further reading" :resources="[
  { label: 'Dockerfile reference', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/builder/' },
  { label: 'BuildKit overview', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/build/buildkit/' },
  { label: 'Best practices for images', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/develop/dev-best-practices/' },
  { label: 'Docker Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/docker/' },
  { label: 'Docker Overview', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/docker/' },
  { label: 'dive (image explorer)', platform: 'GitHub', type: 'GitHub', url: 'https://github.com/wagoodman/dive' }
]" />

## Checklist

<ProgressChecklist :items="['Used a minimal base', 'Pinned a digest', 'Inspected layers with dive']" storageKey="docker/3-optimizing-image-size-reproducibility" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
