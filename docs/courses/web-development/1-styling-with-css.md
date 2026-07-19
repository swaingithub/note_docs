---
title: Styling with CSS
---

# Foundations (HTML & CSS): Styling with CSS

CSS (Cascading Style Sheets) controls how HTML looks. You select elements and apply properties like color, spacing, and layout. Modern CSS uses Flexbox and Grid for responsive layouts, and media queries to adapt to screen size.

<ExampleBox title="Styling and responsiveness" lang="html">

```html
<link rel="stylesheet" href="style.css" />
```
```css
body {
  font-family: system-ui, sans-serif;
  max-width: 720px;
  margin: 2rem auto;
}
h1 { color: #4f46e5; }
.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  background: #4f46e5;
  color: white;
  cursor: pointer;
}
.btn:hover { background: #3730a3; }

@media (max-width: 480px) {
  body { margin: 1rem; }
}
```
</ExampleBox>

Key points:
- Link a stylesheet with `<link rel="stylesheet" href="style.css">`.
- The **cascade** resolves conflicting rules by specificity and order.
- Flexbox aligns items in one dimension; Grid handles two dimensions.
- `:hover` and other pseudo-classes add interactivity without JS.
- Media queries make layouts responsive to viewport width.

<ExerciseBox title="Style your page" difficulty="Easy">

Link a stylesheet to your HTML page. Center the content with `max-width` and `margin: auto`, color the heading, and add a hover effect to a button.

</ExerciseBox>

<ExerciseBox title="Responsive layout" difficulty="Medium">

Build a two-column card layout with CSS Grid that collapses to a single column under 600px using a media query.

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Linked a stylesheet', 'Made the page responsive', 'Added a hover effect']" storageKey="web-development/1-styling-with-css" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-1-styling-with-css" :cards="[
{ q: 'How do you link a stylesheet?', a: '<code>&lt;link rel=&quot;stylesheet&quot; href=&quot;style.css&quot;&gt;</code>.' }, { q: 'Which layout is one-dimensional?', a: '<b>Flexbox</b> aligns items in one direction; Grid is two-dimensional.' }, { q: 'How do you adapt to screen size?', a: 'Use a <code>@media</code> query on viewport width.' }, { q: 'What resolves conflicting CSS rules?', a: 'The cascade by specificity and source order.' }
]" />

## Resources

<ResourceTable title="CSS Resources" :resources="[
  { label: 'CSS Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/css/' },
  { label: 'CSS Layout', platform: 'MDN', type: 'Docs', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout' },
  { label: 'Flexbox Froggy', platform: 'freeCodeCamp', type: 'Practice', url: 'https://flexboxfroggy.com/' },
  { label: 'CSS Full Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=1Rs2ND1ryYc' }
]" />
