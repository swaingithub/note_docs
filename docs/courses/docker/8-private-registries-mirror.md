---
title: Private Registries & Mirror
---

# Module 8 — Registries: Private Registries & Mirror

Sometimes you need an on-premise or local registry for speed, privacy, or air-gapped environments. Docker's open-source `registry:2` image runs a fully functional registry in minutes, and a pull-through cache (mirror) reduces external bandwidth.

<ExampleBox title="Run a local registry and push" lang="bash">
```bash
docker run -d -p 5000:5000 --name reg --restart=always registry:2
docker tag myapp:1.0 localhost:5000/myapp:1.0
docker push localhost:5000/myapp:1.0
docker pull localhost:5000/myapp:1.0
```
</ExampleBox>

A pull-through cache mirrors a remote registry. Configure the Docker daemon's `daemon.json` so image pulls are served from the local cache when available:

<ExampleBox title="Configure a registry mirror" lang="bash">
```json
{
  "registry-mirrors": ["https://mirror.gcr.io"]
}
```
</ExampleBox>

After editing, restart the daemon: `sudo systemctl restart docker` (Linux) or restart Docker Desktop.

Key points:
- Local registries are unauthenticated by default; add TLS and auth (htpasswd/`auth:` in `daemon.json`) before exposing them.
- Mirrors improve build speed and resilience but do not replace a private push registry.
- `localhost:5000` is treated as insecure by default; remote registries need HTTPS or an `insecure-registries` entry.

<ExerciseBox title="Stand up a local registry" difficulty="Medium">
Start `registry:2` on port 5000, tag and push an image to it, then pull it from a different project directory to prove the registry works independently of your local image store.
</ExerciseBox>

<ExerciseBox title="Set up a pull-through mirror" difficulty="Hard">
Configure `registry-mirrors` in `daemon.json` pointing at a public mirror, restart the daemon, and run `docker pull` twice for the same image. Confirm the second pull served from cache using `docker system df` or by observing faster timing.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-private-registries-mirror" :cards="[
  { q: 'Which image runs a local Docker registry?', a: 'The <code>registry:2</code> image.' },
  { q: 'How do you configure a pull-through registry mirror?', a: 'Add <code>registry-mirrors</code> to the daemon\'s <code>daemon.json</code>, then restart the daemon.' },
  { q: 'Why is <code>localhost:5000</code> treated as insecure by default?', a: 'It is a plaintext local endpoint; remote registries need HTTPS or an <code>insecure-registries</code> entry.' },
  { q: 'Do mirrors replace a private push registry?', a: 'No, mirrors cache pulls for speed/resilience but do not replace a registry you push to.' }
]" />

## Resources

<ResourceTable title="Private Registries & Mirror" :resources="[
  { label: 'Deploy a registry server', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/registry/deploying/' },
  { label: 'docker push reference', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/commandline/push/' },
  { label: 'Docker registry concepts', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/docker/' },
  { label: 'Registry deep dive', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=QjzI2QZj3k0' },
  { label: 'Registry examples', platform: 'GitHub', type: 'GitHub', url: 'https://github.com/docker/awesome-compose' }
]" />

## Checklist

<ProgressChecklist :items="['Ran a local registry', 'Pushed to it', 'Explained mirrors']" storageKey="docker/8-private-registries-mirror" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
