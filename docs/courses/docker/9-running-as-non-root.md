---
title: Running as Non-Root
---

# Module 9 — Security: Running as Non-Root

Containers share the host kernel, so a process running as root inside a container can be dangerous if isolation is bypassed. The best practice is to create a dedicated unprivileged user in the image and switch to it with `USER`.

<ExampleBox title="Create and switch to a non-root user in Dockerfile" lang="dockerfile">
```dockerfile
FROM node:20-alpine
RUN addgroup -S app && adduser -S app -G app
WORKDIR /app
COPY --chown=app:app . .
USER app
CMD ["node", "server.js"]
```
</ExampleBox>

You can also override the user at runtime without changing the image:

<ExampleBox title="Override the user at runtime" lang="bash">
```bash
docker run --user 1000:1000 myapp
```
</ExampleBox>

Key points:
- `adduser -S` creates a system user; pairing `COPY --chown` ensures files are owned by that user.
- `USER app` applies to all subsequent instructions and the running container.
- Files written to mounted volumes are owned by the numeric UID/GID, so pick a stable UID for shared data.
- Some images (e.g. `nginx`) already ship a non-root user; check the base image docs.

<ExerciseBox title="Make an image run as non-root" difficulty="Easy">
Take a Dockerfile that runs as root, add a dedicated user and group, set ownership on the working directory, and switch with `USER`. Build and run it, then confirm the process UID with `docker exec &lt;id> id`.
</ExerciseBox>

<ExerciseBox title="Run an existing image as a fixed UID" difficulty="Medium">
Run a published image with `--user 1000:1000` and write a file to a bind mount. Inspect the file's ownership on the host and explain why a stable UID matters for volume permissions.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-running-as-non-root" :cards="[
  { q: 'In a Dockerfile, how do you switch to a non-root user?', a: 'Create a user with <code>adduser -S</code> and set <code>USER app</code>.' },
  { q: 'What does <code>COPY --chown=app:app</code> do?', a: 'It copies files owned by the app user so they can be read/written at runtime.' },
  { q: 'How do you run an existing image as a fixed UID without rebuilding?', a: 'Use <code>docker run --user 1000:1000 myapp</code>.' },
  { q: 'Why pick a stable UID for files written to mounted volumes?', a: 'So the host file ownership matches predictably and shared data is accessible.' }
]" />

## Resources

<ResourceTable title="Running as Non-Root" :resources="[
  { label: 'Run the container as a non-root user', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/security/' },
  { label: 'Docker security overview', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/security/userns-remap/' },
  { label: 'Docker security tutorials', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/docker/' },
  { label: 'Dockerfile best practices', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/docker/' },
  { label: 'Container security video', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=QjzI2QZj3k0' }
]" />

## Checklist

<ProgressChecklist :items="['Added a non-root user', 'Set USER', 'Ran as non-root']" storageKey="docker/9-running-as-non-root" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
