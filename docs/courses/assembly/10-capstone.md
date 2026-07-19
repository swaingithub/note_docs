---
title: 'Lesson 10 — Capstone: A Real Program'
---

# Lesson 10 — Capstone: A Real Program

> **Module 4 · Capstone · Lesson 10 of 10**

Time to combine everything: registers, loops, the stack, data, and system calls. We'll build a **string reverse + print** program — it reads a line you type, reverses it, and prints the result. This is the kind of small, real utility that proves you "know" assembly.

## What we're building

```
input:  hello
output: olleh
```

We'll reuse `sys_read` to get input, reverse the bytes in a buffer, then `sys_write` the reversed buffer.

## The full program

<ExampleBox title="reverse.asm — capstone" lang="nasm">

```nasm
section .bss
    buf resb 64

section .text
    global _start

_start:
    ; --- read a line ---
    mov rax, 0          ; sys_read
    mov rdi, 0          ; stdin
    mov rsi, buf
    mov rdx, 64
    syscall
    mov r12, rax        ; r12 = bytes read (callee-saved)
    dec r12             ; drop the trailing newline

    ; --- reverse in place using two pointers ---
    xor rsi, rsi        ; left  = 0
    mov rdi, r12        ; right = len-1
reverse_loop:
    cmp rsi, rdi
    jge reverse_done
    mov al, [buf + rsi]
    mov bl, [buf + rdi]
    mov [buf + rsi], bl
    mov [buf + rdi], al
    inc rsi
    dec rdi
    jmp reverse_loop
reverse_done:

    ; --- write the reversed buffer ---
    mov rax, 1          ; sys_write
    mov rdi, 1          ; stdout
    mov rsi, buf
    mov rdx, r12
    syscall

    ; --- print newline ---
    mov rax, 1
    mov rdi, 1
    mov rsi, nl
    mov rdx, 1
    syscall

    ; --- exit ---
    mov rax, 60
    xor rdi, rdi
    syscall

section .data
    nl db 10
```

</ExampleBox>

Build and try it:
```bash
nasm -f elf64 reverse.asm -o reverse.o && ld reverse.o -o reverse
./reverse
hello
olleh
```

## Why this proves the course

This program uses **every** concept:
- `.bss` buffer and `.data` constant (Lesson 8)
- `sys_read` / `sys_write` / `sys_exit` (Lesson 9)
- registers + `mov`/`cmp`/`dec`/`inc` (Lessons 4–5)
- a `cmp`/`jmp` loop with two pointers (Lesson 6)
- `r12` as a callee-saved register across the program (Lesson 7)

## Going further

Extend it yourself:
- Convert the input number to digits and print it (`exit` with the value).
- Make a **guessing game**: hardcode a secret, read the user's guess, compare, print "higher/lower".
- Port it to ARM or RISC-V (try the [browser playground](/assembly-playground)).

<ExerciseBox title="Capstone challenge" difficulty="Hard">
Take `reverse.asm` and add a feature: after reversing, if the original string is a palindrome (reads the same forwards/backwards), print `1` instead of the reversed text; otherwise print the reversed text. Build, run, and test with `racecar` (expect `1`) and `hello` (expect `olleh`).
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-asm-10" :cards="[
  { q: 'In reverse.asm, why is <code>r12</code> used for the length?', a: 'r12 is callee-saved, so its value is safe to keep around; also rax is overwritten by syscall return values.' },
  { q: 'Why <code>dec r12</code> after reading?', a: 'sys_read includes the trailing newline; we drop it so the reversal does not swap the newline into the middle.' },
  { q: 'What stops the reversal loop?', a: 'When the left pointer (rsi) meets or passes the right pointer (rdi), cmp rsi, rdi / jge exits.' },
  { q: 'What single concept from the course is NOT used in reverse.asm?', a: 'A called function (call/ret) — everything is inline in _start.' }
]" />

## Resources

<ResourceTable title="Lesson 10 — further reading" :resources="[
  { label: 'Programming From The Ground Up (free book)', platform: 'Free', type: 'Book', url: 'https://download-mirror.savannah.gnu.org/releases/pgubook/ProgrammingGroundUp-1-0-booksize.pdf' },
  { label: 'Assembly playground (browser)', platform: 'Internal', type: 'Practice', url: '/assembly-playground' },
  { label: 'x86 examples gallery', platform: 'GitHub', type: 'Practice', url: 'https://github.com/0xAX/asm' }
]" />

## Checklist

<ProgressChecklist :items="['Built reverse.asm', 'Read input and printed reversed output', 'Understood every concept used', 'Attempted the palindrome extension']" storageKey="assembly/10-capstone" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
