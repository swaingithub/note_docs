---
title: Docker Contexts
---

# Module 1 — Installation & Setup: Docker Contexts

A Docker *context* is a named endpoint that points the CLI at a specific Docker daemon — your local machine, a remote host over SSH, or a cloud provider. Contexts let you run the same commands against different environments without changing your workflow.

<ExampleBox title="Manage Docker contexts" lang="bash">
# List available contexts (the active one is marked with *)
docker context ls

# Create a context that talks to a remote daemon over SSH
docker context create remote --docker "host=ssh://user@host"

# Switch the active context
docker context use remote

# Switch back to the local daemon
docker context use default
</ExampleBox>

Key points:
- The `*` marks the currently active context in `docker context ls`.
- A remote context uses `host=ssh://user@host` (or `tcp://` with TLS) to reach another daemon.
- Switching contexts is instant and affects every subsequent `docker` command.

<ExerciseBox title="Create and switch a context" difficulty="Easy">
Run `docker context ls` to see the default context. Create a second context pointing at any reachable host (or a dummy `ssh://` target), then switch to it and back with `docker context use default`. Confirm the active context changes in `docker context ls`.
</ExerciseBox>

<ExerciseBox title="Inspect a context" difficulty="Medium">
Run `docker context inspect default` and identify the Docker endpoint, the orchestrator type, and the location of the TLS/SSH material used to connect. Explain what would change if you inspected your remote context instead.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-contexts" :cards="[
  { q: 'What marks the currently active context in <code>docker context ls</code>?', a: 'An asterisk (<code>*</code>) next to the active context.' },
  { q: 'What <code>host=</code> value does a remote context use to reach a daemon over SSH?', a: '<code>host=ssh://user@host</code> (or <code>tcp://</code> with TLS).' },
  { q: 'Which command switches the active Docker context?', a: '<code>docker context use &lt;name&gt;</code>.' },
  { q: 'How do you create a context pointing at a remote daemon?', a: '<code>docker context create remote --docker &quot;host=ssh://user@host&quot;</code>.' }
]" />

## Resources

<ResourceTable title="Docker Contexts — further reading" :resources="[
  { label: 'Install Docker Engine', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/get-docker/' },
  { label: 'Docker CLI reference', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/commandline/cli/' },
  { label: 'Docker CLI contexts', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/commandline/context/' },
  { label: 'Docker Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/docker/' },
  { label: 'Docker Overview', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/docker/' },
  { label: 'Docker Crash Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo' }
]" />

## Checklist

<ProgressChecklist :items="['Listed contexts', 'Created a remote context', 'Switched contexts']" storageKey="docker/1-docker-contexts" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
