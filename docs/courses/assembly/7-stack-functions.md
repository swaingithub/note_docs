---
title: 'Lesson 7 — The Stack & Functions'
---

# Lesson 7 — The Stack & Functions

> **Module 3 · Building Blocks · Lesson 7 of 10**

The stack is memory that grows downward, used to save registers, pass extra arguments, and implement functions. Understanding it unlocks real, modular programs.

## The stack pointer

`rsp` always points at the top of the stack (the lowest used address). Two instructions manage it:

<ExampleBox title="push / pop" lang="nasm">

```nasm
push rax          ; rsp -= 8; *rsp = rax
push rbx
; ... use rax, rbx freely ...
pop  rbx          ; rbx = *rsp; rsp += 8
pop  rax          ; restore in REVERSE order
```

</ExampleBox>

Whatever you `push` last is `pop`ped first (LIFO). Always balance pushes and pops.

## Functions and the calling convention

On Linux x86-64 (the **System V ABI**), the first six integer arguments go in registers:

```
rdi, rsi, rdx, rcx, r8, r9   (1st .. 6th)
```

The return value comes back in `rax`. Extra args go on the stack. `call` pushes the return address and jumps; `ret` pops it.

<ExampleBox title="A reusable function" lang="nasm">

```nasm
section .text
    global _start

; add_three(rdi, rsi, rdx) -> rax
add_three:
    mov rax, rdi
    add rax, rsi
    add rax, rdx
    ret

_start:
    mov rdi, 10
    mov rsi, 20
    mov rdx, 30
    call add_three      ; rax = 60
    mov rdi, rax
    mov rax, 60
    syscall
```

</ExampleBox>

## Caller- vs callee-saved

- **Caller-saved** (`rax`, `rcx`, `rdx`, `rsi`, `rdi`, `r8`–`r11`): if you need their values across a `call`, save them yourself first.
- **Callee-saved** (`rbx`, `rbp`, `r12`–`r15`): a function must restore these before returning.

<ExampleBox title="Saving a callee-saved register" lang="nasm">

```nasm
my_func:
    push rbx           ; save
    ; ... use rbx ...
    pop  rbx           ; restore
    ret
```

</ExampleBox>

<ExerciseBox title="Call a function" difficulty="Easy">
Write a function `square(rdi) -> rax` that returns `rdi * rdi` using `imul`. Call it with `5` from `_start` and exit with the result (25).
</ExerciseBox>

<ExerciseBox title="Nested calls & saving" difficulty="Medium">
Write `add_two(rdi, rsi)` and `double(rdi)`, then compute `double(add_two(3, 4))` = 14 in `_start`. Save any caller-saved registers you need across the first `call`. Exit with the result.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-asm-7" :cards="[
  { q: 'Which registers hold the first three integer arguments?', a: 'rdi (1st), rsi (2nd), rdx (3rd) on the x86-64 System V ABI.' },
  { q: 'Where does a function return its result?', a: 'In rax.' },
  { q: 'What does <code>call</code> do vs <code>ret</code>?', a: 'call pushes the return address and jumps; ret pops it and returns.' },
  { q: 'Why push/pop a callee-saved register like rbx?', a: 'The ABI requires a function to restore callee-saved registers before returning.' }
]" />

## Resources

<ResourceTable title="Lesson 7 — further reading" :resources="[
  { label: 'x86-64 calling convention', platform: 'Official', type: 'Docs', url: 'https://en.wikipedia.org/wiki/X86_calling_conventions' },
  { label: 'System V ABI spec', platform: 'Official', type: 'Docs', url: 'https://refspecs.linuxbase.org/elf/x86_64-abi-0.99.pdf' }
]" />

## Checklist

<ProgressChecklist :items="['Used push/pop balanced', 'Called a function with rdi/rsi/rdx', 'Returned a value in rax', 'Saved callee-saved registers']" storageKey="assembly/7-stack-functions" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
