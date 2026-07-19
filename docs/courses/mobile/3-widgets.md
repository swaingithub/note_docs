---
title: Widgets
---

# Flutter (Dart): Widgets

Flutter builds cross-platform apps from a single Dart codebase. Everything is a **widget** — structural (Column, Container), visual (Text, Image), or interactive (Button). Compose widgets in a tree to create rich UIs that run natively on iOS, Android, web, and desktop.

<ExampleBox title="A Flutter list screen" lang="dart">

```dart
import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    final items = ['Apple', 'Banana', 'Cherry'];
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: const Text('Fruits')),
        body: ListView(
          children: items.map((f) => ListTile(title: Text(f))).toList(),
        ),
      ),
    );
  }
}
```
</ExampleBox>

Key points:
- `StatelessWidget` has no mutable state; `StatefulWidget` holds state.
- `build()` returns the widget tree for a given state.
- `Column`/`Row`/`ListView` lay out children vertically, horizontally, or in a scrollable list.
- Hot reload lets you see changes instantly during development.
- Material widgets give a consistent, platform-adaptive look.

<ExerciseBox title="List screen" difficulty="Easy">

Build a Flutter screen that renders a scrollable list of 10 items, each showing an icon and a title.

</ExerciseBox>

<ExerciseBox title="Fetch and display" difficulty="Medium">

Use `FutureBuilder` with `http` to fetch JSON from a public API and display the results in a `ListView`, handling the loading and error states.

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Built a list screen', 'Fetched from an API']" storageKey="mobile/3-widgets" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-3-widgets" :cards="[
{ q: 'What is everything in Flutter?', a: 'A <b>widget</b> (structural, visual, or interactive).' }, { q: 'Which widget has no mutable state?', a: '<code>StatelessWidget</code>; <code>StatefulWidget</code> holds state.' }, { q: 'What returns the widget tree?', a: 'The <code>build()</code> method.' }, { q: 'What shows instant change during dev?', a: '<b>Hot reload</b>.' }
]" />

## Resources

<ResourceTable title="Flutter (Dart) Resources" :resources="[
  { label: 'Flutter Docs', platform: 'Official', type: 'Docs', url: 'https://flutter.dev/docs' },
  { label: 'Dart Language', platform: 'Official', type: 'Docs', url: 'https://dart.dev/guides' },
  { label: 'Flutter Codelabs', platform: 'Official', type: 'Tutorial', url: 'https://docs.flutter.dev/codelabs' },
  { label: 'Flutter Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=1gD2ZQP7RFs' }
]" />
