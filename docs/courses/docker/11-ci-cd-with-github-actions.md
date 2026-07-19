---
title: CI/CD with GitHub Actions
---

# Module 11 — Orchestration & Deployment: CI/CD with GitHub Actions

Continuous Integration builds, scans, and pushes your image on every commit, while Continuous Deployment ships it to a host. GitHub Actions runs these steps in hosted runners using the same Docker CLI you use locally.

<ExampleBox title=".github/workflows/ci.yml" lang="yaml">
```yaml
name: ci
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4
      - name: Log in to GHCR
        run: echo "$&#123;&#123; secrets.GITHUB_TOKEN &#125;&#125;" | docker login ghcr.io -u $&#123;&#123; github.actor &#125;&#125; --password-stdin
      - name: Build
        run: docker build -t ghcr.io/$&#123;&#123; github.repository &#125;&#125;:$&#123;&#123; github.sha &#125;&#125; .
      - name: Scan
        run: docker scout cves ghcr.io/$&#123;&#123; github.repository &#125;&#125;:$&#123;&#123; github.sha &#125;&#125;
      - name: Push
        run: docker push ghcr.io/$&#123;&#123; github.repository &#125;&#125;:$&#123;&#123; github.sha &#125;&#125;
```
</ExampleBox>

A deploy job can then pull the new image on a remote host via SSH:

<ExampleBox title="Deploy step over SSH" lang="bash">
```bash
ssh deploy@host "docker pull ghcr.io/$&#123;&#123; github.repository &#125;&#125;:$&#123;&#123; github.sha &#125;&#125; \
  && docker compose up -d"
```
</ExampleBox>

Key points:
- Use `permissions: packages: write` so `GITHUB_TOKEN` can push to GHCR without a manual secret.
- Tag images with `github.sha` for immutable, traceable versions instead of `latest`.
- Gate the pipeline on a security scan (`docker scout cves`) before pushing.
- Store registry credentials or SSH keys in GitHub encrypted secrets, never in the repo.

<ExerciseBox title="Build and push in CI" difficulty="Medium">
Create the workflow above in a repo, push a commit, and watch Actions build, scan, and push an image to GHCR. Confirm the package appears and the run log shows the scan output.
</ExerciseBox>

<ExerciseBox title="Add an automated deploy job" difficulty="Hard">
Extend the workflow with a deploy job that SSHes into a host (using a stored SSH key secret) and runs `docker compose pull && docker compose up -d` with the new SHA tag. Verify the live app updates after a push.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-ci-cd-with-github-actions" :cards="[
  { q: 'Which permission lets <code>GITHUB_TOKEN</code> push to GHCR without a manual secret?', a: '<code>permissions: packages: write</code>.' },
  { q: 'Why tag images with <code>github.sha</code> in CI?', a: 'It gives immutable, traceable versions instead of the mutable <code>latest</code> tag.' },
  { q: 'What should gate the pipeline before pushing an image?', a: 'A security scan such as <code>docker scout cves</code>.' },
  { q: 'Where should registry credentials or SSH keys be stored?', a: 'In GitHub encrypted secrets, never committed to the repo.' }
]" />

## Resources

<ResourceTable title="CI/CD with GitHub Actions" :resources="[
  { label: 'Build and push with Actions', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/ci-cd/github-actions/' },
  { label: 'Docker Scout in CI', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/scout/' },
  { label: 'CI/CD with Docker', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/docker/' },
  { label: 'GitHub Actions tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/docker/' },
  { label: 'Docker CI/CD video', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=QjzI2QZj3k0' }
]" />

## Checklist

<ProgressChecklist :items="['Wrote a build workflow', 'Added scanning', 'Added push step']" storageKey="docker/11-ci-cd-with-github-actions" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
