---
title: CS50 (Harvard)
---

# Intro CS: CS50 (Harvard)

CS50 is Harvard's introduction to computer science and the art of programming. It teaches computational thinking and the fundamentals of C, Python, SQL, and web development. The problem sets (PSETs) build from scratch-style puzzles in Week 0 to real programs in C, Python, and SQL by Week 5.

<ExampleBox title="Hello, World in C and Python" lang="c">

```c
#include <stdio.h>

int main(void)
{
    printf("Hello, world!\n");
}
```

```python
def main():
    print("Hello, world!")

if __name__ == "__main__":
    main()
```
</ExampleBox>

Key points:
- Computational thinking: decomposition, pattern recognition, abstraction, algorithms.
- C teaches memory, pointers, and how higher-level languages work under the hood.
- Python is used for automation, data, and faster prototyping.
- SQL introduces relational data modeling and querying.
- Web track covers HTML, CSS, JavaScript, Flask, and databases.

<ExerciseBox title="Your first PSET" difficulty="Easy">

Install the CS50 IDE or VS Code with the `cs50` library. Write a program that asks the user for their name and prints a personalized greeting. Then solve the Week 1 "cash" or "credit" problem set locally.

</ExerciseBox>

<ExerciseBox title="Translate between languages" difficulty="Medium">

Take a small C function that computes the sum of an array and rewrite it in Python. Compare how each language handles loops, types, and memory.

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Started CS50', 'Finished Week 0–5 PSETs']" storageKey="computer-science/1-cs50-harvard" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-1-cs50-harvard" :cards="[
{ q: 'What four languages does CS50 teach?', a: 'C, Python, SQL, and web technologies (HTML/CSS/JS).' }, { q: 'What are the CS50 problem sets called?', a: '<b>PSETs</b>, building from puzzles to real programs.' }, { q: 'Why learn C early?', a: 'It teaches memory, pointers, and how higher-level languages work under the hood.' }, { q: 'What does SQL introduce?', a: 'Relational data modeling and querying of structured data.' }
]" />

## Resources

<ResourceTable title="CS50 Resources" :resources="[
  { label: 'CS50 (Harvard)', platform: 'Official', type: 'Docs', url: 'https://cs50.harvard.edu/' },
  { label: 'CS50 on edX', platform: 'Official', type: 'Video', url: 'https://www.edx.org/course/introduction-computer-science' },
  { label: 'Foundations of Computer Science', platform: 'GeeksforGeeks', type: 'Tutorial', url: 'https://www.geeksforgeeks.org/foundation-of-computer-science/' },
  { label: 'Python Official Docs', platform: 'Official', type: 'Docs', url: 'https://docs.python.org/3/' },
  { label: 'PostgreSQL Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/sql/' },
  { label: 'CS50 YouTube Lectures', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/c/cs50' }
]" />
