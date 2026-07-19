---
title: Signing Images (Notation)
---

# Module 9 — Security: Signing Images (Notation)

Signing proves an image's provenance and integrity. With Notation and the Docker Content Trust / Sigstore-style workflow, you cryptographically sign an image so consumers can verify it came from you and was not tampered with — a key supply-chain control.

<ExampleBox title="Sign and verify with Notation" lang="bash">
```bash
docker build -t myapp:1.0 .
notation sign myapp:1.0
docker pull myapp:1.0
notation verify myapp:1.0
```
</ExampleBox>

Notation uses a signing key (or a cloud KMS) and stores signatures alongside the image in the registry. Verification can be enforced at deployment time so unsigned images are rejected.

Key points:
- `notation sign` creates a signature tied to the image digest; the digest, not the tag, is what is actually signed.
- `notation verify` checks the signature against the configured trust policy before the image is trusted.
- Pair signing with a verification policy in your registry or admission controller to block unsigned images.
- Keep signing keys secure (HSM/KMS); rotate them and publish revocation info as needed.

<ExerciseBox title="Sign and verify an image" difficulty="Medium">
Install Notation, generate a test signing key, build and sign `myapp:1.0`, then run `notation verify` to confirm the signature validates. Modify the image, re-tag, and show that the old signature no longer matches.
</ExerciseBox>

<ExerciseBox title="Enforce verification in a policy" difficulty="Hard">
Configure a Notation trust policy that only accepts images signed by your key. Attempt to pull an unsigned image and confirm it is rejected, then pull a signed one and confirm it is allowed.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-signing-images-notation" :cards="[
  { q: 'What is actually signed by <code>notation sign</code>?', a: 'The image digest, not the tag.' },
  { q: 'What does <code>notation verify</code> check?', a: 'It checks the signature against the configured trust policy before the image is trusted.' },
  { q: 'How do you block unsigned images at deployment?', a: 'Pair signing with a verification policy in your registry or admission controller.' },
  { q: 'Where should signing keys be stored?', a: 'In a secure store like an HSM/KMS; rotate them and publish revocation info.' }
]" />

## Resources

<ResourceTable title="Signing Images (Notation)" :resources="[
  { label: 'Notation documentation', platform: 'Official', type: 'Docs', url: 'https://notaryproject.dev/docs/' },
  { label: 'Docker content trust', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/security/trust/' },
  { label: 'Supply-chain security', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/docker/' },
  { label: 'Image signing talk', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=QjzI2QZj3k0' },
  { label: 'Notation on GitHub', platform: 'GitHub', type: 'GitHub', url: 'https://github.com/notaryproject/notation' }
]" />

## Checklist

<ProgressChecklist :items="['Signed an image', 'Verified a signature']" storageKey="docker/9-signing-images-notation" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
