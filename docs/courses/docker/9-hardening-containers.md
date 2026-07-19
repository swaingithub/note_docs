---
title: Hardening Containers
---

# Module 9 — Security: Hardening Containers

Defense-in-depth means reducing what a compromised container can do. Dropping Linux capabilities, using a read-only root filesystem, and disabling privilege escalation all shrink the attack surface.

<ExampleBox title="Hardened runtime flags" lang="bash">
```bash
docker run -d \
  --cap-drop ALL \
  --cap-add NET_BIND_SERVICE \
  --read-only \
  --tmpfs /tmp \
  --security-opt no-new-privileges \
  --memory=256m --cpus=0.5 \
  myapp
```
</ExampleBox>

In Compose, the same controls are expressed declaratively:

<ExampleBox title="Hardening in compose.yaml" lang="yaml">
```yaml
services:
  app:
    image: myapp:1.0
    read_only: true
    tmpfs:
      - /tmp
    cap_drop:
      - ALL
    cap_add:
      - NET_BIND_SERVICE
    security_opt:
      - no-new-privileges:true
    mem_limit: 256m
    cpus: 0.5
```
</ExampleBox>

Key points:
- `--cap-drop ALL` removes all capabilities; re-add only what the app needs (e.g. `NET_BIND_SERVICE` to bind port 80 as non-root).
- A read-only root filesystem (`--read-only`) prevents tampering; use `--tmpfs` for the few writable paths.
- `no-new-privileges` blocks setuid binaries from gaining more privileges at runtime.
- Prefer minimal bases (distroless, alpine) and keep them patched to reduce CVE exposure.

<ExerciseBox title="Harden a running container" difficulty="Medium">
Take a working container and relaunch it with `--cap-drop ALL`, `--read-only`, `--tmpfs /tmp`, and `--security-opt no-new-privileges`. Fix any write-path errors by mounting writable volumes or tmpfs, then confirm it still serves traffic.
</ExerciseBox>

<ExerciseBox title="Express hardening in Compose" difficulty="Easy">
Add `read_only`, `cap_drop`, `security_opt`, and `tmpfs` to a service in your `compose.yaml`. Run `docker compose up` and verify the settings with `docker inspect &lt;id> | grep -E "ReadOnly|CapDrop"`.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-hardening-containers" :cards="[
  { q: 'What does <code>--cap-drop ALL</code> do, and when would you re-add a capability?', a: 'It removes all Linux capabilities; re-add only what the app needs, e.g. <code>NET_BIND_SERVICE</code> to bind port 80.' },
  { q: 'What does <code>--read-only</code> do to the container filesystem?', a: 'It makes the root filesystem read-only, preventing tampering; use <code>--tmpfs</code> for writable paths.' },
  { q: 'What does <code>--security-opt no-new-privileges</code> prevent?', a: 'It blocks setuid binaries from gaining more privileges at runtime.' },
  { q: 'Which Compose keys express capability dropping and read-only FS?', a: '<code>cap_drop</code>, <code>cap_add</code>, and <code>read_only: true</code>.' }
]" />

## Resources

<ResourceTable title="Hardening Containers" :resources="[
  { label: 'Docker security', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/security/' },
  { label: 'Container hardering guide', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/docker/' },
  { label: 'Docker security tutorials', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/docker/' },
  { label: 'Hardening containers talk', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=QjzI2QZj3k0' },
  { label: 'Docker benchmarks', platform: 'GitHub', type: 'GitHub', url: 'https://github.com/docker/awesome-compose' }
]" />

## Checklist

<ProgressChecklist :items="['Dropped capabilities', 'Used read-only FS', 'Set no-new-privileges']" storageKey="docker/9-hardening-containers" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
