---
title: Port Mapping & Publishing
---

# Module 5 — Networking: Port Mapping & Publishing

Containers are isolated by default, so to reach a service from the host (or the internet) you must publish its port. The `-p` flag maps a host port to a container port; `-P` publishes every port the image declares with `EXPOSE`. Prefixing the host side with an IP restricts exposure.

<ExampleBox title="Publish container ports" lang="bash">
# Map host port 8080 to container port 80
docker run -p 8080:80 myapp

# Bind only to localhost (not exposed to the network)
docker run -p 127.0.0.1:8080:80 myapp

# Publish ALL ports declared with EXPOSE
docker run -P myapp
</ExampleBox>

Key points:
- `-p 8080:80` means `<hostPort>:<containerPort>` — the container port is what the app listens on.
- `127.0.0.1:` binds the published port to loopback only, so it is not reachable from other machines.
- `-P` (capital) auto-publishes every `EXPOSE`d port to a random high host port; use `docker ps` to see the mapping.
- Prefer explicit `-p` bindings over `-P` in production to avoid surprises.

<ExerciseBox title="Map and bind localhost" difficulty="Easy">
Run `nginx:1.27-alpine` with `-p 127.0.0.1:8080:80` and confirm it is reachable at `http://localhost:8080` but not from another device on your LAN. Then re-run with `-p 8080:80` and compare reachability.
</ExerciseBox>

<ExerciseBox title="Use -P and inspect" difficulty="Medium">
Build or choose an image that `EXPOSE`s multiple ports. Run it with `-P` and use `docker port &lt;container>` (or `docker ps`) to list the randomly assigned host ports. Explain how this differs from explicit `-p` mappings.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-port-mapping-publishing" :cards="[
  { q: 'In <code>-p 8080:80</code>, which port is the container port?', a: '80 is the container port (the app listens there); 8080 is the host port.' },
  { q: 'What does <code>-p 127.0.0.1:8080:80</code> do differently?', a: 'It binds the published port to loopback only, so it is not reachable from other machines.' },
  { q: 'What does <code>-P</code> (capital) do?', a: 'It auto-publishes every <code>EXPOSE</code>d port to a random high host port.' },
  { q: 'Why prefer explicit <code>-p</code> over <code>-P</code> in production?', a: 'Explicit bindings avoid surprises from random port assignment.' }
]" />

## Resources

<ResourceTable title="Port Mapping & Publishing — further reading" :resources="[
  { label: 'Docker CLI reference', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/commandline/cli/' },
  { label: 'docker run port publishing', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/run/#publish-or-expose-container-ports' },
  { label: 'Docker Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/docker/' },
  { label: 'Docker Overview', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/docker/' },
  { label: 'Docker Crash Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo' },
  { label: 'awesome-compose', platform: 'GitHub', type: 'GitHub', url: 'https://github.com/docker/awesome-compose' }
]" />

## Checklist

<ProgressChecklist :items="['Mapped a port', 'Bound to localhost only', 'Used -P']" storageKey="docker/5-port-mapping-publishing" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
