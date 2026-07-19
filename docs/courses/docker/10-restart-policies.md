---
title: Restart Policies
---

# Module 10 — Resource Limits & Health: Restart Policies

Restart policies tell the Docker daemon what to do when a container stops — whether from a crash, a host reboot, or a manual stop. They keep long-running services alive without an external supervisor.

<ExampleBox title="Common restart policies" lang="bash">
```bash
docker run -d --restart=unless-stopped myapp
docker run -d --restart=on-failure:5 myapp
```
</ExampleBox>

The available policies:

<ExampleBox title="Policy reference" lang="bash">
```
no              # default; never restart automatically
on-failure[:n]  # restart only if it exits non-zero, up to n times
always          # always restart, even after daemon restart
unless-stopped  # like always, but respect an explicit docker stop
```
</ExampleBox>

Key points:
- `unless-stopped` is the usual choice for services: it recovers from crashes and reboots but stays down if you deliberately stopped it.
- `on-failure:5` limits restart storms for buggy apps; after 5 tries the daemon gives up.
- `always` will resurrect a container even after a manual `docker stop` once the daemon restarts — prefer `unless-stopped`.
- Restart policies are daemon-level; Swarm services use `restart_policy` under `deploy` instead.

<ExerciseBox title="Pick the right policy" difficulty="Easy">
Run a container with `--restart=unless-stopped`, then `docker stop` it and restart the Docker daemon (or simulate a reboot). Confirm the container comes back up, and explain why `unless-stopped` differs from `always`.
</ExerciseBox>

<ExerciseBox title="Limit crash-looping" difficulty="Medium">
Run a container that exits with a non-zero code using `--restart=on-failure:3`. Watch `docker events` or `docker inspect` to confirm it retries at most three times and then stays stopped.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-restart-policies" :cards="[
  { q: 'Which restart policy recovers from crashes and reboots but stays down after a manual stop?', a: '<code>unless-stopped</code>.' },
  { q: 'What does <code>--restart=on-failure:5</code> do?', a: 'Restarts only on non-zero exit, up to 5 times, then gives up.' },
  { q: 'Why prefer <code>unless-stopped</code> over <code>always</code>?', a: '<code>always</code> resurrects a container even after a manual stop once the daemon restarts.' },
  { q: 'Where do Swarm services configure restart behavior?', a: 'Under <code>deploy.restart_policy</code>, not the docker run flag.' }
]" />

## Resources

<ResourceTable title="Restart Policies" :resources="[
  { label: 'Start containers automatically', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/run/#restart-policies---restart' },
  { label: 'Container lifecycle', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/config/containers/start-containers-automatically/' },
  { label: 'Restart policies guide', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/docker/' },
  { label: 'Docker run tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/docker/' },
  { label: 'Restart policies video', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=QjzI2QZj3k0' }
]" />

## Checklist

<ProgressChecklist :items="['Set unless-stopped', 'Set on-failure']" storageKey="docker/10-restart-policies" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
