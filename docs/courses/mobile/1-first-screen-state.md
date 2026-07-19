---
title: First Screen & State
---

# Android (Kotlin): First Screen & State

Jetpack Compose is Android's modern declarative UI toolkit. You describe the UI as composable functions, and **state** drives recomposition — when state changes, Compose re-renders the affected UI automatically.

<ExampleBox title="A Compose counter with state" lang="kotlin">

```kotlin
import androidx.activity.ComponentActivity
import androidx.compose.runtime.*
import androidx.compose.material.*
import androidx.compose.foundation.layout.*

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        setContent { Counter() }
    }
}

@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }
    Button(onClick = { count++ }) {
        Text("Clicked $count times")
    }
}
```
</ExampleBox>

Key points:
- `@Composable` functions describe UI as a function of state.
- `remember { mutableStateOf(...) }` holds state that survives recomposition.
- Mutating state (`count++`) triggers Compose to re-render.
- `setContent { ... }` sets the Compose UI as the activity's content.
- Prefer unidirectional data flow: events update state, state renders UI.

<ExerciseBox title="Build a screen" difficulty="Easy">

Create a Compose screen showing a greeting `Text` and a `Button` that increments a counter displayed below it.

</ExerciseBox>

<ExerciseBox title="State hoisting" difficulty="Medium">

Refactor the counter so the state lives in the parent composable and is passed down with an `onIncrement` callback — practice state hoisting.

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Built a Compose screen', 'Added state']" storageKey="mobile/1-first-screen-state" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-1-first-screen-state" :cards="[
{ q: 'What annotation marks a Compose UI function?', a: '<code>@Composable</code>.' }, { q: 'How do you hold state in Compose?', a: '<code>remember { mutableStateOf(0) }</code>.' }, { q: 'What happens when state mutates?', a: 'Compose recomposes and re-renders the affected UI.' }, { q: 'What sets the Compose content?', a: '<code>setContent { ... }</code> on the activity.' }
]" />

## Resources

<ResourceTable title="Android (Kotlin) Resources" :resources="[
  { label: 'Android Developers', platform: 'Official', type: 'Docs', url: 'https://developer.android.com/' },
  { label: 'Compose Basics', platform: 'Official', type: 'Tutorial', url: 'https://developer.android.com/courses/pathways/compose' },
  { label: 'Kotlin Docs', platform: 'Official', type: 'Docs', url: 'https://kotlinlang.org/docs/home.html' },
  { label: 'Android in Kotlin', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=1gD2ZQP7RFs' }
]" />
