---
title: Layers, Caching & .dockerignore
---

# Module 3 — Building Images (Dockerfile): Layers, Caching & .dockerignore

Every `RUN`, `COPY`, and `ADD` instruction in a Dockerfile creates a layer, and Docker caches layers to speed up rebuilds. To get the best cache hit rate, put instructions that change rarely (dependencies) before those that change often (source code). A `.dockerignore` file keeps build context small and prevents leaking secrets and node_modules into the image.

<ExampleBox title="Order for cache efficiency" lang="dockerfile">
# Copy only dependency manifests first so this layer is cached
# unless package.json / package-lock.json change
COPY package*.json ./
RUN npm ci
# Copy the rest of the source last — this layer invalidates on any change
COPY . .
</ExampleBox>

<ExampleBox title="Chain and clean in one layer" lang="dockerfile">
RUN apt-get update && apt-get install -y curl \
  && rm -rf /var/lib/apt/lists/*
</ExampleBox>

<ExampleBox title=".dockerignore" lang="yaml">
node_modules
.git
*.log
.env
</ExampleBox>

Key points:
- Layer caching keys on the instruction and its inputs; reorder so stable steps come first.
- Chain `apt-get update` with `rm -rf /var/lib/apt/lists/*` in the same `RUN` so cleanup is part of the layer.
- `.dockerignore` reduces context size and avoids copying `.env` or `node_modules` into the build.

<ExerciseBox title="Reorder for caching" difficulty="Easy">
Take a Dockerfile that copies all source before installing dependencies and reorder it so `package*.json` is copied and installed first. Make a trivial source change and rebuild, confirming the dependency layer shows `CACHED`.
</ExerciseBox>

<ExerciseBox title="Add a .dockerignore" difficulty="Medium">
Create a `.dockerignore` that excludes `node_modules`, `.git`, and `.env`. Build with and without it and compare the "Sending build context" size reported at the start of the build. Explain why ignoring `.env` matters for security.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-layers-caching-dockerignore" :cards="[
  { q: 'Which Dockerfile instructions create a new layer?', a: 'Every <code>RUN</code>, <code>COPY</code>, and <code>ADD</code> instruction creates a layer.' },
  { q: 'Why copy <code>package*.json</code> before copying the rest of the source?', a: 'So the dependency layer stays cached unless the manifests change, improving rebuild speed.' },
  { q: 'Why chain <code>apt-get update</code> with <code>rm -rf /var/lib/apt/lists/*</code> in the same RUN?', a: 'So the cleanup is part of the same layer and does not bloat the image.' },
  { q: 'What is the security benefit of adding <code>.env</code> to <code>.dockerignore</code>?', a: 'It prevents secrets in <code>.env</code> from being copied into the build context and the image.' }
]" />

## Resources

<ResourceTable title="Layers, Caching & .dockerignore — further reading" :resources="[
  { label: 'Dockerfile reference', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/builder/' },
  { label: 'Build cache overview', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/build/cache/' },
  { label: '.dockerignore reference', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/builder/#dockerignore-file' },
  { label: 'Docker Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/docker/' },
  { label: 'Docker Overview', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/docker/' },
  { label: 'Docker Crash Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo' }
]" />

## Checklist

<ProgressChecklist :items="['Ordered instructions for caching', 'Chained + cleaned a RUN', 'Added .dockerignore']" storageKey="docker/3-layers-caching-dockerignore" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
