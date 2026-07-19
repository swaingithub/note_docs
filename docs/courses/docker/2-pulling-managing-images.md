---
title: Pulling & Managing Images
---

# Module 2 — Images & Containers: Pulling & Managing Images

Images are the read-only templates containers are built from. You pull them from a registry (by default Docker Hub) using a `name:tag` reference. Keeping your local image store tidy — inspecting metadata, reviewing layer history, and pruning dangling images — prevents wasted disk space and surprises.

<ExampleBox title="Pull and manage images" lang="bash">
# Pull a specific tagged image and list what you have
docker pull nginx:1.27-alpine
docker images

# Inspect metadata and the layer history
docker image inspect nginx:1.27-alpine
docker image history nginx:1.27-alpine

# Remove an image and prune dangling (untagged) images
docker image rm nginx:1.27-alpine
docker image prune
</ExampleBox>

Key points:
- Always pin a tag (and ideally a digest) — `nginx` alone resolves to `nginx:latest`, which drifts over time.
- `docker image history` shows how each layer was created and its size.
- `docker image prune` removes only dangling images (those with no tag); add `-a` to remove all unused ones.

<ExerciseBox title="Pull and inspect an image" difficulty="Easy">
Pull `alpine:3.20` and run `docker image inspect alpine:3.20` to find its architecture, the default `Cmd`, and the total size. Then remove it with `docker image rm`.
</ExerciseBox>

<ExerciseBox title="Compare image sizes" difficulty="Medium">
Pull both `nginx:1.27` and `nginx:1.27-alpine`, then run `docker images` and `docker image history` on each. Explain why the alpine variant is smaller and identify which base layers they share.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-pulling-managing-images" :cards="[
  { q: 'What does <code>nginx</code> without a tag resolve to?', a: 'It resolves to <code>nginx:latest</code>, which drifts over time; always pin a tag or digest.' },
  { q: 'Which command shows how each image layer was created and its size?', a: '<code>docker image history &lt;image&gt;</code>.' },
  { q: 'What does <code>docker image prune</code> remove?', a: 'Only dangling (untagged) images; add <code>-a</code> to remove all unused images.' },
  { q: 'Which command removes a local image?', a: '<code>docker image rm &lt;image&gt;</code>.' }
]" />

## Resources

<ResourceTable title="Pulling & Managing Images — further reading" :resources="[
  { label: 'Docker CLI reference', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/commandline/cli/' },
  { label: 'docker pull', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/commandline/pull/' },
  { label: 'Docker Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/docker/' },
  { label: 'Docker Overview', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/docker/' },
  { label: 'Docker Crash Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo' },
  { label: 'awesome-compose', platform: 'GitHub', type: 'GitHub', url: 'https://github.com/docker/awesome-compose' }
]" />

## Checklist

<ProgressChecklist :items="['Pulled an image', 'Inspected history', 'Pruned dangling images']" storageKey="docker/2-pulling-managing-images" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
