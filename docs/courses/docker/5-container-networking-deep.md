---
title: Container Networking Deep
---

# Module 5 — Networking: Container Networking Deep

Beyond simply connecting containers, Docker lets you inspect network internals and attach or detach containers from networks at runtime. Understanding the network object and the limitations of the default bridge helps you design correct multi-container topologies.

<ExampleBox title="Inspect and modify network membership" lang="bash">
# Inspect the network's configuration and connected containers
docker network inspect mynet

# Connect/disconnect a running container at runtime
docker network connect mynet web
docker network disconnect mynet web
</ExampleBox>

Key points:
- `docker network inspect` reveals the subnet, gateway, and each container's IPv4 address.
- `docker network connect`/`disconnect` change a container's network membership without recreating it.
- The default `bridge` network has no automatic DNS — containers there must be linked or addressed by IP.
- For any real multi-container app, always use a user-defined bridge for name resolution.

<ExerciseBox title="Inspect a network" difficulty="Easy">
Create a bridge network with two containers, then run `docker network inspect &lt;net>` and identify the `Subnet`, `Gateway`, and the IP addresses assigned to each container.
</ExerciseBox>

<ExerciseBox title="Hot-plug a container" difficulty="Medium">
Start a container not attached to any custom network, then use `docker network connect mynet web` to add it at runtime. From another container on `mynet`, confirm you can now reach `web` by name. Disconnect it and confirm the name no longer resolves.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-container-networking-deep" :cards="[
  { q: 'What does <code>docker network inspect</code> reveal about a network?', a: 'The subnet, gateway, and each connected container\'s IPv4 address.' },
  { q: 'How do you change a container\'s network membership at runtime?', a: 'With <code>docker network connect</code> and <code>docker network disconnect</code>.' },
  { q: 'Why must the default bridge network address containers by IP instead of name?', a: 'The default bridge has no automatic DNS-based name resolution.' },
  { q: 'Do connect/disconnect commands recreate the container?', a: 'No, they change network membership without recreating the container.' }
]" />

## Resources

<ResourceTable title="Container Networking Deep — further reading" :resources="[
  { label: 'Docker CLI reference', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/commandline/cli/' },
  { label: 'docker network inspect', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/commandline/network_inspect/' },
  { label: 'Bridge network driver', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/network/bridge/' },
  { label: 'Docker Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/docker/' },
  { label: 'Docker Overview', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/docker/' },
  { label: 'Docker Crash Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo' }
]" />

## Checklist

<ProgressChecklist :items="['Inspected a network', 'Connected/disconnected at runtime', 'Explained default bridge limits']" storageKey="docker/5-container-networking-deep" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
