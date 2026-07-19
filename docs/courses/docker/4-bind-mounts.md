---
title: Bind Mounts
---

# Module 4 — Storage & Data: Bind Mounts

A *bind mount* maps a specific file or directory from the host filesystem into a container. Unlike volumes, the host path is explicitly specified by you. Bind mounts are perfect for development, where you want source code changes on the host to appear instantly inside the container.

<ExampleBox title="Use bind mounts" lang="bash">
# Mount the host's ./src into /app/src (live development)
docker run -d -v "$PWD/src":/app/src myapp

# Read-only bind mount (container cannot modify the host file)
docker run -v "$PWD/config":/etc/app:ro myapp
</ExampleBox>

Key points:
- Bind mounts reference an absolute host path (`$PWD/src`), not a Docker-managed location.
- Changes on either side are immediately visible on the other — great for hot-reload dev loops.
- The `:ro` suffix makes the mount read-only inside the container, improving safety.

<ExerciseBox title="Live-reload a dev container" difficulty="Easy">
Run a container with a bind mount of a local source folder. Edit a file on the host while the container is running and confirm the change is visible inside the container with `docker exec`.
</ExerciseBox>

<ExerciseBox title="Read-only config mount" difficulty="Medium">
Mount a local `config.yaml` into a container at `/etc/app/config.yaml:ro`. Attempt to modify it from inside the container (for example with `docker exec` and a text editor) and observe that the write fails. Explain why `:ro` protects the host file.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-bind-mounts" :cards="[
  { q: 'What is the key difference between a bind mount and a volume?', a: 'A bind mount references an explicit host path; a volume is Docker-managed and lives in a Docker area.' },
  { q: 'What does the <code>:ro</code> suffix on a bind mount do?', a: 'Makes the mount read-only inside the container, so it cannot modify the host file.' },
  { q: 'Why are bind mounts useful for development?', a: 'Host changes appear instantly inside the container, enabling hot-reload without rebuilding.' },
  { q: 'How do you mount the host <code>./src</code> into <code>/app/src</code>?', a: 'Use <code>-v &quot;$PWD/src&quot;:/app/src</code>.' }
]" />

## Resources

<ResourceTable title="Bind Mounts — further reading" :resources="[
  { label: 'Docker CLI reference', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/commandline/cli/' },
  { label: 'Bind mounts overview', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/storage/bind-mounts/' },
  { label: 'Docker Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/docker/' },
  { label: 'Docker Overview', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/docker/' },
  { label: 'Docker Crash Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo' },
  { label: 'awesome-compose', platform: 'GitHub', type: 'GitHub', url: 'https://github.com/docker/awesome-compose' }
]" />

## Checklist

<ProgressChecklist :items="['Used a bind mount', 'Used a read-only bind mount']" storageKey="docker/4-bind-mounts" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
