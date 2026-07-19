---
title: XSS & SQL Injection
---

# Web Security: XSS & SQL Injection

Two of the most common web vulnerabilities: **XSS** (cross-site scripting) lets attackers run JavaScript in a victim's browser, and **SQL Injection** lets them manipulate database queries. Both are fixed by treating untrusted input as data, never code.

<ExampleBox title="Vulnerable vs safe" lang="js">

```js
// XSS: inserting user input as HTML
element.innerHTML = userInput;            // VULNERABLE
element.textContent = userInput;          // SAFE

// SQLi: string-built query vs parameterized
const bad = `SELECT * FROM users WHERE name = '${name}'`;   // VULNERABLE
const good = "SELECT * FROM users WHERE name = $1";        // SAFE (parameterized)
```
</ExampleBox>

Key points:
- Use `textContent` (not `innerHTML`) to avoid injecting live HTML/JS.
- Escape output and set a strict **Content-Security-Policy**.
- SQL Injection is defeated by **parameterized queries / prepared statements**.
- Never concatenate user input into SQL, shell commands, or HTML.
- Validate and sanitize input on the server, not only the client.

<ExerciseBox title="Fix an XSS bug" difficulty="Easy">

Given `div.innerHTML = comment`, rewrite the code to render user comments safely and add a CSP meta tag that blocks inline scripts.

</ExerciseBox>

<ExerciseBox title="Fix a SQLi bug" difficulty="Medium">

Refactor a login query built by string concatenation into a parameterized query using your DB driver's placeholders, and explain why it's safe.

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Fixed an XSS bug', 'Fixed a SQLi bug']" storageKey="cybersecurity/2-xss-sql-injection" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-2-xss-sql-injection" :cards="[
{ q: 'How do you safely render user input in the DOM?', a: 'Use <code>textContent</code>, not <code>innerHTML</code>.' }, { q: 'How do you defeat SQL injection?', a: 'Parameterized queries / prepared statements.' }, { q: 'Why never concatenate user input into SQL?', a: 'It lets attackers inject their own query logic.' }, { q: 'What header blocks inline scripts?', a: 'A strict <b>Content-Security-Policy</b>.' }
]" />

## Resources

<ResourceTable title="XSS & SQL Injection Resources" :resources="[
  { label: 'OWASP XSS', platform: 'Official', type: 'Docs', url: 'https://owasp.org/www-community/attacks/xss/' },
  { label: 'OWASP SQL Injection', platform: 'Official', type: 'Docs', url: 'https://owasp.org/www-community/attacks/SQL_Injection' },
  { label: 'Web Security (W3Schools)', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/cybersecurity/index.php' },
  { label: 'Cyber Security (GeeksforGeeks)', platform: 'GeeksforGeeks', type: 'Tutorial', url: 'https://www.geeksforgeeks.org/cyber-security/' },
  { label: 'Web Security Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=inWWhr9oI8U' }
]" />
