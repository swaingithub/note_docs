---
title: OverTheWire
---

# Hands-On (CTF): OverTheWire

Capture-the-flag (CTF) platforms like **OverTheWire** teach security by doing. The **Bandit** wargame walks you from basic Linux commands to privilege, networking, and binary-exploit fundamentals — all on authorized, legal infrastructure.

<ExampleBox title="Bandit-style commands" lang="bash">

```bash
# connect to the Bandit server
ssh bandit0@bandit.labs.overthewire.org -p 2220

# read a hidden file
ls -la
cat ./readme

# find a file by metadata
find / -group bandit6 -size 33c 2>/dev/null
```
</ExampleBox>

Key points:
- CTFs build real skills: enumeration, scripting, and lateral thinking.
- Bandit levels teach `ssh`, file permissions, `grep`, `find`, and encoding.
- Always practice on **authorized** platforms only (OverTheWire, picoCTF).
- Script repetitive steps (e.g. brute force) with Python or bash.
- Take notes per level — the techniques recur in harder wargames.

<ExerciseBox title="Bandit 1-5" difficulty="Easy">

Connect to Bandit and complete levels 0–5, noting the command used for each (hidden files, permissions, encoded data).

</ExerciseBox>

<ExerciseBox title="Bandit 6-10" difficulty="Medium">

Complete levels 6–10, which involve `find` by metadata, `strings` on binaries, and base64 decoding. Automate one step with a small script.

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Completed Bandit 1–5', 'Completed Bandit 6–10']" storageKey="cybersecurity/3-overthewire" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-3-overthewire" :cards="[
{ q: 'What does the Bandit wargame teach?', a: 'Linux, permissions, grep, find, and encoding basics.' }, { q: 'How do you connect to Bandit?', a: '<code>ssh bandit0@bandit.labs.overthewire.org -p 2220</code>.' }, { q: 'How do you find a file by metadata?', a: '<code>find / -group bandit6 -size 33c</code>.' }, { q: 'Where should CTF practice happen?', a: 'Only on authorized platforms like OverTheWire or picoCTF.' }
]" />

## Resources

<ResourceTable title="OverTheWire Resources" :resources="[
  { label: 'OverTheWire', platform: 'Official', type: 'Practice', url: 'https://overthewire.org/wargames/' },
  { label: 'Bandit Wargame', platform: 'Official', type: 'Practice', url: 'https://overthewire.org/wargames/bandit/' },
  { label: 'picoCTF', platform: 'Official', type: 'Practice', url: 'https://picoctf.org/' },
  { label: 'Cyber Security (GeeksforGeeks)', platform: 'GeeksforGeeks', type: 'Tutorial', url: 'https://www.geeksforgeeks.org/cyber-security/' },
  { label: 'CTF Intro', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=inWWhr9oI8U' }
]" />
