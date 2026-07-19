---
title: Nand to Tetris
---

# Core Systems: Nand to Tetris

Nand to Tetris (The Elements of Computing Systems) takes you from a single NAND logic gate all the way to a working computer running a program you wrote — including an assembler, virtual machine, compiler, and operating system. It demystifies every layer of a computer.

<ExampleBox title="Building logic from NAND" lang="python">

```python
# NAND is functionally complete: every gate can be built from it.
def nand(a, b):
    return 0 if (a == 1 and b == 1) else 1

def not_gate(a):
    return nand(a, a)

def and_gate(a, b):
    return not_gate(nand(a, b))

def or_gate(a, b):
    return nand(not_gate(a), not_gate(b))

assert or_gate(0, 1) == 1
assert and_gate(1, 1) == 1
```
</ExampleBox>

Key points:
- A **NAND gate** alone can build NOT, AND, OR, and every other logic gate.
- Combine gates into multiplexers, adders, and finally a CPU (the "Hack" architecture).
- A **machine language** lets you program the CPU with A/M/D registers and jumps.
- An **assembler** translates symbolic code to binary; a **VM** and **compiler** raise the level of abstraction.
- The course culminates in an OS and a Tetris game running on your own stack.

<ExerciseBox title="Build the gates" difficulty="Medium">

Implement XOR using only `nand`, `not_gate`, `and_gate`, and `or_gate`. Then build a 1-bit multiplexer that returns `a` when `sel==0` and `b` when `sel==1`.

</ExerciseBox>

<ExerciseBox title="Write Hack assembly" difficulty="Hard">

Write a small Hack assembly program that computes the sum of the numbers stored at RAM[0] and RAM[1] and stores the result in RAM[2]. Use the A and D registers and the M reference.

</ExerciseBox>

## Checklist

<ProgressChecklist :items="['Completed all 12 projects']" storageKey="computer-science/4-nand-to-tetris" />

> Note your learnings in the [Live Editor](/editor) and export them here.

## Self-Test (Flashcards)

<Quiz storageKey="quiz-4-nand-to-tetris" :cards="[
{ q: 'What makes NAND functionally complete?', a: 'Every logic gate can be built from NAND alone.' }, { q: 'How do you build NOT from NAND?', a: '<code>not(a) = nand(a, a)</code>.' }, { q: 'What does an assembler produce?', a: 'It translates symbolic machine code into binary.' }, { q: 'What does the Hack machine language use?', a: 'A and M/D registers plus jump instructions.' }
]" />

## Resources

<ResourceTable title="Nand to Tetris Resources" :resources="[
  { label: 'Nand to Tetris', platform: 'Official', type: 'Docs', url: 'https://www.nand2tetris.org/' },
  { label: 'Elements of Computing Systems', platform: 'GitHub', type: 'Book', url: 'https://github.com/yuan-xy/Nand2Tetris' },
  { label: 'Logic Gates Explained', platform: 'GeeksforGeeks', type: 'Tutorial', url: 'https://www.geeksforgeeks.org/logic-gates/' },
  { label: 'Course Lectures', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=QZwNezHgrRE' },
  { label: 'Computer Architecture', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/whatis/whatis_computer_architecture.asp' }
]" />
