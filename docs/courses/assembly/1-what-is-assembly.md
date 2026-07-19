---
title: 'Lesson 1 — What is Assembly? & The CPU'
---

# Lesson 1 — What is Assembly? & The CPU

> **Module 1 · Foundations · Lesson 1 of 10**

Before writing any code, understand what you are talking to: the **CPU**. Assembly is the human-readable form of the instructions a CPU executes.

## What is a CPU?

The CPU (Central Processing Unit) is the chip that runs your programs. At the lowest level it repeatedly does three things:

1. **Fetch** the next instruction from memory (at the address in `rip`, the instruction pointer).
2. **Decode** what the instruction means.
3. **Execute** it (add, move, jump, …), then loop.

This is the **fetch-decode-execute cycle**, billions of times per second.

## Machine code vs. assembly

A CPU only understands **machine code** — raw numbers (bytes). Writing those by hand is painful:

```
10110000 01100001   ; what even is this?
```

**Assembly** gives each machine instruction a short name (mnemonic) and lets you use labels and names:

```nasm
mov al, 97          ; much clearer — load 97 into register al
```

The **assembler** (`nasm`) translates your assembly into machine code.

## Why so many assembly languages?

Assembly is tied to the **instruction set architecture (ISA)** — the specific design of the CPU.

| ISA | Used in |
|-----|---------|
| x86-64 | PCs, laptops, servers (Intel/AMD) |
| ARM / Aarch64 | phones, Apple Silicon, Raspberry Pi |
| RISC-V | open hardware, embedded, teaching |

There is no single "assembly" — only x86 assembly, ARM assembly, RISC-V assembly, etc. **This course uses x86-64 NASM** (the most common desktop target).

## Key takeaways

- Assembly is a 1:1-ish mapping to machine code.
- Each CPU family has its own assembly.
- You write `.asm`, the assembler makes machine code, the CPU runs it.

<ExerciseBox title="Think it through" difficulty="Easy">
In your own words, explain the difference between machine code and assembly to a friend. Then list two reasons a programmer would learn assembly today (hint: performance, security, OS internals).
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-asm-1" :cards="[
  { q: 'What are the three stages of the CPU fetch-decode-execute cycle?', a: 'Fetch the next instruction, decode it, execute it — then repeat.' },
  { q: 'What does an assembler do?', a: 'Translates human-readable assembly (.asm) into machine code (bytes) the CPU can run.' },
  { q: 'Why is there no single &quot;assembly language&quot;?', a: 'Each CPU family (x86, ARM, RISC-V) has its own instruction set, so each needs its own assembly.' },
  { q: 'What register holds the address of the next instruction?', a: 'The instruction pointer — <code>rip</code> on x86-64.' }
]" />

## Resources

<ResourceTable title="Lesson 1 — further reading" :resources="[
  { label: 'x86-64 Assembly Guide (UVA)', platform: 'Official', type: 'Docs', url: 'https://www.cs.virginia.edu/~evans/cs216/guides/x64.html' },
  { label: 'NASM Manual', platform: 'Official', type: 'Docs', url: 'https://www.nasm.us/doc/' },
  { label: 'How CPUs work', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=cNN_tTXABUA' }
]" />

## Checklist

<ProgressChecklist :items="['Explained machine code vs assembly', 'Can name 3 ISAs', 'Understands fetch-decode-execute']" storageKey="assembly/1-what-is-assembly" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
