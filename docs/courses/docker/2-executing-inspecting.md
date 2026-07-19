---
title: Executing & Inspecting
---

# Module 2 — Images & Containers: Executing & Inspecting

Once a container is running, you often need to debug it: open a shell, read its configuration, or move files in and out. `docker exec` runs a new process inside a running container, `docker inspect` returns low-level JSON about its configuration, and `docker cp` copies files between the container and the host filesystem.

<ExampleBox title="Exec, inspect, and copy" lang="bash">
# Open an interactive shell inside a running container
docker exec -it web sh

# Extract a single field with a Go template
docker inspect web --format '&#123;&#123; .NetworkSettings.IPAddress &#125;&#125;'

# Copy files in and out of the container
docker cp web:/etc/nginx/nginx.conf ./nginx.conf
docker cp ./file.txt web:/tmp/file.txt
</ExampleBox>

Key points:
- `docker exec -it` attaches an interactive TTY — ideal for ad-hoc debugging shells.
- `docker inspect --format` lets you pull specific fields out of the verbose JSON without parsing tools.
- `docker cp` works on both running and stopped containers and mirrors `cp` semantics.

<ExerciseBox title="Debug a running container" difficulty="Easy">
Run `nginx:1.27-alpine` named `web`, then `docker exec -it web sh` and run `cat /etc/os-release` to confirm the base OS. Exit the shell and use `docker inspect web --format '&#123;&#123; .State.Status &#125;&#125;'` to print its status.
</ExerciseBox>

<ExerciseBox title="Copy configuration out and back" difficulty="Medium">
Copy `/etc/nginx/nginx.conf` out of the `web` container to your working directory with `docker cp`, edit it locally (change a comment line), then copy it back into the container and run `docker exec web nginx -t` to validate the configuration.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-executing-inspecting" :cards="[
  { q: 'Which command runs a new process inside a running container?', a: '<code>docker exec</code>, typically with <code>-it</code> for an interactive shell.' },
  { q: 'How do you extract a single field such as the IP address from <code>docker inspect</code>?', a: 'Use <code>docker inspect --format</code> with a Go template, e.g. <code>&#123;&#123; .NetworkSettings.IPAddress &#125;&#125;</code>.' },
  { q: 'Does <code>docker cp</code> work on stopped containers?', a: 'Yes, <code>docker cp</code> works on both running and stopped containers.' },
  { q: 'Which command copies a file from a container to the host?', a: '<code>docker cp &lt;container&gt;:/path /host/path</code>.' }
]" />

## Resources

<ResourceTable title="Executing & Inspecting — further reading" :resources="[
  { label: 'Docker CLI reference', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/commandline/cli/' },
  { label: 'docker exec', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/commandline/exec/' },
  { label: 'docker inspect', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/commandline/inspect/' },
  { label: 'Docker Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/docker/' },
  { label: 'Docker Overview', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/docker/' },
  { label: 'Docker Crash Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo' }
]" />

## Checklist

<ProgressChecklist :items="['Executed into a container', 'Inspected with --format', 'Copied files in/out']" storageKey="docker/2-executing-inspecting" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
