---
title: 'Lesson 6 — Labels, Flags & Control Flow'
---

# Lesson 6 — Labels, Flags & Control Flow

> **Module 2 · Core Instructions · Lesson 6 of 10**

Assembly has no `if`, `for`, or `while`. Control flow is built from **labels** (jump targets), **comparisons** that set CPU flags, and **conditional jumps**.

## Labels and unconditional jumps

A label is just a name for a location in code. `jmp` always jumps there.

<ExampleBox title="jmp" lang="nasm">

```nasm
jmp skip        ; jump to label 'skip'
    mov rax, 1  ; this is skipped
skip:
    mov rax, 2  ; execution continues here
```

</ExampleBox>

## Flags & cmp

The CPU tracks conditions in **status flags** (stored in `rflags`). The key ones:

- **ZF** (zero flag) — result was zero.
- **CF** (carry flag) — unsigned overflow/borrow.
- **SF** (sign flag) — result was negative.
- **OF** (overflow flag) — signed overflow.

`cmp a, b` computes `a - b` and sets the flags **without storing the result** — exactly what you need before a branch.

```nasm
cmp rax, rbx    ; sets flags based on rax - rbx
```

## Conditional jumps

<ExampleBox title="if/else in assembly" lang="nasm">

```nasm
cmp rax, rbx
je  equal       ; jump if equal   (ZF = 1)
jl  less        ; jump if rax < rbx (signed)
jmp done        ; otherwise skip
equal:
    mov rcx, 1
less:
    mov rcx, 2
done:
```

</ExampleBox>

| Jump | Meaning | Flag |
|------|---------|------|
| `je` / `jz` | equal / zero | ZF=1 |
| `jne` / `jnz` | not equal | ZF=0 |
| `jg` / `jl` | signed > / < | OF=SF, ZF=0 |
| `ja` / `jb` | unsigned above / below | CF=0 / CF=1 |
| `jge` / `jle` | signed >= / <= | OF=SF |

> ⚠️ **Classic bug:** `jl`/`jg` are *signed*, `jb`/`ja` are *unsigned*. Mixing them on the wrong data gives wrong branches.

## A loop: sum 1..N

<ExampleBox title="loop.asm — sum 1..10" lang="nasm">

```nasm
section .text
    global _start
_start:
    xor rax, rax       ; sum = 0
    mov rcx, 1         ; i = 1
loop_start:
    add rax, rcx       ; sum += i
    inc rcx            ; i++
    cmp rcx, 11        ; while i < 11
    jl  loop_start     ;   loop
    mov rdi, rax       ; exit code = sum (55)
    mov rax, 60
    syscall
```

</ExampleBox>

<ExerciseBox title="Countdown loop" difficulty="Easy">
Write a loop that counts `rcx` down from 10 to 1 (use `cmp rcx, 0` / `jg`), then exits with `rcx` as status. Predict and verify the exit code.
</ExerciseBox>

<ExerciseBox title="Max of two" difficulty="Medium">
Using `cmp` and a conditional jump, put the larger of `rdi` and `rsi` into `rax`, then exit with it. Test with `rdi=7, rsi=12`.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-asm-6" :cards="[
  { q: 'What does <code>cmp</code> do?', a: 'Computes a - b, sets the status flags, but does not store the result.' },
  { q: 'Signed vs unsigned less-than jumps?', a: 'Signed: jl / jg. Unsigned: jb / ja. Using the wrong one is a common bug.' },
  { q: 'Which flag does <code>je</code> test?', a: 'The zero flag (ZF) — je jumps when ZF = 1 (operands were equal).' },
  { q: 'How do you build a while loop in asm?', a: 'A label + cmp + conditional jump back to the label, with an exit condition via jmp or another jump.' }
]" />

## Resources

<ResourceTable title="Lesson 6 — further reading" :resources="[
  { label: 'JMP / conditional jumps', platform: 'Official', type: 'Docs', url: 'https://www.felixcloutier.com/x86/jmp' },
  { label: 'CMP', platform: 'Official', type: 'Docs', url: 'https://www.felixcloutier.com/x86/cmp' },
  { label: 'EFLAGS explained', platform: 'Official', type: 'Docs', url: 'https://en.wikipedia.org/wiki/FLAGS_register' }
]" />

## Checklist

<ProgressChecklist :items="['Used labels and jmp', 'Used cmp to set flags', 'Used je/jl/jg/jb correctly', 'Wrote a counted loop']" storageKey="assembly/6-control-flow" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
