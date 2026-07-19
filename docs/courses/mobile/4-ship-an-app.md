---
title: Ship an App
---

# Capstone: Ship an App

The capstone is publishing a real app to a store or distribution channel — Google Play (Android), TestFlight/App Store (iOS), or an internal/beta track for Flutter. Shipping teaches release signing, store metadata, and the review process.

<ExampleBox title="Build and release commands" lang="bash">

```bash
# Android: build a signed release AAB
./gradlew bundleRelease

# Flutter: build for the target platform
flutter build appbundle
flutter build ios --release

# iOS: archive and upload via Xcode or CLI
xcrun altool --upload-app -f MyApp.ipa -u "email@apple.com"
```
</ExampleBox>

Key points:
- Android distributes via **AAB** to Google Play; signing uses a keystore.
- iOS uses **TestFlight** for beta testing before App Store review.
- Flutter builds for both platforms from one codebase.
- Store listings need screenshots, descriptions, and a privacy policy.
- Beta/internal tracks let you validate before a public release.

<ExerciseBox title="Publish a beta" difficulty="Hard">

Build a release artifact for your platform and upload it to a beta track (Google Play internal test or TestFlight). Verify it installs on a test device.

</ExerciseBox>

<ExerciseBox title="Store listing" difficulty="Easy">

Write the store listing copy: a 2-sentence description, three feature bullets, and a list of screenshots you would capture.

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Shipped an app']" storageKey="mobile/4-ship-an-app" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-4-ship-an-app" :cards="[
{ q: 'What format does Android ship to Play?', a: 'An <b>AAB</b> (Android App Bundle), signed with a keystore.' }, { q: 'What does iOS use for beta testing?', a: '<b>TestFlight</b> before App Store review.' }, { q: 'What builds Flutter for both platforms?', a: '<code>flutter build appbundle</code> and <code>flutter build ios --release</code>.' }, { q: 'What do store listings need?', a: 'Screenshots, descriptions, and a privacy policy.' }
]" />

## Resources

<ResourceTable title="Ship an App Resources" :resources="[
  { label: 'Google Play Console', platform: 'Official', type: 'Docs', url: 'https://play.google.com/console/' },
  { label: 'App Store Connect', platform: 'Official', type: 'Docs', url: 'https://developer.apple.com/app-store-connect/' },
  { label: 'Flutter Deployment', platform: 'Official', type: 'Docs', url: 'https://docs.flutter.dev/deployment' },
  { label: 'Publishing Apps', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=1gD2ZQP7RFs' }
]" />
