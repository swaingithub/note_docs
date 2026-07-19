---
title: HTML / CSS
---

# HTML / CSS

**HTML** structures content; **CSS** styles it. Together they are the foundation of every web page. Modern CSS includes Flexbox, Grid, and custom properties for powerful, responsive layouts.

> **Paradigms:** Declarative · Markup & Styling &nbsp;•&nbsp; **Extensions:** `.html` / `.css` &nbsp;•&nbsp; **Run:** open the file in a browser
> **Difficulty:** Beginner-friendly &nbsp;•&nbsp; **Standards:** W3C / WHATWG

## Table of Contents

- [1. Getting Started](#1-getting-started)
- [2. Semantic HTML](#2-semantic-html)
- [3. The Box Model](#3-the-box-model)
- [4. Flexbox](#4-flexbox)
- [5. CSS Grid](#5-css-grid)
- [6. Responsive Design](#6-responsive-design)
- [7. Custom Properties](#7-custom-properties)
- [8. Accessibility](#8-accessibility)
- [9. Exercises](#9-exercises)
- [10. Resources](#10-resources)

---

## 1. Getting Started

A minimal HTML page links a stylesheet and shows content. Edit it live below.

<TryIt lang="html" code="<h1 style='color:#4f46e5'>Hello, Web!</h1>&#10;<p>Edit me and press <strong>Run</strong>.</p>&#10;<button onclick=&quot;alert('clicked!')&quot;>Click me</button>" />

<ExampleBox title="Basic page structure" lang="html">

```html
<!DOCTYPE html>
&lt;html lang="en">
  &lt;head>
    &lt;meta charset="UTF-8" />
    &lt;title>My Page&lt;/title>
    &lt;link rel="stylesheet" href="style.css" />
  &lt;/head>
  &lt;body>
    &lt;h1>Hello, Web!&lt;/h1>
  &lt;/body>
&lt;/html>
```

</ExampleBox>

---

## 2. Semantic HTML

Use meaningful tags for accessibility and SEO.

<ExampleBox title="Landmarks" lang="html">

```html
&lt;header>&lt;nav>…&lt;/nav>&lt;/header>
&lt;main>
  &lt;article>
    &lt;h2>Post title&lt;/h2>
    &lt;p>Content here.&lt;/p>
  &lt;/article>
&lt;/main>
&lt;footer>© 2026&lt;/footer>
```

</ExampleBox>

**Key rules:**
- Prefer `<header>`, `<main>`, `<article>`, `<nav>`, `<footer>` over nested `<div>`s.
- Every `<img>` needs descriptive `alt` text.

---

## 3. The Box Model

Every element is a box: **content → padding → border → margin**. Use `box-sizing: border-box` so padding/border stay inside the set width.

<ExampleBox title="Box model" lang="css">

```css
.card {
  box-sizing: border-box;
  width: 300px;
  padding: 16px;
  border: 1px solid #ddd;
  margin: 12px;
}
```

</ExampleBox>

---

## 4. Flexbox

One-dimensional layout (row or column).

<ExampleBox title="Center with flex" lang="css">

```css
.row {
  display: flex;
  justify-content: center;  /* main axis */
  align-items: center;      /* cross axis */
  gap: 12px;
}
```

</ExampleBox>

---

## 5. CSS Grid

Two-dimensional layout (rows + columns).

<ExampleBox title="Responsive grid" lang="css">

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}
```

</ExampleBox>

---

## 6. Responsive Design

Design mobile-first, then enhance with media queries.

<ExampleBox title="Media query" lang="css">

```css
.container { padding: 12px; }
@media (min-width: 768px) {
  .container { padding: 24px; max-width: 960px; margin: 0 auto; }
}
```

</ExampleBox>

Fluid units like `rem`, `%`, and `clamp()` reduce the need for breakpoints.

---

## 7. Custom Properties

CSS variables enable theming and reuse.

<ExampleBox title="CSS variables" lang="css">

```css
:root {
  --brand: #4f46e5;
  --radius: 12px;
}
.button {
  background: var(--brand);
  border-radius: var(--radius);
}
```

</ExampleBox>

---

## 8. Accessibility

- Use semantic tags and `alt` text.
- Maintain sufficient color **contrast**.
- Ensure full **keyboard navigation**.
- Use ARIA attributes only when native semantics are insufficient.

---

## 9. Exercises

<ExerciseBox title="Exercise 1 — Card component" difficulty="Easy">

Build a `.card` with a title, body text, and a button using Flexbox, with `box-sizing: border-box`.
</ExerciseBox>

<ExerciseBox title="Exercise 2 — Responsive gallery" difficulty="Medium">

Create a photo gallery using CSS Grid that shows 1 column on mobile and 4 on desktop.
</ExerciseBox>

<ExerciseBox title="Exercise 3 — Theme switch" difficulty="Hard">

Use CSS custom properties to implement a light/dark theme toggled by a `data-theme` attribute on `&lt;html>`.
</ExerciseBox>

---

## 10. Self-Test (Flashcards)

<Quiz storageKey="quiz-html-css" :cards="[
  { q: 'What are the four parts of the CSS box model, from inside out?', a: 'Content, padding, border, and margin. With <code>box-sizing: border-box</code>, padding and border are drawn inside the element\'s set width.' },
  { q: 'When should you use Flexbox versus CSS Grid?', a: 'Use Flexbox for one-dimensional layouts (a single row or column); use Grid for two-dimensional layouts with explicit rows and columns.' },
  { q: 'Why is semantic HTML important?', a: 'Tags like <code>&lt;header&gt;</code>, <code>&lt;main&gt;</code>, and <code>&lt;nav&gt;</code> convey meaning to browsers, screen readers, and search engines, improving accessibility and SEO.' },
  { q: 'What is the purpose of a CSS custom property?', a: 'Declared with <code>--name</code> and read via <code>var()</code>, custom properties (CSS variables) centralize values for theming and reuse, and can be changed at runtime.' }
]" />

## 11. Resources

<ResourceTable title="HTML & CSS learning paths" :resources="[
  { label: 'HTML Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/html/' },
  { label: 'CSS Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/css/' },
  { label: 'HTML Reference', platform: 'MDN', type: 'Docs', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
  { label: 'CSS Reference', platform: 'MDN', type: 'Docs', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
  { label: 'Learn CSS', platform: 'web.dev', type: 'Tutorial', url: 'https://web.dev/learn/css/' },
  { label: 'Flexbox Froggy', platform: 'freeCodeCamp', type: 'Practice', url: 'https://flexboxfroggy.com/' },
  { label: 'Responsive Web Design', platform: 'freeCodeCamp', type: 'Practice', url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/' },
  { label: 'CSS Full Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=OEV8gMkCHXQ' },
  { label: 'Grid Garden', platform: 'GeeksforGeeks', type: 'Practice', url: 'https://cssgridgarden.com/' }
]" />

> 📝 Draft anything in the [Live Editor](/editor), then paste it here to keep your docs current.
