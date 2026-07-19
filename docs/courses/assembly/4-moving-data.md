---
title: 'Lesson 4 — Moving Data (MOV, LEA)'
---

# Lesson 4 — Moving Data (MOV, LEA)

> **Module 2 · Core Instructions · Lesson 4 of 10**

The `mov` instruction copies data. It is the most-used instruction in any program. `lea` ("load effective address") computes addresses without dereferencing — a surprisingly powerful tool.

## MOV basics

`mov destination, source` copies `source` into `destination`. The source is unchanged.

<ExampleBox title="MOV in action" lang="nasm">

```nasm
mov rax, 10        ; immediate -> register   (rax = 10)
mov rbx, rax       ; register  -> register   (rbx = 10)
mov rcx, 0         ; zero a register
```

</ExampleBox>

**Rules you must remember:**
- At most **one** operand may be memory. `mov [a], [b]` is illegal — go through a register.
- The destination cannot be an immediate (constant).
- `mov` does **not** affect the CPU flags.

## Memory operands

Use square brackets `[...]` to read or write memory. The value inside is a memory address.

<ExampleBox title="Memory via registers" lang="nasm">

```nasm
section .data
    val dd 1234        ; a 4-byte variable

section .text
    global _start
_start:
    mov rax, [val]     ; load 1234 into rax
    mov [val], rbx     ; store rbx back into memory
```

</ExampleBox>

## LEA — load effective address

`lea reg, [expr]` computes the **address** from `expr` and stores it — it does NOT read memory. This makes it a fast arithmetic instruction.

<ExampleBox title="LEA as arithmetic" lang="nasm">

```nasm
lea rax, [rbx + 8]     ; rax = rbx + 8        (no memory access)
lea rcx, [rdi + rsi*4] ; rcx = rdi + rsi*4    (array index math)
```

</ExampleBox>

Compare: `mov rax, [rbx + 8]` loads the *value at* `rbx+8`; `lea rax, [rbx + 8]` puts the *address* `rbx+8` into `rax`.

## Related moves

- `xchg a, b` — swap two operands.
- `movzx dst, src` — move with zero-extension (e.g. byte → 64-bit, upper bits set to 0).
- `movsx dst, src` — move with sign-extension (preserves negative numbers).

<ExerciseBox title="Copy through a register" difficulty="Easy">
You want to copy the value at memory location `A` into memory location `B`, but `mov [B], [A]` is illegal. Show the correct two-instruction sequence using `rax`.
</ExerciseBox>

<ExerciseBox title="LEA math" difficulty="Medium">
Using only `lea` and `mov`, compute `rax = rdi*8 + 16` (no `add`/`mul`). Write the two instructions and explain what each does.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-asm-4" :cards="[
  { q: 'Can <code>mov [a], [b]</code> work? Why or why not?', a: 'No — x86 allows at most one memory operand per instruction. Copy through a register.' },
  { q: 'What is the difference between <code>mov rax, [rbx]</code> and <code>lea rax, [rbx]</code>?', a: 'mov loads the VALUE at rbx; lea stores the ADDRESS rbx into rax without accessing memory.' },
  { q: 'Does <code>mov</code> affect the flags?', a: 'No, mov never touches the status flags.' },
  { q: 'What does <code>movzx</code> do?', a: 'Moves a smaller source into a larger destination, zero-extending the upper bits.' }
]" />

## Resources

<ResourceTable title="Lesson 4 — further reading" :resources="[
  { label: 'MOV instruction (felixcloutier)', platform: 'Official', type: 'Docs', url: 'https://www.felixcloutier.com/x86/mov' },
  { label: 'LEA instruction', platform: 'Official', type: 'Docs', url: 'https://www.felixcloutier.com/x86/lea' }
]" />

## Checklist

<ProgressChecklist :items="['Used mov with reg/imm/memory', 'Explained the one-memory-operand rule', 'Used lea for address math']" storageKey="assembly/4-moving-data" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
