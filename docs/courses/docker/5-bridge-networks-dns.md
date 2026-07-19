---
title: Bridge Networks & DNS
---

# Module 5 — Networking: Bridge Networks & DNS

A *user-defined bridge network* is the default choice for multi-container apps on a single host. Unlike the automatic `bridge`, a user-defined bridge provides automatic DNS-based service discovery: containers on the same network can reach each other by name instead of hard-coded IP addresses.

<ExampleBox title="Create a network and connect containers" lang="bash">
# Create a user-defined bridge network
docker network create mynet

# Start two containers attached to it
docker run -d --net mynet --name db postgres:16
docker run -d --net mynet --name api myapi
</ExampleBox>

<ExampleBox title="Resolve by name via embedded DNS" lang="bash">
# From the api container, reach the db container by name
docker exec api ping -c2 db
</ExampleBox>

Key points:
- Containers on a user-defined bridge resolve each other by name through Docker's embedded DNS server.
- You do not need to know IP addresses — refer to services by their `--name`.
- The default `bridge` network does NOT provide this name resolution; always create your own for apps.

<ExerciseBox title="Connect two containers by name" difficulty="Easy">
Create a bridge network, run `postgres:16` named `db` and `nginx:alpine` named `web` on it, then `docker exec web ping -c2 db` to confirm name resolution works.
</ExerciseBox>

<ExerciseBox title="Cross-network isolation" difficulty="Medium">
Create two bridge networks, `front` and `back`. Put `web` on `front` and `db` on `back`, then try to ping `db` from `web` and observe it fails. Connect `web` to `back` with `docker network connect back web` and confirm resolution now succeeds. Explain the isolation model.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-bridge-networks-dns" :cards="[
  { q: 'What does a user-defined bridge network provide that the default bridge does not?', a: 'Automatic DNS-based service discovery: containers resolve each other by name.' },
  { q: 'How do you attach a container to a user-defined bridge network?', a: 'With <code>--net &lt;name&gt;</code> (e.g. <code>docker run --net mynet --name db postgres:16</code>).' },
  { q: 'How does the api container reach the db container by name?', a: 'Docker\'s embedded DNS resolves <code>db</code> to its container IP on the shared network.' },
  { q: 'Why should you always create your own bridge network for apps?', a: 'The default bridge lacks name resolution, so containers cannot reach each other by name.' }
]" />

## Resources

<ResourceTable title="Bridge Networks & DNS — further reading" :resources="[
  { label: 'Docker CLI reference', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/commandline/cli/' },
  { label: 'Bridge network driver', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/network/bridge/' },
  { label: 'Docker Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/docker/' },
  { label: 'Docker Overview', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/docker/' },
  { label: 'Docker Crash Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo' },
  { label: 'awesome-compose', platform: 'GitHub', type: 'GitHub', url: 'https://github.com/docker/awesome-compose' }
]" />

## Checklist

<ProgressChecklist :items="['Created a bridge network', 'Connected two containers', 'Resolved by name']" storageKey="docker/5-bridge-networks-dns" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
