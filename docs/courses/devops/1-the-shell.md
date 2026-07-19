---
title: The Shell
---

# Linux & Git: The Shell

The shell is your command-line interface to Linux. You navigate the filesystem, manage permissions, and chain commands with **pipes** to filter and transform text — essential for debugging logs and automating servers.

<ExampleBox title="Everyday shell commands" lang="bash">

```bash
ls -la                      # list files with details
chmod +x deploy.sh          # make a script executable
cat app.log | grep ERROR | tail -n 20   # last 20 errors

# loop over files
for f in *.txt; do echo "processing $f"; done
```
</ExampleBox>

Key points:
- `ls -la` shows permissions, owner, and size for each file.
- `chmod +x` marks a script executable so it can be run directly.
- **Pipes** (`|`) send one command's output into the next as input.
- `grep` filters lines by pattern; `tail`/`head` slice output.
- Loops and variables let you script repetitive tasks.

<ExerciseBox title="Log triage" difficulty="Easy">

Write a one-liner that finds the top 5 most common error messages in a log file using `grep`, `sort`, and `uniq -c`.

</ExerciseBox>

<ExerciseBox title="A deploy script" difficulty="Medium">

Write a `deploy.sh` that `cd`s into a project, pulls the latest changes, installs dependencies, and restarts a service. Make it executable and run it.

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Wrote a shell script', 'Used pipes & grep']" storageKey="devops/1-the-shell" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-1-the-shell" :cards="[
{ q: 'How do you make a script executable?', a: '<code>chmod +x deploy.sh</code>.' }, { q: 'What sends output into the next command?', a: 'A <b>pipe</b>: <code>|</code>.' }, { q: 'How do you find the last 20 errors?', a: '<code>cat app.log | grep ERROR | tail -n 20</code>.' }, { q: 'What shows file permissions and owner?', a: '<code>ls -la</code>.' }
]" />

## Resources

<ResourceTable title="Shell Resources" :resources="[
  { label: 'Linux Command Line', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/linux/' },
  { label: 'Bash Reference Manual', platform: 'Official', type: 'Docs', url: 'https://www.gnu.org/software/bash/manual/' },
  { label: 'Shell Scripting', platform: 'GeeksforGeeks', type: 'Tutorial', url: 'https://www.geeksforgeeks.org/linux/shell-scripting-in-linux/' },
  { label: 'Bash Crash Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=uhRWMGBju4A' }
]" />
