---
title: Network Drivers
---

# Module 5 — Networking: Network Drivers

Docker supports several network drivers, each suited to a different scenario. The driver determines isolation, reachability, and whether containers can talk across hosts. Knowing the trade-offs helps you pick the right network for the job.

<ExampleBox title="List networks and drivers" lang="bash">
docker network ls
docker network --help
</ExampleBox>

Key points:
- **bridge** (default): an isolated, per-host software network for containers on one Docker host.
- **host**: the container shares the host's network stack — no isolation, maximum performance.
- **none**: the container has no network interfaces except loopback.
- **overlay**: spans multiple Docker hosts, used by Swarm and some multi-host setups.
- **macvlan**: gives a container its own MAC and IP on the physical LAN, appearing as a real device.

<ExerciseBox title="Identify drivers in use" difficulty="Easy">
Run `docker network ls` and note the `DRIVER` column for each network (bridge, host, none, etc.). Create a user-defined `bridge` network and confirm it appears with the `bridge` driver.
</ExerciseBox>

<ExerciseBox title="Compare host vs bridge" difficulty="Medium">
Run a container on the `host` network and bind a server to port 8080, then run another on a `bridge` network with `-p 8080:8080`. Explain the difference in isolation and why the `host` container's port is directly the host's port while the `bridge` one is NATed.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-network-drivers" :cards="[
  { q: 'Which network driver shares the host\'s network stack with no isolation?', a: 'The <code>host</code> driver.' },
  { q: 'Which driver spans multiple Docker hosts and is used by Swarm?', a: 'The <code>overlay</code> driver.' },
  { q: 'What does the <code>none</code> driver give a container?', a: 'No network interfaces except loopback.' },
  { q: 'Which driver gives a container its own MAC and IP on the physical LAN?', a: 'The <code>macvlan</code> driver.' }
]" />

## Resources

<ResourceTable title="Network Drivers — further reading" :resources="[
  { label: 'Docker CLI reference', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/commandline/cli/' },
  { label: 'Network drivers overview', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/network/drivers/' },
  { label: 'Docker Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/docker/' },
  { label: 'Docker Overview', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/docker/' },
  { label: 'Docker Crash Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo' },
  { label: 'awesome-compose', platform: 'GitHub', type: 'GitHub', url: 'https://github.com/docker/awesome-compose' }
]" />

## Checklist

<ProgressChecklist :items="['Listed networks', 'Explained each driver']" storageKey="docker/5-network-drivers" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
