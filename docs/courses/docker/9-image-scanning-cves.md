---
title: Image Scanning (CVEs)
---

# Module 9 — Security: Image Scanning (CVEs)

Images bundle an OS and dependencies, so they inevitably inherit known vulnerabilities (CVEs). Scanning early and often — especially in CI — lets you catch and fix issues before they reach production.

<ExampleBox title="Scan with Docker Scout" lang="bash">
```bash
docker scout cves myapp:1.0
docker scout quickview myapp:1.0
docker scout recommendations myapp:1.0
```
</ExampleBox>

Trivy is a popular open-source alternative that works without a Docker account:

<ExampleBox title="Scan with Trivy" lang="bash">
```bash
trivy image myapp:1.0
trivy image --severity HIGH,CRITICAL --exit-code 1 myapp:1.0
```
</ExampleBox>

Key points:
- Scanners compare your image's package list against vulnerability databases and report severity, fix versions, and exploitability.
- Fix findings by upgrading base images (`FROM node:20-alpine` → a patched tag) and dependencies, then rebuild.
- Gate CI on critical/high findings with `--exit-code 1` so vulnerable images never ship.
- Continuous scanning matters because new CVEs are published after an image was built.

<ExerciseBox title="Scan and remediate a CVE" difficulty="Medium">
Scan one of your images with `docker scout cves` or `trivy image`. Identify a HIGH/CRITICAL finding, upgrade the affected base image or package, rebuild, and re-scan to confirm the finding is gone.
</ExerciseBox>

<ExerciseBox title="Add scanning to CI as a gate" difficulty="Hard">
Write a CI step that builds the image and runs a scanner with `--exit-code 1` on HIGH/CRITICAL severities. Push a deliberately vulnerable image and confirm the pipeline fails; then fix it and confirm it passes.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-image-scanning-cves" :cards="[
  { q: 'Name two tools that scan images for CVEs.', a: 'Docker Scout (<code>docker scout cves</code>) and Trivy (<code>trivy image</code>).' },
  { q: 'How do you gate CI so vulnerable images never ship?', a: 'Run the scanner with <code>--exit-code 1</code> on HIGH/CRITICAL severities.' },
  { q: 'How do you fix a CVE found in a base image?', a: 'Upgrade the base image or dependency to a patched version, then rebuild.' },
  { q: 'Why is continuous scanning important?', a: 'New CVEs are published after an image was built, so old images can become vulnerable.' }
]" />

## Resources

<ResourceTable title="Image Scanning (CVEs)" :resources="[
  { label: 'Docker Scout', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/scout/' },
  { label: 'Docker security', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/security/' },
  { label: 'Trivy scanner docs', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/docker/' },
  { label: 'Scanning tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/docker/' },
  { label: 'Image scanning video', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=QjzI2QZj3k0' }
]" />

## Checklist

<ProgressChecklist :items="['Scanned with docker scout', 'Scanned with trivy', 'Triaged CVEs']" storageKey="docker/9-image-scanning-cves" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
