---
title: Container Lifecycle & Cleaning
---

# Module 2 — Images & Containers: Container Lifecycle & Cleaning

A container moves through well-defined states: *created → running → paused → stopped → removed*. You can pause a running container (freezing its processes without stopping them) and unpause it, or restart it. Over time, stopped containers and unused images accumulate, so Docker provides `prune` commands to reclaim disk space.

<ExampleBox title="Lifecycle and cleanup commands" lang="bash">
# Pause / unpause keeps the process alive but frozen
docker pause web
docker unpause web

# Restart a running or stopped container
docker restart web

# Remove all stopped containers
docker container prune

# Remove EVERYTHING unused: stopped containers, unused images,
# networks, and build cache. Use with care.
docker system prune -a
</ExampleBox>

Key points:
- `docker pause` freezes processes via SIGSTOP; `docker unpause` resumes them — faster than a full restart.
- `docker container prune` only deletes stopped containers and is safe for daily use.
- `docker system prune -a` deletes all unused images too; always double-check before running it.

<ExerciseBox title="Pause and restart a container" difficulty="Easy">
Start a long-running container (for example `alpine sleep 3600`). Use `docker pause` on it, observe its status with `docker ps --filter status=paused`, then `docker unpause` and `docker restart` it.
</ExerciseBox>

<ExerciseBox title="Safe cleanup" difficulty="Medium">
Run several throwaway containers with `docker run --rm` alternatives that you leave stopped. Use `docker container prune` to remove them, then run `docker system df` before and after to measure the reclaimed space. Explain the difference between `container prune` and `system prune -a`.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-container-lifecycle-cleaning" :cards="[
  { q: 'What does <code>docker pause</code> do to a running container?', a: 'It freezes the processes via SIGSTOP without stopping them; <code>docker unpause</code> resumes them.' },
  { q: 'Which command removes only stopped containers?', a: '<code>docker container prune</code>.' },
  { q: 'What does <code>docker system prune -a</code> delete that container prune does not?', a: 'It also deletes all unused images, not just stopped containers.' },
  { q: 'Which command restarts a running or stopped container?', a: '<code>docker restart &lt;container&gt;</code>.' }
]" />

## Resources

<ResourceTable title="Lifecycle & Cleaning — further reading" :resources="[
  { label: 'Docker CLI reference', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/commandline/cli/' },
  { label: 'docker container prune', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/commandline/container_prune/' },
  { label: 'docker system prune', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/commandline/system_prune/' },
  { label: 'Docker Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/docker/' },
  { label: 'Docker Overview', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/docker/' },
  { label: 'Docker Crash Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo' }
]" />

## Checklist

<ProgressChecklist :items="['Paused/unpaused a container', 'Pruned stopped containers', 'Understood prune risks']" storageKey="docker/2-container-lifecycle-cleaning" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
