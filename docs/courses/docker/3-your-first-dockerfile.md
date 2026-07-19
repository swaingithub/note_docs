---
title: Your First Dockerfile
---

# Module 3 — Building Images (Dockerfile): Your First Dockerfile

A Dockerfile is a text file of instructions that builds a container image. Each instruction (like `FROM`, `RUN`, `COPY`) creates a layer. In this lesson you will create a small Node.js app image, build it, and run a container from it.

<ExampleBox title="Write, build, and run" lang="bash">
# Scaffold a project
mkdir myapp && cd myapp
</ExampleBox>

<ExampleBox title="Dockerfile" lang="dockerfile">
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
</ExampleBox>

<ExampleBox title="Build and run the image" lang="bash">
docker build -t myapp:1.0 .
docker run -p 3000:3000 myapp:1.0
</ExampleBox>

Key points:
- `FROM` sets the base image and must be the first instruction.
- `WORKDIR` defines the working directory for subsequent `RUN`, `COPY`, and `CMD` steps.
- Copying `package*.json` and running `npm ci` before copying the rest improves layer caching.
- `EXPOSE` documents the port; `-p 3000:3000` actually publishes it to the host.

<ExerciseBox title="Build and run your first image" difficulty="Easy">
Create the project structure above with a minimal `server.js` (for example an Express app on port 3000). Write the Dockerfile, run `docker build -t myapp:1.0 .`, then `docker run -p 3000:3000 myapp:1.0` and confirm it responds on `http://localhost:3000`.
</ExerciseBox>

<ExerciseBox title="Improve caching" difficulty="Medium">
Reorder your Dockerfile so the dependency install is cached independently of source changes. Make a source change, rebuild, and observe from the build output which steps use the cache (`CACHED`) versus which re-run. Explain why the `npm ci` step stays cached.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-your-first-dockerfile" :cards="[
  { q: 'Which instruction must be the first in a Dockerfile?', a: '<code>FROM</code>, which sets the base image.' },
  { q: 'What does <code>WORKDIR</code> do?', a: 'It sets the working directory for subsequent <code>RUN</code>, <code>COPY</code>, and <code>CMD</code> steps.' },
  { q: 'Does <code>EXPOSE 3000</code> publish the port to the host?', a: 'No, it only documents the port; <code>-p 3000:3000</code> actually publishes it.' },
  { q: 'Why copy <code>package*.json</code> and run <code>npm ci</code> before copying the rest of the source?', a: 'So the dependency layer stays cached unless the manifests change, speeding up rebuilds.' }
]" />

## Resources

<ResourceTable title="Your First Dockerfile — further reading" :resources="[
  { label: 'Dockerfile reference', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/builder/' },
  { label: 'Docker CLI reference', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/commandline/cli/' },
  { label: 'Docker Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/docker/' },
  { label: 'Docker Overview', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/docker/' },
  { label: 'Docker Crash Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo' },
  { label: 'awesome-compose', platform: 'GitHub', type: 'GitHub', url: 'https://github.com/docker/awesome-compose' }
]" />

## Checklist

<ProgressChecklist :items="['Created a Dockerfile', 'Built an image', 'Ran it']" storageKey="docker/3-your-first-dockerfile" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
