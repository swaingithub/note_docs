---
title: Assembly
---

# Assembly Language

**Assembly** (asm) is a low-level programming language with a near 1:1 correspondence between its instructions and a CPU's machine code. Each assembly instruction maps to a single machine operation executed directly by the processor. It sits one level above raw binary machine code and is the bridge between human-readable source and what the hardware actually runs.

> **Paradigms:** Imperative · Low-level · Hardware-specific &nbsp;•&nbsp; **Extension:** `.asm` &nbsp;•&nbsp; **Run:** assembler (`nasm`/`as`) + linker (`ld`), then execute
> **Difficulty:** Hard &nbsp;•&nbsp; **Origin:** 1949 (Kathleen Booth) &nbsp;•&nbsp; **Depends on:** CPU architecture (x86, ARM, RISC-V, MIPS, …)

## Table of Contents

- [1. Why Assembly?](#1-why-assembly)
- [2. Architecture Matters](#2-architecture-matters)
- [3. The Toolchain](#3-the-toolchain)
- [4. Syntax & Directives](#4-syntax--directives)
- [5. Registers (x86-64)](#5-registers-x86-64)
- [6. Memory & Addressing Modes](#6-memory--addressing-modes)
- [7. Data Movement (MOV)](#7-data-movement-mov)
- [8. Arithmetic & Logic](#8-arithmetic--logic)
- [9. Control Flow & Labels](#9-control-flow--labels)
- [10. The Stack & Calling Convention](#10-the-stack--calling-convention)
- [11. Defining Data](#11-defining-data)
- [12. Macros & Include](#12-macros--include)
- [13. System Calls (Linux x86-64)](#13-system-calls-linux-x86-64)
- [14. A Complete Program](#14-a-complete-program)
- [15. SIMD Intro](#15-simd-intro)
- [16. Debugging](#16-debugging)
- [17. Exercises](#17-exercises)
- [18. Resources](#18-resources)
- [19. Self-Test (Flashcards)](#19-self-test-flashcards)

---

## 1. Why Assembly?

Assembly is rarely written by hand today, but knowing it is essential to understand:

- **How software actually runs** — registers, the stack, ABI, cache behavior.
- **Performance** — reading compiler output (Godbolt) to squeeze hot loops.
- **Embedded / firmware / boot** — bare-metal code with no OS.
- **Security** — exploit dev, reverse engineering, ROP chains, shellcode.
- **Operating systems** — context switches, interrupt handlers, syscalls.

> 💡 Compilers (gcc, clang) almost always beat hand-written asm for general code. Write asm only for tiny hot paths, intrinsics, or when no compiler target exists.

---

## 2. Architecture Matters

There is **no single assembly language** — each ISA (instruction set) has its own.

| ISA | Style | Word | Common use |
|-----|-------|------|------------|
| x86 / x86-64 | CISC | 16/32/64-bit | PCs, servers |
| ARM / AArch64 | RISC | 32/64-bit | phones, Apple Silicon |
| RISC-V | RISC | 32/64/128-bit | open hardware, embedded |
| MIPS | RISC | 32/64-bit | routers, teaching |

This page focuses on **x86-64 (NASM syntax)**, the most common desktop target. NASM, Intel, and AT&T are three different syntax flavors — we use **NASM (Intel-style)** throughout.

---

## 3. The Toolchain

<ExampleBox title="Assemble, link, run (Linux x86-64)" lang="bash">

```bash
# NASM -> object file -> executable
nasm -f elf64 hello.asm -o hello.o
ld   hello.o -o hello
./hello

# Disassemble to inspect what was produced
objdump -d hello | less
```

</ExampleBox>

- **Assembler** (`nasm`, `as`) turns `.asm` into an object file (`.o`).
- **Linker** (`ld`, or `gcc`) resolves symbols and produces an executable.
- **Debugger** (`gdb`) steps through instructions and inspects registers.

> On macOS use `-f macho64` and `ld -o hello hello.o -lSystem`; on Windows use MinGW/`link.exe`.

---

## 4. Syntax & Directives

A line looks like: `label: mnemonic operands ; comment`

```nasm
section .data          ; directive: data segment
    msg db "Hi", 10    ; define byte(s)
section .text          ; code segment
    global _start      ; export symbol to linker
_start:                ; label
    mov rax, 1         ; instruction
```

Common **directives**:
- `section .text` / `section .data` / `section .bss` — segment selectors.
- `global sym` — make `sym` visible to the linker (entry point).
- `db`/`dw`/`dd`/`dq` — define 1/2/4/8-byte data.
- `resb`/`resq` — reserve (uninitialized) bytes/quads in `.bss`.
- `equ` — constant (e.g. `len equ $ - msg`).

---

## 5. Registers (x86-64)

Registers are the CPU's fastest storage. x86-64 has 16 general-purpose 64-bit registers.

| Register | 64 | 32 | 16 | 8 (low) | Role |
|----------|----|----|----|---------|------|
| Accumulator | `rax` | `eax` | `ax` | `al` | return value, syscall no. |
| Base | `rbx` | `ebx` | `bx` | `bl` | callee-saved |
| Counter | `rcx` | `ecx` | `cx` | `cl` | 4th arg, loop |
| Data | `rdx` | `edx` | `dx` | `dl` | 3rd arg, remainder |
| Source | `rsi` | `esi` | `si` | `sil` | 2nd arg |
| Destination | `rdi` | `edi` | `di` | `dil` | 1st arg |
| Stack ptr | `rsp` | `esp` | `sp` | `spl` | top of stack |
| Base ptr | `rbp` | `ebp` | `bp` | `bpl` | frame pointer |
| R8–R15 | `r8`..`r15` | `r8d`.. | `r8w`.. | `r8b`.. | args 5–6 / scratch |

Special registers: `rip` (instruction pointer), `rflags` (status flags: ZF, CF, SF, OF).

> Each 64-bit reg has named sub-registers. Writing `eax` zeroes the upper 32 bits of `rax` automatically.

---

## 6. Memory & Addressing Modes

Operands can be **registers**, **immediates** (constants), or **memory**. Memory uses `[...]` with flexible arithmetic:

<ExampleBox title="Effective addresses" lang="nasm">

```nasm
mov rax, [rbx]         ; dereference: rax = *rbx
mov rax, [rbx + 8]     ; offset by 8 bytes
mov rax, [rdi + rsi*4] ; base + index*scale (scale: 1,2,4,8)
mov rax, [arr + rcx*8] ; array of 8-byte elements
mov [rsp - 16], rax    ; write 16 bytes below stack top
```

</ExampleBox>

**Rules:**
- At most **one** operand may be memory per instruction.
- Scale factor must be 1, 2, 4, or 8.
- You cannot `mov` between two memory locations directly — go through a register.

---

## 7. Data Movement (MOV)

`mov dst, src` copies `src` into `dst` without affecting flags.

<ExampleBox title="MOV variants" lang="nasm">

```nasm
mov rax, 42        ; immediate -> reg
mov rbx, rax       ; reg -> reg
mov [var], rax     ; reg -> memory
mov rcx, [var]     ; memory -> reg
mov rax, [rdi]     ; deref pointer arg
```

</ExampleBox>

Related moves:
- `xchg a, b` — swap (atomic when one operand is memory).
- `movzx` / `movsx` — zero-/sign-extend smaller source into larger dest.
- `lea reg, [addr]` — load **effective address** (computed, not dereferenced): `lea rax, [rbx+8]` puts `rbx+8` into `rax`, a fast arithmetic trick.

> `lea` is the Swiss-army knife for address math and even general arithmetic, since it doesn't touch flags.

---

## 8. Arithmetic & Logic

<ExampleBox title="Arithmetic" lang="nasm">

```nasm
add rax, 1         ; rax = rax + 1
sub rbx, 5         ; rbx = rbx - 5
imul rcx, rdx, 2   ; rcx = rdx * 2  (two/three-operand form)
inc rsi            ; rsi += 1 (no carry flag effect)
dec rdi            ; rdi -= 1
neg rax            ; rax = -rax (two's complement)
```

</ExampleBox>

**Division** is special — it uses implicit registers:
```nasm
; signed: idiv r/m  -> divides rdx:rax by operand
mov rax, 17
xor rdx, rdx       ; clear upper 64 bits of dividend
mov rcx, 5
idiv rcx           ; rax = 3 (quotient), rdx = 2 (remainder)
```

**Logic & shifts:**
```nasm
and rax, 0xF       ; mask low nibble
or  rbx, 1         ; set bit 0
xor rcx, rcx       ; fastest way to zero a register
not rax            ; bitwise complement
shl rax, 3         ; logical left  shift = *8
shr rax, 1         ; logical right shift
sar rax, 1         ; arithmetic right shift (sign-extends)
```

Flags set by `cmp`/`sub`/`add` drive conditional jumps — see next section.

---

## 9. Control Flow & Labels

No `if`/`while` — you compare, then **jump** on flag state.

<ExampleBox title="Compare & branch" lang="nasm">

```nasm
cmp rax, rbx       ; computes rax - rbx, sets flags (no store)
je  equal          ; jump if equal        (ZF=1)
jne not_eq         ; jump if not equal
jl  less           ; signed: rax < rbx
jg  greater        ; signed: rax > rbx
ja  above          ; unsigned: rax > rbx
jb  below          ; unsigned: rax < rbx
jmp done           ; unconditional
```

</ExampleBox>

**A loop** (sum 1..10):
```nasm
xor rax, rax       ; sum = 0
mov rcx, 1         ; i = 1
loop_start:
    add rax, rcx
    inc rcx
    cmp rcx, 11
    jl  loop_start  ; while i < 11
```

> `jl`/`jg` are **signed**; `jb`/`ja` are **unsigned**. Mixing them on the wrong data is a classic bug.

---

## 10. The Stack & Calling Convention

The stack grows **downward**; `rsp` points at the top. Used for function frames, saved registers, and return addresses.

<ExampleBox title="Push / pop & a leaf function" lang="nasm">

```nasm
push rax           ; rsp -= 8; [rsp] = rax
push rbx
; ... use them ...
pop  rbx           ; rbx = [rsp]; rsp += 8
pop  rax

; x86-64 System V calling convention (Linux/macOS):
; args: rdi, rsi, rdx, rcx, r8, r9  (extra on stack)
; caller-saved: rax, rcx, rdx, rsi, rdi, r8-r11
; callee-saved: rbx, rbp, r12-r15
add_two:
    mov rax, rdi   ; return = arg1
    add rax, rsi   ;        + arg2
    ret            ; pops return address into rip
```

</ExampleBox>

Calling a function: put args in `rdi`, `rsi`, … then `call func` (pushes return address, jumps). `ret` pops it.

---

## 11. Defining Data

<ExampleBox title="Data in .data / .bss" lang="nasm">

```nasm
section .data
    byte_val  db  42            ; 1 byte
    word_val  dw  1234          ; 2 bytes
    dword_val dd  70000         ; 4 bytes
    qword_val dq  10000000000   ; 8 bytes
    str       db  "Hello", 10, 0; null-terminated string
    len       equ $ - str       ; constant length

section .bss
    buffer    resb 64           ; 64 uninitialized bytes
    count     resq 1            ; one uninitialized quad
```

</ExampleBox>

`$` = current address; `$$` = start of the current section. `len equ $ - str` computes a length at assemble time.

---

## 12. Macros & Include

NASM macros reduce repetition — like functions but expanded inline at assemble time.

<ExampleBox title="Macros" lang="nasm">

```nasm
%macro pushall 0
    push rax
    push rbx
    push rcx
    push rdx
%endmacro

%macro exit 1
    mov rax, 60
    mov rdi, %1
    syscall
%endmacro

; usage:
pushall
exit 0
```

</ExampleBox>

`%include "common.inc"` pulls in shared code; `%define NAME value` defines constants.

---

## 13. System Calls (Linux x86-64)

A syscall traps into the kernel. Load the number into `rax`, args into `rdi`, `rsi`, `rdx`, `r10`, `r8`, `r9`, then `syscall`. Result returns in `rax`.

<ExampleBox title="write + exit" lang="nasm">

```nasm
mov rax, 1         ; sys_write
mov rdi, 1         ; fd = stdout (1)
mov rsi, msg       ; buffer pointer
mov rdx, len       ; byte count
syscall

mov rax, 60        ; sys_exit
xor rdi, rdi       ; status 0
syscall
```

</ExampleBox>

Common numbers:

| # | Call | Args |
|---|------|------|
| 0 | `read` | fd, buf, count |
| 1 | `write` | fd, buf, count |
| 2 | `open` | path, flags, mode |
| 3 | `close` | fd |
| 59 | `execve` | path, argv, envp |
| 60 | `exit` | status |

> macOS uses a different syscall ABI (`syscall` number is offset +0x2000000, args in `rdi`/`rsi`/`rdx`/`r10`/`r8`/`r9`).

---

## 14. A Complete Program

Full, runnable "Hello, World" with proper exit:

<ExampleBox title="hello.asm" lang="nasm">

```nasm
section .data
    msg db "Hello, World!", 10
    len equ $ - msg

section .text
    global _start

_start:
    ; write(1, msg, len)
    mov rax, 1
    mov rdi, 1
    mov rsi, msg
    mov rdx, len
    syscall

    ; exit(0)
    mov rax, 60
    xor rdi, rdi
    syscall
```

</ExampleBox>

```bash
nasm -f elf64 hello.asm -o hello.o && ld hello.o -o hello && ./hello
```

A version with a reusable function and the stack:

```nasm
section .text
    global _start

add_three:
    ; rdi + rsi + rdx
    mov rax, rdi
    add rax, rsi
    add rax, rdx
    ret

_start:
    mov rdi, 10
    mov rsi, 20
    mov rdx, 30
    call add_three      ; rax = 60
    ; use rax as exit code:
    mov rdi, rax
    mov rax, 60
    syscall
```

---

## 15. SIMD Intro

x86 SIMD (SSE/AVX) processes multiple data items per instruction using **XMM** (128-bit) / **YMM** (256-bit) registers.

<ExampleBox title="Add four floats at once (SSE)" lang="nasm">

```nasm
; xmm0 = a, xmm1 = b  (each holds 4 x float32)
addps xmm0, xmm1    ; xmm0 = a0+b0, a1+b1, a2+b2, a3+b3  (parallel!)
```

</ExampleBox>

This is where hand-tuned assembly (or compiler intrinsics like `_mm_add_ps`) wins big — one instruction does 4–8 ops. AVX2 extends to 256-bit YMM; AVX-512 to 512-bit ZMM.

---

## 16. Debugging

<ExampleBox title="Step through with gdb" lang="nasm">

```bash
nasm -f elf64 -g -F dwarf prog.asm -o prog.o   # include debug info
ld prog.o -o prog
gdb ./prog
(gdb) break _start
(gdb) run
(gdb) stepi            # execute one instruction
(gdb) info registers   # dump all registers
(gdb) x/4xw &buffer    # examine 4 words of memory
(gdb) layout asm       # TUI disassembly view
```

</ExampleBox>

Tips: assemble with `-g -F dwarf` for source-level debugging; use `objdump -d` to verify the compiler/assembler output; `strace ./prog` shows every syscall.

---

## 17. Exercises

<ExerciseBox title="Exercise 1 — Zero a register (3 ways)" difficulty="Easy">

Write three different ways to set `rax` to 0: `xor rax, rax`, `mov rax, 0`, and `sub rax, rax`. Explain why `xor` is preferred (size + no dependency on prior value).
</ExerciseBox>

<ExerciseBox title="Exercise 2 — Add two numbers" difficulty="Medium">

Write a program that puts two values in `rdi`/`rsi`, adds them in a `add_two` function via `call`, and exits with the sum as the process status. Verify with `echo $?`.
</ExerciseBox>

<ExerciseBox title="Exercise 3 — Counted loop" difficulty="Medium">

Build a loop that sums integers 1..100 into `rax` using `cmp`/`jl` and a label. Exit with the sum mod 256 as the status (`echo $?` shows `rax & 0xFF`).
</ExerciseBox>

<ExerciseBox title="Exercise 4 — Reverse a string in place" difficulty="Hard">

Using the stack (`push`/`pop`) or two pointers in `rsi`/`rdi`, reverse a null-terminated string in a `.data` buffer and `write` it to stdout before exiting.
</ExerciseBox>

---

## 19. Self-Test (Flashcards)

<Quiz storageKey="quiz-assembly" :cards="[
  { q: 'What does <code>mov rax, rbx</code> do and does it affect flags?', a: 'Copies the value of <code>rbx</code> into <code>rax</code>; <code>mov</code> does NOT affect status flags.' },
  { q: 'What is the fastest way to set a register to zero?', a: '<code>xor rax, rax</code> — it is the smallest encoding and breaks false dependencies; <code>mov rax, 0</code> also works but is larger.' },
  { q: 'What is the difference between <code>jl</code> and <code>jb</code>?', a: '<code>jl</code> is signed less-than; <code>jb</code> is unsigned below. Using the wrong one on signed/unsigned data is a classic bug.' },
  { q: 'Which registers hold the first two integer arguments in the x86-64 System V calling convention?', a: '<code>rdi</code> (1st) and <code>rsi</code> (2nd); up to six args go in registers before the stack is used.' },
  { q: 'What does <code>lea rax, [rbx + 8]</code> compute?', a: 'It loads the effective address: <code>rax = rbx + 8</code>, without dereferencing memory — often used for fast arithmetic.' },
  { q: 'Why can\&#39;t you write <code>mov [a], [b]</code>?', a: 'x86 allows at most one memory operand per instruction; copy through a register instead.' },
  { q: 'What syscall number exits a Linux x86-64 process, and where does the status go?', a: '60 (<code>sys_exit</code>); the exit status is placed in <code>rdi</code> before the <code>syscall</code> instruction.' },
  { q: 'What is <code>idiv</code> and which registers does it use implicitly?', a: 'Signed division of the 128-bit value <code>rdx:rax</code> by the operand; quotient lands in <code>rax</code>, remainder in <code>rdx</code>.' }
]" />

## 18. Resources

<ResourceTable title="Assembly learning paths" :resources="[
  { label: 'x86-64 Assembly Guide (UVA)', platform: 'Official', type: 'Docs', url: 'https://www.cs.virginia.edu/~evans/cs216/guides/x64.html' },
  { label: 'NASM Manual', platform: 'Official', type: 'Docs', url: 'https://www.nasm.us/doc/' },
  { label: 'x86 and amd64 Instruction Reference', platform: 'Official', type: 'Docs', url: 'https://www.felixcloutier.com/x86/' },
  { label: 'Assembly Programming (TutorialsPoint)', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.tutorialspoint.com/assembly_programming/' },
  { label: 'x86 Assembly (GeeksforGeeks)', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/x86-assembly-language/' },
  { label: 'Programming From The Ground Up (book)', platform: 'Free', type: 'Book', url: 'https://download-mirror.savannah.gnu.org/releases/pgubook/ProgrammingGroundUp-1-0-booksize.pdf' },
  { label: 'Compiler Explorer (Godbolt)', platform: 'GitHub', type: 'Practice', url: 'https://godbolt.org/' },
  { label: 'x86 Assembly Crash Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=K0gXH9tJUV0' }
]" />

> 📝 Draft anything in the [Live Editor](/editor), then paste it here to keep your docs current.
