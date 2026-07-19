---
title: 'Lesson 9 — System Calls'
---

# Lesson 9 — System Calls

> **Module 3 · Building Blocks · Lesson 9 of 10**

A **system call** is how your program asks the Linux kernel to do something it can't do alone — print to the screen, read a file, exit. You set up registers, then execute `syscall`.

## The syscall convention (x86-64 Linux)

1. Put the syscall **number** in `rax`.
2. Put arguments in `rdi`, `rsi`, `rdx`, `r10`, `r8`, `r9` (in order).
3. Execute `syscall`.
4. The return value (or error code) comes back in `rax`.

## Writing to the terminal

`sys_write` (number **1**) writes bytes to a file descriptor. `1` = stdout (your terminal).

<ExampleBox title="print.asm — write a string" lang="nasm">

```nasm
section .data
    msg db "Hello, Assembly!", 10
    len equ $ - msg

section .text
    global _start
_start:
    mov rax, 1          ; sys_write
    mov rdi, 1          ; fd = stdout
    mov rsi, msg        ; buffer pointer
    mov rdx, len        ; number of bytes
    syscall

    mov rax, 60         ; sys_exit
    xor rdi, rdi
    syscall
```

</ExampleBox>

Build and run: `nasm -f elf64 print.asm -o print.o && ld print.o -o print && ./print` → prints `Hello, Assembly!`

## Reading input

`sys_read` (number **0**) reads bytes from a fd into a buffer.

<ExampleBox title="read into a buffer" lang="nasm">

```nasm
section .bss
    buf resb 64

section .text
    global _start
_start:
    mov rax, 0          ; sys_read
    mov rdi, 0          ; fd = stdin
    mov rsi, buf        ; buffer
    mov rdx, 64         ; max bytes
    syscall             ; rax = bytes read
    mov rdi, rax        ; exit code = bytes read
    mov rax, 60
    syscall
```

</ExampleBox>

## Common syscall numbers

| # | Call | Args (rdi, rsi, rdx) |
|---|------|----------------------|
| 0 | `read` | fd, buf, count |
| 1 | `write` | fd, buf, count |
| 2 | `open` | path, flags, mode |
| 3 | `close` | fd |
| 59 | `execve` | path, argv, envp |
| 60 | `exit` | status |

## Echo program

<ExampleBox title="echo what you type" lang="nasm">

```nasm
section .bss
    buf resb 64
section .text
    global _start
_start:
    mov rax, 0          ; read
    mov rdi, 0
    mov rsi, buf
    mov rdx, 64
    syscall
    mov rdx, rax        ; bytes read
    mov rax, 1          ; write
    mov rdi, 1
    mov rsi, buf
    syscall
    mov rax, 60
    xor rdi, rdi
    syscall
```

</ExampleBox>

<ExerciseBox title="Print your name" difficulty="Easy">
Modify `print.asm` to output your own name instead of "Hello, Assembly!". Rebuild and run.
</ExerciseBox>

<ExerciseBox title="Echo + count" difficulty="Medium">
Combine read and write so the program echoes typed input back, then exits with the number of bytes read. Type a short sentence and verify the exit code.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-asm-9" :cards="[
  { q: 'What register holds the syscall number?', a: 'rax — you load the syscall number there before executing syscall.' },
  { q: 'What are the first three syscall argument registers?', a: 'rdi, rsi, rdx (then r10, r8, r9).' },
  { q: 'What does sys_write(1, buf, len) do?', a: 'Writes len bytes from buf to stdout (file descriptor 1).' },
  { q: 'Where does the return value of a syscall appear?', a: 'In rax.' }
]" />

## Resources

<ResourceTable title="Lesson 9 — further reading" :resources="[
  { label: 'Linux syscall table', platform: 'Official', type: 'Docs', url: 'https://filippo.io/linux-syscall-table/' },
  { label: 'syscall(2) man page', platform: 'Official', type: 'Docs', url: 'https://man7.org/linux/man-pages/man2/syscall.2.html' }
]" />

## Checklist

<ProgressChecklist :items="['Used sys_write to print', 'Used sys_read to input', 'Knows fd 0/1/2 meaning', 'Built echo program']" storageKey="assembly/9-system-calls" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
