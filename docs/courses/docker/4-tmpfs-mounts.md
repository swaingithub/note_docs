---
title: tmpfs Mounts
---

# Module 4 — Storage & Data: tmpfs Mounts

A *tmpfs* mount stores data in the host's memory (RAM) only — it is never written to the host's persistent filesystem. This makes it ideal for secrets, temporary files, or anything sensitive and ephemeral that should not survive a reboot or be readable from disk.

<ExampleBox title="Create a tmpfs mount" lang="bash">
docker run -d --tmpfs /tmp:rw,size=64m myapp
</ExampleBox>

Key points:
- `--tmpfs /tmp` creates an in-memory filesystem mounted at `/tmp` inside the container.
- The `size=64m` option caps memory usage; without it the tmpfs can grow to fill available RAM.
- Data written to a tmpfs disappears when the container stops — it is not persisted anywhere.
- Use tmpfs for secrets and scratch space; use volumes or bind mounts when you need durability.

<ExerciseBox title="Verify in-memory storage" difficulty="Easy">
Run a container with `--tmpfs /tmp:size=16m`. Write a file into `/tmp` inside the container, then check on the host (outside any container) that no such file exists on disk. Confirm it is gone after the container stops.
</ExerciseBox>

<ExerciseBox title="Cap and observe tmpfs" difficulty="Medium">
Run a container with `--tmpfs /tmp:size=8m` and attempt to write a file larger than 8 MB into `/tmp`. Observe the failure and explain how `size=` protects the host from memory exhaustion.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-tmpfs-mounts" :cards="[
  { q: 'Where does a tmpfs mount store its data?', a: 'In the host\'s memory (RAM) only; never on the persistent filesystem.' },
  { q: 'What does the <code>size=64m</code> option do on a tmpfs mount?', a: 'It caps memory usage; without it the tmpfs can grow to fill available RAM.' },
  { q: 'Does data written to a tmpfs persist after the container stops?', a: 'No, it disappears entirely; tmpfs is not persisted anywhere.' },
  { q: 'When should you use tmpfs instead of a volume or bind mount?', a: 'For secrets and scratch space that are sensitive and ephemeral; use volumes/bind mounts when you need durability.' }
]" />

## Resources

<ResourceTable title="tmpfs Mounts — further reading" :resources="[
  { label: 'Docker CLI reference', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/commandline/cli/' },
  { label: 'tmpfs mounts', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/storage/tmpfs/' },
  { label: 'Docker Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/docker/' },
  { label: 'Docker Overview', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/docker/' },
  { label: 'Docker Crash Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo' },
  { label: 'awesome-compose', platform: 'GitHub', type: 'GitHub', url: 'https://github.com/docker/awesome-compose' }
]" />

## Checklist

<ProgressChecklist :items="['Created a tmpfs mount', 'Explained its use case']" storageKey="docker/4-tmpfs-mounts" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
