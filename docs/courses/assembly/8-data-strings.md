---
title: 'Lesson 8 — Defining Data & Strings'
---

# Lesson 8 — Defining Data & Strings

> **Module 3 · Building Blocks · Lesson 8 of 10**

So far everything lived in registers. Real programs need named variables and strings in memory. That's what the `.data` and `.bss` sections are for.

## Sections

- `.text` — your code (instructions).
- `.data` — initialized data (has a known value at start).
- `.bss` — uninitialized data (reserved space, zeroed at load).

## Defining values

<ExampleBox title="data definitions" lang="nasm">

```nasm
section .data
    b   db  42            ; 1 byte
    w   dw  1234          ; 2 bytes
    d   dd  70000         ; 4 bytes
    q   dq  10000000000   ; 8 bytes
    msg db  "Hi!", 10, 0  ; string + newline + null terminator
    len equ $ - msg       ; constant: length of msg

section .bss
    buf resb 64           ; reserve 64 bytes (uninitialized)
    cnt resq 1            ; reserve one 8-byte quad
```

</ExampleBox>

- `db`/`dw`/`dd`/`dq` define 1/2/4/8 bytes.
- `resb`/`resw`/`resd`/`resq` **reserve** space without initializing.
- `$` is the current address; `$$` is the start of the section. `len equ $ - msg` computes the string length at assemble time.

## Loading and storing

<ExampleBox title="use the data" lang="nasm">

```nasm
section .text
    global _start
_start:
    mov rax, [q]       ; load the 8-byte value
    mov [cnt], rax     ; store it in bss
    mov rdi, [b]       ; load the byte 42
    mov rax, 60
    syscall
```

</ExampleBox>

## Strings & looping over bytes

A string is just bytes in memory. To print or measure it, walk pointer by pointer.

<ExampleBox title="string length loop" lang="nasm">

```nasm
section .data
    msg db "assembly", 0     ; null-terminated
section .text
    global _start
_start:
    xor rax, rax            ; length = 0
    mov rsi, msg            ; pointer
count_loop:
    cmp byte [rsi + rax], 0 ; null terminator?
    je  done
    inc rax                 ; length++
    jmp count_loop
done:
    mov rdi, rax            ; exit code = length (8)
    mov rax, 60
    syscall
```

</ExampleBox>

> Note `byte [rsi + rax]` — the `byte` size hint tells NASM to read one byte. Size hints (`byte`/`word`/`dword`/`qword`) are required when the size is ambiguous.

<ExerciseBox title="Sum the bytes" difficulty="Easy">
Define a byte array `[1,2,3,4,5,0]` (null-terminated). Loop over it and sum the values into `rax`, then exit with the sum (15).
</ExerciseBox>

<ExerciseBox title="Uppercase a string" difficulty="Hard">
Walk a null-terminated string in `.data` and convert lowercase letters (`a`–`z`, 0x61–0x7A) to uppercase by clearing bit 5 (`and byte [ptr], 0xDF`). Exit with the new first byte's value. Verify with a debugger or by printing.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-asm-8" :cards="[
  { q: 'Difference between .data and .bss?', a: '.data holds initialized values; .bss reserves zero-initialized space (no stored bytes in the file).' },
  { q: 'What does <code>len equ $ - msg</code> compute?', a: 'The length of the msg string, calculated at assemble time from the current address minus msg\&#39;s address.' },
  { q: 'Why write <code>byte [rsi+rax]</code> instead of <code>[rsi+rax]</code>?', a: 'A size hint is required when the operand size is ambiguous (e.g. moving/compare a memory byte).' },
  { q: 'How do you represent a null-terminated string?', a: 'A sequence of bytes followed by a 0 byte, e.g. db \&#34;Hi!\&#34;, 0.' }
]" />

## Resources

<ResourceTable title="Lesson 8 — further reading" :resources="[
  { label: 'NASM data directives', platform: 'Official', type: 'Docs', url: 'https://www.nasm.us/doc/nasmdoc3.html' },
  { label: 'NASM pseudo-instructions', platform: 'Official', type: 'Docs', url: 'https://www.nasm.us/doc/nasmdoc4.html' }
]" />

## Checklist

<ProgressChecklist :items="['Defined data in .data/.bss', 'Used db/dw/dd/dq and resb', 'Looped over a string', 'Used size hints (byte/...)']" storageKey="assembly/8-data-strings" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
