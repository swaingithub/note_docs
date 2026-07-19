---
title: SwiftUI Counter
---

# iOS (Swift): SwiftUI Counter

SwiftUI is Apple's declarative framework for building iOS, macOS, and other Apple-platform UIs. You declare views as structs and use the `@State` property wrapper to hold mutable state that automatically re-renders the view when changed.

<ExampleBox title="A SwiftUI counter" lang="swift">

```swift
import SwiftUI

struct CounterView: View {
    @State private var count = 0

    var body: some View {
        VStack(spacing: 16) {
            Text("Count: \(count)")
            Button("Increment") {
                count += 1
            }
        }
    }
}
```
</ExampleBox>

Key points:
- Views are `struct`s conforming to the `View` protocol.
- `@State private var` owns mutable state local to a view.
- Changing state triggers SwiftUI to recompute `body`.
- `VStack`/`HStack`/`ZStack` arrange views vertically, horizontally, depth-wise.
- Use `$count` (a binding) to pass writable state into child views.

<ExerciseBox title="Counter app" difficulty="Easy">

Build a SwiftUI counter that increments on tap and shows the current count with a label.

</ExerciseBox>

<ExerciseBox title="Add controls" difficulty="Medium">

Extend the counter with a "Reset" button and a step control that can increment or decrement by a user-chosen amount.

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Built a SwiftUI counter']" storageKey="mobile/2-swiftui-counter" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-2-swiftui-counter" :cards="[
{ q: 'What holds local SwiftUI state?', a: 'The <code>@State</code> property wrapper.' }, { q: 'What triggers a view re-render?', a: 'Mutating <code>@State</code> recomputes <code>body</code>.' }, { q: 'What arranges views vertically?', a: 'A <code>VStack</code>.' }, { q: 'How do you pass writable state down?', a: 'Via a binding using <code>$count</code>.' }
]" />

## Resources

<ResourceTable title="iOS (Swift) Resources" :resources="[
  { label: 'Swift', platform: 'Official', type: 'Docs', url: 'https://developer.apple.com/swift/' },
  { label: 'SwiftUI Tutorials', platform: 'Official', type: 'Tutorial', url: 'https://developer.apple.com/tutorials/swiftui' },
  { label: '100 Days of SwiftUI', platform: 'Official', type: 'Tutorial', url: 'https://www.hackingwithswift.com/100/swiftui' },
  { label: 'SwiftUI Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=Va1Xeq04KYo' }
]" />
