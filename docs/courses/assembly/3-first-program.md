---
title: 'Lesson 3 — Registers & Your First Program'
---

# Lesson 3 — Registers & Your First Program

> **Module 1 · Foundations · Lesson 3 of 10**

Registers are the CPU's tiny, ultra-fast scratchpad memory — a handful of named slots, each 64 bits wide on x86-64. Everything you compute lives in registers (or memory addressed via registers).

## The general-purpose registers

x86-64 has 16 general-purpose 64-bit registers. Each has a traditional role:

| Register | Role |
|----------|------|
| `rax` | accumulator — return value, syscall number |
| `rbx` | base — callee-saved scratch |
| `rcx` | counter — 4th function arg, loops |
| `rdx` | data — 3rd arg, division remainder |
| `rsi` | source — 2nd function arg |
| `rdi` | destination — 1st function arg |
| `rsp` | stack pointer (top of stack) |
| `rbp` | base pointer (frame) |
| `r8`–`r15` | extra args / scratch |

Each 64-bit register also has smaller views: `rax` → `eax` (low 32), `ax` (low 16), `al` (low 8). Writing `eax` zeroes the upper 32 bits of `rax` automatically.

## Your first program

Here is the smallest useful program: it exits cleanly with status code 0.

<ExampleBox title="exit.asm — first program" lang="nasm">

```nasm
section .text
    global _start

_start:
    mov rax, 60     ; syscall number: sys_exit
    xor rdi, rdi    ; status = 0
    syscall
```

</ExampleBox>

Assemble, link, run, and check the exit code:

<ExampleBox title="Build & verify" lang="bash">

```bash
nasm -f elf64 exit.asm -o exit.o
ld exit.o -o exit
./exit
echo $?            # prints 0
```

</ExampleBox>

`echo $?` prints the **exit status** of the last program. Change `xor rdi, rdi` to `mov rdi, 42` and `$?` will print `42`.

## How it works

- `global _start` exports the label so `ld` knows where to begin.
- `mov rax, 60` puts the Linux syscall number for `exit` into `rax`.
- `syscall` traps into the kernel, which ends the process with status `rdi`.

<ExerciseBox title="Change the exit code" difficulty="Easy">
Modify `exit.asm` so the program exits with status 7. Rebuild, run, and confirm `echo $?` prints 7.
</ExerciseBox>

<ExerciseBox title="Explore register sizes" difficulty="Medium">
Write a program that sets `al` (low byte of `rax`) to `255` and exits with `rax` as the status. Predict `echo $?` before running, then verify.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-asm-3" :cards="[
  { q: 'How many general-purpose 64-bit registers does x86-64 have?', a: '16: rax, rbx, rcx, rdx, rsi, rdi, rsp, rbp, and r8 through r15.' },
  { q: 'What does writing <code>eax</code> do to the rest of <code>rax</code>?', a: 'It zeroes the upper 32 bits of rax automatically.' },
  { q: 'Why do we write <code>global _start</code>?', a: 'To export the _start label so the linker knows the program entry point.' },
  { q: 'What does <code>echo $?</code> show?', a: 'The exit status of the most recently run program.' }
]" />

## Resources

<ResourceTable title="Lesson 3 — further reading" :resources="[
  { label: 'x86-64 register overview', platform: 'Official', type: 'Docs', url: 'https://www.cs.virginia.edu/~evans/cs216/guides/x64.html' },
  { label: 'Linux syscall table', platform: 'Official', type: 'Docs', url: 'https://filippo.io/linux-syscall-table/' }
]" />

## Checklist

<ProgressChecklist :items="['Can name the 16 registers', 'Built and ran first program', 'Changed exit code and verified with $?']" storageKey="assembly/3-first-program" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
