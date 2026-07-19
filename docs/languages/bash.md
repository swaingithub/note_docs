---
title: Bash / Shell
---

# Bash / Shell

**Bash** is the default shell on most Linux and macOS systems. It automates tasks, glues small tools together via pipes, and is essential for DevOps, scripting, and everyday terminal work.

> **Paradigms:** Procedural · Scripting · Imperative &nbsp;•&nbsp; **Extension:** `.sh` &nbsp;•&nbsp; **Run:** `bash file.sh`
> **Difficulty:** Beginner-friendly &nbsp;•&nbsp; **Created:** 1989 (Brian Fox, GNU)

## Table of Contents

- [1. Getting Started](#1-getting-started)
- [2. Variables & Expansion](#2-variables--expansion)
- [3. Quoting Rules](#3-quoting-rules)
- [4. Control Flow](#4-control-flow)
- [5. Pipes & Redirection](#5-pipes--redirection)
- [6. Text Processing](#6-text-processing)
- [7. Functions & Robust Scripts](#7-functions--robust-scripts)
- [8. Exercises](#8-exercises)
- [9. Resources](#9-resources)

---

## 1. Getting Started

<ExampleBox title="Hello, World" lang="bash">

```bash
#!/usr/bin/env bash
echo "Hello, Bash!"
```

</ExampleBox>

> 💡 **Tip:** Make a script executable with `chmod +x file.sh`, then run it with `./file.sh`.

---

## 2. Variables & Expansion

<ExampleBox title="Variables & command substitution" lang="bash">

```bash
name="Ada"
count=5
today=$(date +%F)          # command substitution
echo "Hi $name, today is $today"
echo "Count: ${count}"
```

</ExampleBox>

**Key rules:**
- No spaces around `=` (`x=1` not `x = 1`).
- Use `${var}` when concatenating with text.
- Prefer `$(...)` over backticks for command substitution.

---

## 3. Quoting Rules

| Quote | Behavior |
|-------|----------|
| `'single'` | Literal, no expansion |
| `"double"` | Expands variables & commands |
| `` `backtick` `` | Legacy command substitution (avoid) |

<ExampleBox title="Quote differences" lang="bash">

```bash
x=10
echo '$x'      # prints $x
echo "$x"      # prints 10
```

</ExampleBox>

---

## 4. Control Flow

<ExampleBox title="if / for / while" lang="bash">

```bash
if [ "$count" -gt 3 ]; then
  echo "big"
fi

for f in *.txt; do
  echo "File: $f"
done

while read -r line; do
  echo "$line"
done < input.txt
```

</ExampleBox>

Exit codes matter: `$?` holds the last command's status; `0` means success.

---

## 5. Pipes & Redirection

<ExampleBox title="Pipes and redirects" lang="bash">

```bash
ls -l | grep "\.sh$" > scripts.txt   # filter + write
cat error.log 2>&1                   # merge stderr into stdout
echo "append" >> file.txt            # append
```

</ExampleBox>

`|` chains commands; `>` overwrites, `>>` appends, `2>` redirects stderr.

---

## 6. Text Processing

<ExampleBox title="grep / sed / awk / cut" lang="bash">

```bash
grep -i "error" app.log
sed 's/old/new/g' file.txt
awk '{ sum += $1 } END { print sum }' data.txt
cut -d, -f1 users.csv
```

</ExampleBox>

---

## 7. Functions & Robust Scripts

<ExampleBox title="Functions + strict mode" lang="bash">

```bash
#!/usr/bin/env bash
set -euo pipefail

backup() {
  local src="$1"
  tar -czf "${src}.tar.gz" "$src"
}

backup "./docs"
```

</ExampleBox>

`set -euo pipefail` makes scripts fail fast on errors — a best practice.

---

## 8. Exercises

<ExerciseBox title="Exercise 1 — Greet" difficulty="Easy">

Write a script that takes a name as an argument (`$1`) and prints `Hello, &lt;name>!`.
</ExerciseBox>

<ExerciseBox title="Exercise 2 — Log scanner" difficulty="Medium">

Write a script that counts how many times the word `ERROR` appears in a given log file.
</ExerciseBox>

<ExerciseBox title="Exercise 3 — Safe backup" difficulty="Hard">

Write a `backup` function using `set -euo pipefail` that archives a directory and verifies the archive exists before printing success.
</ExerciseBox>

---

## 9. Self-Test (Flashcards)

<Quiz storageKey="quiz-bash" :cards="[
  { q: 'Why is there no space around the equals sign in <code>x=1</code>?', a: 'Bash would parse <code>x = 1</code> as running a command named <code>x</code> with arguments <code>=</code> and <code>1</code>. Assignment must be <code>x=1</code> with no spaces.' },
  { q: 'What is the difference between single and double quotes?', a: 'Single quotes are literal (no expansion); double quotes expand variables and command substitutions, e.g. <code>echo &quot;$x&quot;</code> prints the variable\'s value.' },
  { q: 'What does <code>set -euo pipefail</code> do?', a: 'It makes a script exit on errors (<code>-e</code>), on undefined variables (<code>-u</code>), and on pipeline failures (<code>-o pipefail</code>) — failing fast for robustness.' },
  { q: 'What is the difference between <code>&gt;</code> and <code>&gt;&gt;</code> in redirection?', a: '<code>&gt;</code> overwrites the target file; <code>&gt;&gt;</code> appends to it. <code>2&gt;</code> redirects stderr specifically.' }
]" />

## 10. Resources

<ResourceTable title="Bash learning paths" :resources="[
  { label: 'Bash Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/bash/' },
  { label: 'Bash Guide', platform: 'GitHub', type: 'Book', url: 'https://github.com/Idnan/bash-guide' },
  { label: 'GNU Bash Manual', platform: 'Official', type: 'Docs', url: 'https://www.gnu.org/software/bash/manual/' },
  { label: 'Linux Journey', platform: 'LinuxJourney', type: 'Tutorial', url: 'https://linuxjourney.com/' },
  { label: 'ShellCheck', platform: 'Official', type: 'Practice', url: 'https://www.shellcheck.net/' },
  { label: 'Bash in 1 Hour', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=Z2PzM1y7O7o' },
  { label: 'Bash Scripting GFG', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/bash-scripting-introduction/ ' }
]" />

> 📝 Draft anything in the [Live Editor](/editor), then paste it here to keep your docs current.
