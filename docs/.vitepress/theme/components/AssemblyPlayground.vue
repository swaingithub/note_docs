<script setup>
import { ref, computed } from 'vue'

const defaultCode = `; RISC-V playground (RV32I subset)
; Registers x1..x31, x0 = zero (always 0)
; ecall prints x10 (a0) as a number + newline

  li   x1, 1          ; x1 = 1
  li   x2, 2          ; x2 = 2
  add  x3, x1, x2     ; x3 = x1 + x2   (=3)
  li   x4, 10
  mul  x5, x3, x4     ; x5 = 3 * 10    (=30)
  mv   x10, x5        ; a0 = 30
  ecall               ; print a0
  li   x10, 0
  ecall               ; print 0 (exit)
`

const code = ref(defaultCode)
const output = ref('')
const error = ref('')
const running = ref(false)

// ---- minimal assembler + RV32I simulator ----
function assemble(src) {
  const lines = src.split('\n')
  const labels = {}
  const instrs = []
  const reg = (t) => {
    t = t.trim().toLowerCase()
    if (t === 'x0' || t === 'zero') return 0
    if (t === 'x1' || t === 'ra') return 1
    if (t === 'x2' || t === 'sp') return 2
    if (t === 'x3') return 3
    if (t === 'x4') return 4
    if (t === 'x5' || t === 't0') return 5
    if (t === 'x6' || t === 't1') return 6
    if (t === 'x7' || t === 't2') return 7
    if (t === 'x8' || t === 's0' || t === 'fp') return 8
    if (t === 'x9' || t === 's1') return 9
    if (t === 'x10' || t === 'a0') return 10
    if (t === 'x11' || t === 'a1') return 11
    if (t === 'x12' || t === 'a2') return 12
    if (t === 'x13' || t === 'a3') return 13
    if (t === 'x14' || t === 'a4') return 14
    if (t === 'x15' || t === 'a5') return 15
    if (t === 'x16' || t === 'a6') return 16
    if (t === 'x17' || t === 'a7') return 17
    if (t === 'x18') return 18
    if (t === 'x19') return 19
    if (t === 'x20' || t === 's2') return 20
    if (t === 'x21' || t === 's3') return 21
    if (t === 'x22' || t === 's4') return 22
    if (t === 'x23' || t === 's5') return 23
    if (t === 'x24' || t === 's6') return 24
    if (t === 'x25' || t === 's7') return 25
    if (t === 'x26' || t === 's8') return 26
    if (t === 'x27' || t === 's9') return 27
    if (t === 'x28' || t === 's10') return 28
    if (t === 'x29' || t === 's11') return 29
    if (t === 'x30' || t === 't3') return 30
    if (t === 'x31' || t === 't4') return 31
    throw new Error('Unknown register: ' + t)
  }
  const num = (t) => {
    t = t.trim()
    if (t.startsWith('0x')) return parseInt(t, 16)
    return parseInt(t, 10)
  }
  let idx = 0
  for (const raw of lines) {
    let line = raw.split(';')[0].trim()
    if (!line) continue
    let m = line.match(/^([a-zA-Z_]\w*):\s*(.*)$/)
    if (m) {
      const name = m[1].toLowerCase()
      if (labels[name] !== undefined) throw new Error('Duplicate label: ' + name)
      labels[name] = idx
      line = m[2].trim()
      if (!line) continue
    }
    const parts = line.split(/\s+/)
    const op = parts[0].toLowerCase()
    const args = parts.slice(1).join(' ').split(',').map(s => s.trim()).filter(s => s)
    instrs.push({ op, args, reg, num, labels, line: raw })
    idx++
  }
  return { instrs, labels }
}

function simulate(src) {
  const { instrs } = assemble(src)
  const reg = new Int32Array(32) // x0 hardwired to 0
  let pc = 0
  const out = []
  let steps = 0
  const get = (i) => (i === 0 ? 0 : reg[i])
  const set = (i, v) => { if (i !== 0) reg[i] = v | 0 }
  while (pc < instrs.length) {
    if (++steps > 100000) throw new Error('Too many steps (possible infinite loop).')
    const ins = instrs[pc]
    const { op, args } = ins
    switch (op) {
      case 'li':
      case 'la':
        set(regIdx(args[0]), num(args[1])); break
      case 'mv':
      case 'move':
        set(regIdx(args[0]), get(regIdx(args[1]))); break
      case 'add':
        set(regIdx(args[0]), get(regIdx(args[1])) + get(regIdx(args[2]))); break
      case 'sub':
        set(regIdx(args[0]), get(regIdx(args[1])) - get(regIdx(args[2]))); break
      case 'mul':
        set(regIdx(args[0]), Math.imul(get(regIdx(args[1])), get(regIdx(args[2])))); break
      case 'addi':
        set(regIdx(args[0]), get(regIdx(args[1])) + num(args[2])); break
      case 'subi':
        set(regIdx(args[0]), get(regIdx(args[1])) - num(args[2])); break
      case 'muli':
        set(regIdx(args[0]), Math.imul(get(regIdx(args[1])), num(args[2]))); break
      case 'slli':
        set(regIdx(args[0]), get(regIdx(args[1])) << num(args[2])); break
      case 'srli':
        set(regIdx(args[0]), get(regIdx(args[1])) >>> num(args[2])); break
      case 'srai':
        set(regIdx(args[0]), get(regIdx(args[1])) >> num(args[2])); break
      case 'and':
        set(regIdx(args[0]), get(regIdx(args[1])) & get(regIdx(args[2]))); break
      case 'or':
        set(regIdx(args[0]), get(regIdx(args[1])) | get(regIdx(args[2]))); break
      case 'xor':
        set(regIdx(args[0]), get(regIdx(args[1])) ^ get(regIdx(args[2]))); break
      case 'andi':
        set(regIdx(args[0]), get(regIdx(args[1])) & num(args[2])); break
      case 'ori':
        set(regIdx(args[0]), get(regIdx(args[1])) | num(args[2])); break
      case 'xori':
        set(regIdx(args[0]), get(regIdx(args[1])) ^ num(args[2])); break
      case 'slt':
        set(regIdx(args[0]), get(regIdx(args[1])) < get(regIdx(args[2])) ? 1 : 0); break
      case 'slti':
        set(regIdx(args[0]), get(regIdx(args[1])) < num(args[2]) ? 1 : 0); break
      case 'beq':
        if (get(regIdx(args[0])) === get(regIdx(args[1]))) { pc = jump(args[2]); continue } break
      case 'bne':
        if (get(regIdx(args[0])) !== get(regIdx(args[1]))) { pc = jump(args[2]); continue } break
      case 'blt':
        if (get(regIdx(args[0])) < get(regIdx(args[1]))) { pc = jump(args[2]); continue } break
      case 'bge':
        if (get(regIdx(args[0])) >= get(regIdx(args[1]))) { pc = jump(args[2]); continue } break
      case 'jal':
        if (args.length === 1) { set(1, (pc + 1) * 4) ; pc = jump(args[0]); continue }
        set(regIdx(args[0]), (pc + 1) * 4); pc = jump(args[1]); continue
      case 'j':
      case 'jmp':
        pc = jump(args[0]); continue
      case 'ecall':
        out.push(String(get(10))); if (get(10) === 0 && out.length > 1) { /* exit */ } break
      case 'nop': break
      default:
        throw new Error('Unsupported instruction: ' + op + '  (line: ' + ins.line + ')')
    }
    pc++
  }
  return out.join('\n')
}

function run() {
  running.value = true
  error.value = ''
  output.value = ''
  try {
    instrsAsm = assemble(code.value)
    // re-run simulate with closure over instrsAsm
    const { instrs, labels } = instrsAsm
    const reg = new Int32Array(32)
    let pc = 0
    const out = []
    let steps = 0
    const get = (i) => (i === 0 ? 0 : reg[i])
    const set = (i, v) => { if (i !== 0) reg[i] = v | 0 }
    const rIdx = (t) => {
      t = t.trim().toLowerCase()
      if (t === 'x0' || t === 'zero') return 0
      if (t === 'x1' || t === 'ra') return 1
      if (t === 'x2' || t === 'sp') return 2
      if (t === 'x3') return 3
      if (t === 'x4') return 4
      if (t === 'x5' || t === 't0') return 5
      if (t === 'x6' || t === 't1') return 6
      if (t === 'x7' || t === 't2') return 7
      if (t === 'x8' || t === 's0' || t === 'fp') return 8
      if (t === 'x9' || t === 's1') return 9
      if (t === 'x10' || t === 'a0') return 10
      if (t === 'x11' || t === 'a1') return 11
      if (t === 'x12' || t === 'a2') return 12
      if (t === 'x13' || t === 'a3') return 13
      if (t === 'x14' || t === 'a4') return 14
      if (t === 'x15' || t === 'a5') return 15
      if (t === 'x16' || t === 'a6') return 16
      if (t === 'x17' || t === 'a7') return 17
      if (t === 'x18') return 18
      if (t === 'x19') return 19
      if (t === 'x20' || t === 's2') return 20
      if (t === 'x21' || t === 's3') return 21
      if (t === 'x22' || t === 's4') return 22
      if (t === 'x23' || t === 's5') return 23
      if (t === 'x24' || t === 's6') return 24
      if (t === 'x25' || t === 's7') return 25
      if (t === 'x26' || t === 's8') return 26
      if (t === 'x27' || t === 's9') return 27
      if (t === 'x28' || t === 's10') return 28
      if (t === 'x29' || t === 's11') return 29
      if (t === 'x30' || t === 't3') return 30
      if (t === 'x31' || t === 't4') return 31
      throw new Error('Unknown register: ' + t)
    }
    const num = (t) => { t = t.trim(); if (t.startsWith('0x')) return parseInt(t, 16); return parseInt(t, 10) }
    while (pc < instrs.length) {
      if (++steps > 100000) throw new Error('Too many steps (possible infinite loop).')
      const ins = instrs[pc]
      const { op, args } = ins
      switch (op) {
        case 'li': case 'la': set(rIdx(args[0]), num(args[1])); break
        case 'mv': case 'move': set(rIdx(args[0]), get(rIdx(args[1]))); break
        case 'add': set(rIdx(args[0]), get(rIdx(args[1])) + get(rIdx(args[2]))); break
        case 'sub': set(rIdx(args[0]), get(rIdx(args[1])) - get(rIdx(args[2]))); break
        case 'mul': set(rIdx(args[0]), Math.imul(get(rIdx(args[1])), get(rIdx(args[2])))); break
        case 'addi': set(rIdx(args[0]), get(rIdx(args[1])) + num(args[2])); break
        case 'muli': set(rIdx(args[0]), Math.imul(get(rIdx(args[1])), num(args[2]))); break
        case 'slli': set(rIdx(args[0]), get(rIdx(args[1])) << num(args[2])); break
        case 'srli': set(rIdx(args[0]), get(rIdx(args[1])) >>> num(args[2])); break
        case 'srai': set(rIdx(args[0]), get(rIdx(args[1])) >> num(args[2])); break
        case 'and': set(rIdx(args[0]), get(rIdx(args[1])) & get(rIdx(args[2]))); break
        case 'or': set(rIdx(args[0]), get(rIdx(args[1])) | get(rIdx(args[2]))); break
        case 'xor': set(rIdx(args[0]), get(rIdx(args[1])) ^ get(rIdx(args[2]))); break
        case 'andi': set(rIdx(args[0]), get(rIdx(args[1])) & num(args[2])); break
        case 'ori': set(rIdx(args[0]), get(rIdx(args[1])) | num(args[2])); break
        case 'slt': set(rIdx(args[0]), get(rIdx(args[1])) < get(rIdx(args[2])) ? 1 : 0); break
        case 'slti': set(rIdx(args[0]), get(rIdx(args[1])) < num(args[2]) ? 1 : 0); break
        case 'beq': if (get(rIdx(args[0])) === get(rIdx(args[1]))) { pc = labels[args[2].trim().toLowerCase()]; if (pc === undefined) throw new Error('label? ' + args[2]); continue } break
        case 'bne': if (get(rIdx(args[0])) !== get(rIdx(args[1]))) { pc = labels[args[2].trim().toLowerCase()]; continue } break
        case 'blt': if (get(rIdx(args[0])) < get(rIdx(args[1]))) { pc = labels[args[2].trim().toLowerCase()]; continue } break
        case 'bge': if (get(rIdx(args[0])) >= get(rIdx(args[1]))) { pc = labels[args[2].trim().toLowerCase()]; continue } break
        case 'jal': if (args.length === 1) { pc = labels[args[0].trim().toLowerCase()]; continue } set(rIdx(args[0]), (pc+1)*4); pc = labels[args[1].trim().toLowerCase()]; continue
        case 'j': case 'jmp': pc = labels[args[0].trim().toLowerCase()]; continue
        case 'ecall': out.push(String(get(10))); break
        case 'nop': break
        default: throw new Error('Unsupported instruction: ' + op + '  (line: ' + ins.line + ')')
      }
      pc++
    }
    output.value = out.join('\n')
  } catch (e) {
    error.value = e.message
  } finally {
    running.value = false
  }
}

function reset() { code.value = defaultCode; output.value = ''; error.value = '' }

const supported = 'li, la, mv, add, sub, mul, addi, muli, slli, srli, srai, and, or, xor, andi, ori, slt, slti, beq, bne, blt, bge, jal, j, ecall, nop'
</script>

<template>
  <div class="asm-play">
    <p class="hint">
      A self-contained <strong>RISC-V (RV32I subset)</strong> emulator runs in your browser — no install needed.
      <code>ecall</code> prints the value in <code>a0</code> (x10). Supported ops: {{ supported }}.
    </p>
    <div class="grid">
      <div class="pane">
        <div class="bar">
          <button class="run" @click="run" :disabled="running">▶ Run</button>
          <button class="reset" @click="reset">Reset</button>
          <span class="label">code (RISC-V assembly)</span>
        </div>
        <textarea v-model="code" spellcheck="false" class="code"></textarea>
      </div>
      <div class="pane">
        <div class="bar"><span class="label">output</span></div>
        <pre v-if="error" class="err">{{ error }}</pre>
        <pre v-else class="out">{{ output || '(run to see output)' }}</pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
.asm-play { margin: 16px 0; }
.hint { color: var(--vp-c-text-2); font-size: 13px; margin-bottom: 10px; }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
@media (max-width: 720px) { .grid { grid-template-columns: 1fr; } }
.pane { border: 1px solid var(--vp-c-divider); border-radius: 10px; overflow: hidden; background: var(--vp-c-bg-soft); }
.bar { display: flex; align-items: center; gap: 8px; padding: 8px 10px; border-bottom: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); }
.label { font-size: 12px; color: var(--vp-c-text-2); margin-left: auto; }
button { border: none; border-radius: 8px; padding: 6px 14px; font-weight: 600; cursor: pointer; }
.run { background: #4f46e5; color: #fff; }
.reset { background: var(--vp-c-bg-soft); color: var(--vp-c-text-1); border: 1px solid var(--vp-c-divider); }
button:disabled { opacity: .6; cursor: default; }
.code { width: 100%; height: 360px; border: none; resize: vertical; padding: 12px; font-family: 'JetBrains Mono', monospace; font-size: 13px; background: var(--vp-c-bg-soft); color: var(--vp-c-text-1); }
.out, .err { margin: 0; padding: 12px; height: 360px; overflow: auto; font-family: 'JetBrains Mono', monospace; font-size: 13px; white-space: pre-wrap; }
.err { color: #ef4444; }
</style>
