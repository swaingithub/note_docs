---
title: Common Errors & Fixes
---

# Module 12 — Troubleshooting & Capstone: Common Errors & Fixes

Even experienced users hit the same Docker errors. Knowing the cause and the fix saves hours. Below are the most frequent issues and how to resolve them.

<ExampleBox title="Common errors and fixes" lang="bash">

```
# port already allocated
# cause: another container or host process binds the port
fix: change -p, or stop the conflicting process, or use a different host port

# permission denied while connecting to Docker daemon
# cause: user not in the docker group (Linux) / not using Docker Desktop
fix: usermod -aG docker $USER (then re-login), or use Docker Desktop

# manifest unknown / image not found
# cause: wrong tag or not logged into the registry
fix: docker login, verify the tag exists, check the registry namespace

# container exits immediately
# cause: broken CMD/entrypoint or app crash on start
fix: docker logs <id>; docker run -it --entrypoint sh <img> to debug

# no space left on device
# cause: accumulated images, volumes, and build cache
fix: docker system prune -a ; docker volume prune (review first)
```

</ExampleBox>

Key points:
- `docker logs <id>` and `docker inspect <id>` are the first tools for any "it died" problem.
- Port conflicts are the most common local issue — pick free host ports or stop the offender.
- "Permission denied" on Linux is a group membership problem, not a command problem.
- `docker system df` shows what is consuming space before you prune.
- Image-not-found almost always means a typo in the tag or a missing `docker login`.

<ExerciseBox title="Reproduce and fix three errors" difficulty="Medium">
Intentionally trigger a port conflict, a missing-tag pull, and an immediate-exit container. For each, use `docker logs` / `docker inspect` to diagnose, then apply the correct fix and confirm the container runs.
</ExerciseBox>

<ExerciseBox title="Recover from a full disk" difficulty="Easy">
Run `docker system df` to see space usage, then use `docker system prune -a` (and `docker volume prune` if safe) to reclaim space. Explain the difference between pruning unused images versus dangling ones.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-common-errors-fixes" :cards="[
  { q: 'What causes a &quot;port already allocated&quot; error and how do you fix it?', a: 'Another container or host process binds the port; change <code>-p</code> or stop the conflicting process.' },
  { q: 'On Linux, what fixes &quot;permission denied while connecting to Docker daemon&quot;?', a: 'Add the user to the docker group with <code>usermod -aG docker $USER</code> and re-login.' },
  { q: 'What is the usual cause of a &quot;manifest unknown / image not found&quot; error?', a: 'A wrong tag or not being logged into the registry; run <code>docker login</code> and verify the tag.' },
  { q: 'For a container that exits immediately, what are your first diagnostics?', a: '<code>docker logs &lt;id&gt;</code> and <code>docker inspect &lt;id&gt;</code> to find the exit code and error.' }
]" />

## Resources

<ResourceTable title="Common Errors & Fixes — further reading" :resources="[
  { label: 'Docker troubleshooting', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/config/daemon/' },
  { label: 'Docker run reference', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/run/' },
  { label: 'Common Docker errors', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/docker/' },
  { label: 'Docker Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/docker/' },
  { label: 'Fix Docker errors video', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=QjzI2QZj3k0' }
]" />

## Checklist

<ProgressChecklist :items="['Mapped each error to a fix']" storageKey="docker/12-common-errors-fixes" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
