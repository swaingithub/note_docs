---
title: GitHub Container Registry (GHCR)
---

# Module 8 — Registries: GitHub Container Registry (GHCR)

GitHub Container Registry (GHCR) stores images next to your code and integrates directly with GitHub Actions, packages, and fine-grained permissions. Images live under `ghcr.io/<owner>/<image>`.

<ExampleBox title="Tag for GHCR and push" lang="bash">
```bash
docker tag myapp:1.0 ghcr.io/myuser/myapp:1.0
echo $TOKEN | docker login ghcr.io -u myuser --password-stdin
docker push ghcr.io/myuser/myapp:1.0
```
</ExampleBox>

Authentication uses a personal access token (classic with `write:packages` or a fine-grained token scoped to the package). In CI, the built-in `GITHUB_TOKEN` handles login automatically.

Key points:
- Namespace is lowercase: `ghcr.io/<owner>/<repo>` — owner and repository names must be lowercased.
- Package visibility (public/private/internal) and access are managed in the GitHub UI or via the API.
- In GitHub Actions, use the `GITHUB_TOKEN` with `permissions: packages: write` instead of a manual token for pushes.
- Delete old versions from the Packages settings to control storage costs.

<ExerciseBox title="Push an image to GHCR" difficulty="Medium">
Create a fine-grained or classic token with package write access, tag a local image as `ghcr.io/&lt;your-user>/demo:1.0`, and push it. Verify it appears under your GitHub account's Packages and pull it back on another machine.
</ExerciseBox>

<ExerciseBox title="Consume a GHCR image in Compose" difficulty="Easy">
Reference your GHCR image in a `compose.yaml` `image:` field, configure `docker login ghcr.io` on a host, and run `docker compose up` to confirm the private image pulls successfully.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-github-container-registry-ghcr" :cards="[
  { q: 'What is the GHCR image namespace format?', a: '<code>ghcr.io/&lt;owner&gt;/&lt;image&gt;</code>, with lowercase owner and repo.' },
  { q: 'In GitHub Actions, which token can push to GHCR without a manual secret?', a: 'The built-in <code>GITHUB_TOKEN</code> with <code>permissions: packages: write</code>.' },
  { q: 'How do you log in to GHCR with a token via stdin?', a: 'Run <code>echo $TOKEN | docker login ghcr.io -u myuser --password-stdin</code>.' },
  { q: 'Where is package visibility and access for GHCR images managed?', a: 'In the GitHub UI or via the API (public/private/internal).' }
]" />

## Resources

<ResourceTable title="GitHub Container Registry" :resources="[
  { label: 'Working with GHCR', platform: 'Official', type: 'Docs', url: 'https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry' },
  { label: 'docker push reference', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/commandline/push/' },
  { label: 'Docker registries explained', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/docker/' },
  { label: 'Docker Hub vs GHCR', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=QjzI2QZj3k0' },
  { label: 'GHCR example workflows', platform: 'GitHub', type: 'GitHub', url: 'https://github.com/docker/awesome-compose' }
]" />

## Checklist

<ProgressChecklist :items="['Tagged for GHCR', 'Pushed to GHCR']" storageKey="docker/8-github-container-registry-ghcr" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
