---
title: Your first HTML page
---

# Foundations (HTML & CSS): Your first HTML page

HTML (HyperText Markup Language) describes the structure of a web page using elements like headings, paragraphs, lists, and links. A valid page starts with `<!DOCTYPE html>` and nests content inside `<html>`, `<head>`, and `<body>`.

<ExampleBox title="A minimal HTML page" lang="html">

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>First</title>
  </head>
  <body>
    <h1>Hello, Web!</h1>
    <p>My first page.</p>
    <ul>
      <li>Learn HTML</li>
      <li>Learn CSS</li>
    </ul>
    <a href="https://developer.mozilla.org/">MDN Docs</a>
  </body>
</html>
```
</ExampleBox>

Key points:
- `<!DOCTYPE html>` switches the browser into standards mode.
- `<head>` holds metadata; `<body>` holds visible content.
- Semantic tags (`<h1>`, `<ul>`, `<a>`) improve accessibility and SEO.
- Always set `lang` and `charset` for correct rendering.
- Open the file directly in a browser to preview — no server needed.

<ExerciseBox title="Build your page" difficulty="Easy">

Create `index.html` with a heading, a paragraph, an unordered list of three hobbies, and a link to your favorite site. Open it in a browser to confirm it renders.

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Created index.html', 'Opened it in a browser', 'Added a list and a link']" storageKey="web-development/1-your-first-html-page" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-1-your-first-html-page" :cards="[
{ q: 'What declares standards mode?', a: '<code>&lt;!DOCTYPE html&gt;</code> at the top of the page.' }, { q: 'What holds visible page content?', a: 'The <code>&lt;body&gt;</code> element.' }, { q: 'What holds page metadata?', a: 'The <code>&lt;head&gt;</code> element, including title and charset.' }, { q: 'Why set the lang attribute?', a: 'For correct rendering and accessibility.' }
]" />

## Resources

<ResourceTable title="HTML Resources" :resources="[
  { label: 'HTML Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/html/' },
  { label: 'HTML Basics', platform: 'MDN', type: 'Docs', url: 'https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics' },
  { label: 'freeCodeCamp Responsive Web Design', platform: 'freeCodeCamp', type: 'Practice', url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/' },
  { label: 'HTML Full Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=PkZNo7MFNFg' }
]" />
