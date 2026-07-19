---
title: 'Lesson 5 — Arithmetic & Logic'
---

# Lesson 5 — Arithmetic & Logic

> **Module 2 · Core Instructions · Lesson 5 of 10**

Assembly has no `+` operator for expressions — you perform one operation per instruction. This lesson covers the arithmetic and bitwise instructions you'll use constantly.

## Arithmetic

<ExampleBox title="add / sub / mul / inc" lang="nasm">

```nasm
mov rax, 5
add rax, 3         ; rax = 8
sub rax, 2         ; rax = 6
inc rax            ; rax = 7   (increment)
dec rax            ; rax = 6   (decrement)
neg rax            ; rax = -6  (two's complement)
```

</ExampleBox>

**Multiplication** has a convenient two-operand form: `imul dst, src[, imm]`.
```nasm
imul rax, rbx      ; rax = rax * rbx
imul rax, rbx, 10  ; rax = rbx * 10
```

**Division** is the odd one out — it uses implicit registers:
```nasm
mov rax, 17        ; dividend (low)
xor rdx, rdx       ; dividend (high) — must be cleared for unsigned
mov rcx, 5         ; divisor
div rcx            ; rax = 3 (quotient), rdx = 2 (remainder)
```
For signed division use `idiv`; the dividend is the 128-bit value `rdx:rax`.

## Logic & shifts

<ExampleBox title="bitwise ops" lang="nasm">

```nasm
and rax, 0xF       ; keep low 4 bits (mask)
or  rbx, 1         ; set bit 0
xor rcx, rcx       ; fastest zero (rcx = 0)
not rax            ; bitwise complement

shl rax, 3         ; logical left  shift = *8
shr rax, 1         ; logical right shift (unsigned)
sar rax, 1         ; arithmetic right shift (sign-extends, signed)
```

</ExampleBox>

> `shl`/`shr`/`sar` are how CPUs do fast multiplication/division by powers of two. `sar` preserves the sign bit; `shr` does not.

## A worked example: average of two numbers

<ExampleBox title="average.asm" lang="nasm">

```nasm
section .text
    global _start
_start:
    mov rdi, 20     ; a
    mov rsi, 30     ; b
    mov rax, rdi
    add rax, rsi    ; rax = a + b
    shr rax, 1      ; divide by 2 (unsigned average)
    mov rdi, rax    ; exit code = average
    mov rax, 60
    syscall
```

</ExampleBox>

Build it: `nasm -f elf64 average.asm -o average.o && ld average.o -o average && ./average; echo $?` → prints `25`.

<ExerciseBox title="Multiply and divide" difficulty="Easy">
Write a program that computes `(rdi * rsi) / 4` using `imul` and `sar`, and exits with the result. Test with `rdi=12, rsi=8` (expect 24).
</ExerciseBox>

<ExerciseBox title="Bit masking" difficulty="Medium">
Given a number in `rax`, extract its lowest 8 bits using `and`, then set bit 3 using `or`. Exit with the final value. Explain what value results from input `0xFF` (255).
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-asm-5" :cards="[
  { q: 'What registers does unsigned <code>div</code> use implicitly?', a: 'Dividend is rdx:rax (128-bit); quotient goes to rax, remainder to rdx.' },
  { q: 'What is the fastest way to multiply by 8?', a: '<code>shl rax, 3</code> — a left shift by 3 is a multiply by 2^3.' },
  { q: 'Difference between <code>shr</code> and <code>sar</code>?', a: 'shr is logical (shifts in zeros); sar is arithmetic (keeps the sign bit) for signed values.' },
  { q: 'What does <code>xor rcx, rcx</code> accomplish?', a: 'Sets rcx to 0 — the smallest, dependency-breaking way to zero a register.' }
]" />

## Resources

<ResourceTable title="Lesson 5 — further reading" :resources="[
  { label: 'ADD/SUB (felixcloutier)', platform: 'Official', type: 'Docs', url: 'https://www.felixcloutier.com/x86/add' },
  { label: 'IMUL', platform: 'Official', type: 'Docs', url: 'https://www.felixcloutier.com/x86/imul' },
  { label: 'Shift instructions', platform: 'Official', type: 'Docs', url: 'https://www.felixcloutier.com/x86/sal' }
]" />

## Checklist

<ProgressChecklist :items="['Used add/sub/inc/dec/neg', 'Used imul two-operand form', 'Used div/idiv with rdx:rax', 'Used and/or/xor/shifts']" storageKey="assembly/5-arithmetic-logic" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
