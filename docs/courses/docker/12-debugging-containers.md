---
title: Debugging Containers
---

# Module 12 — Troubleshooting & Capstone: Debugging Containers

When something goes wrong, Docker gives you a toolkit to see inside a running or crashed container. The right command depends on whether the container exits immediately, fails to start, has network issues, or is slow.

<ExampleBox title="Inspect logs and config" lang="bash">
```bash
docker logs &lt;id>                 # stdout/stderr of a crashed or running container
docker inspect &lt;id>              # full config, mounts, networks, health, exit code
docker events                   # live stream of daemon events
```
</ExampleBox>

For containers that won't start, reproduce the failure interactively by overriding the entrypoint:

<ExampleBox title="Reproduce interactively" lang="bash">
```bash
docker run -it --entrypoint sh myapp
# now poke around: ls /app, cat config, run the binary manually
```
</ExampleBox>

Network and performance debugging:

<ExampleBox title="Network and performance" lang="bash">
```bash
docker network inspect &lt;net>     # see connected containers and IPs
docker exec -it &lt;id> ping db     # test service DNS resolution
docker stats &lt;id>                # live CPU/memory/IO usage
docker top &lt;id>                  # processes running inside the container
```
</ExampleBox>

Key points:
- Start with `docker logs` and `docker inspect` — the exit code and `State` block reveal most crashes.
- `docker exec -it <id> sh` drops you into a running container to inspect the live filesystem.
- Compose services are reachable by their service name via the Compose network's embedded DNS.
- `docker stats` is your first stop for "why is this slow or OOMing".

<ExerciseBox title="Debug a crashing container" difficulty="Medium">
Take an image that exits immediately, run it with `docker logs` and `docker inspect` to find the exit code, then override the entrypoint with `sh` to reproduce and fix the failing command inside the container.
</ExerciseBox>

<ExerciseBox title="Diagnose a network failure" difficulty="Easy">
Start a two-service compose stack, then use `docker exec` to `ping` one service from the other by name. If it fails, inspect `docker network inspect` to confirm both are attached and explain the DNS resolution.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-debugging-containers" :cards="[
  { q: 'Which two commands should you start with for a crashed container?', a: '<code>docker logs &lt;id&gt;</code> and <code>docker inspect &lt;id&gt;</code> to find the exit code.' },
  { q: 'How do you reproduce a container that won\'t start, interactively?', a: 'Run <code>docker run -it --entrypoint sh &lt;img&gt;</code> and poke around.' },
  { q: 'How do Compose services reach each other by name?', a: 'Via the Compose network\'s embedded DNS, using the service name.' },
  { q: 'Which command shows live CPU, memory, and IO for a container?', a: '<code>docker stats &lt;id&gt;</code>.' }
]" />

## Resources

<ResourceTable title="Debugging Containers" :resources="[
  { label: 'Troubleshoot container networking', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/network/troubleshoot/' },
  { label: 'docker logs reference', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/commandline/logs/' },
  { label: 'Debugging containers', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/docker/' },
  { label: 'Docker debugging tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/docker/' },
  { label: 'Debug containers video', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=QjzI2QZj3k0' }
]" />

## Checklist

<ProgressChecklist :items="['Read crash logs', 'Reproduced interactively', 'Diagnosed a network issue']" storageKey="docker/12-debugging-containers" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
