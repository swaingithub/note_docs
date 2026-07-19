<script setup>
import { ref } from 'vue'

const LANGS = [
  { id: 'javascript', label: 'JavaScript', offline: true },
  { id: 'python', label: 'Python', offline: false },
  { id: 'go', label: 'Go', offline: false },
  { id: 'rust', label: 'Rust', offline: false },
]

const defaultCode = {
  javascript: `// runs natively in your browser (no network)
function fib(n) {
  return n < 2 ? n : fib(n - 1) + fib(n - 2);
}
console.log('fib(10) =', fib(10));`,
  python: `def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)

print("fib(10) =", fib(10))`,
  go: `package main

import "fmt"

func fib(n int) int {
\tif n < 2 { return n }
\treturn fib(n-1) + fib(n-2)
}

func main() {
\tfmt.Println("fib(10) =", fib(10))
}`,
  rust: `fn fib(n: u64) -> u64 {
    if n < 2 { n } else { fib(n - 1) + fib(n - 2) }
}

fn main() {
    println!("fib(10) = {}", fib(10));
}`,
}

const lang = ref('javascript')
const code = ref(defaultCode.javascript)
const output = ref('')
const error = ref('')
const running = ref(false)

function selectLang(l) {
  lang.value = l
  code.value = defaultCode[l]
  output.value = ''
  error.value = ''
}

function run() {
  error.value = ''
  output.value = ''
  if (lang.value === 'javascript') return runJS()
  if (lang.value === 'python') return runPython()
  if (lang.value === 'go') return runGo()
  if (lang.value === 'rust') return runRust()
}

// --- JavaScript: native capture of console ---
function runJS() {
  running.value = true
  const logs = []
  const fakeConsole = {
    log: (...a) => logs.push(a.map(String).join(' ')),
    error: (...a) => logs.push('[error] ' + a.map(String).join(' ')),
    warn: (...a) => logs.push('[warn] ' + a.map(String).join(' ')),
  }
  try {
    const fn = new Function('console', code.value)
    fn(fakeConsole)
    output.value = logs.join('\n') || '(no output)'
  } catch (e) {
    error.value = e.message
  } finally {
    running.value = false
  }
}

// --- Python: Skulpt (CDN, on demand) ---
let skulptReady = false
async function ensureSkulpt() {
  if (skulptReady && window.Sk) return true
  if (!window.Sk) {
    await new Promise((res, rej) => {
      const s = document.createElement('script')
      s.src = 'https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/skulpt.min.js'
      s.onload = res
      s.onerror = () => rej(new Error('Failed to load Python runtime'))
      document.head.appendChild(s)
      const s2 = document.createElement('script')
      s2.src = 'https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/skulpt-stdlib.js'
      s2.onload = res
      s2.onerror = () => rej(new Error('Failed to load Python stdlib'))
      document.head.appendChild(s2)
    })
  }
  window.Sk.configure({
    output: (s) => { output.value += s },
    read: (f) => { throw new Error('File not found: ' + f) },
  })
  skulptReady = true
  return true
}
async function runPython() {
  running.value = true
  output.value = ''
  try {
    await ensureSkulpt()
    output.value = ''
    window.Sk.misceval.asyncToPromise(() => window.Sk.importMainWithBody('<stdin>', false, code.value, true))
      .then(() => {}, (e) => { error.value = (e && e.toString()) || 'Python error' })
  } catch (e) {
    error.value = 'Network error: ' + e.message + '\n(Python needs internet to load its runtime)'
  } finally {
    running.value = false
  }
}

// --- Go: goplay websocket ---
function runGo() {
  running.value = true
  try {
    const ws = new WebSocket('wss://goplay.golang.org/v1/compile')
    const timer = setTimeout(() => { error.value = 'Timeout talking to Go playground.'; running.value = false; try { ws.close() } catch {} }, 15000)
    ws.onopen = () => ws.send(JSON.stringify({ body: code.value, withVet: false }))
    ws.onmessage = (ev) => {
      clearTimeout(timer)
      const r = JSON.parse(ev.data)
      if (r.Errors) error.value = r.Errors
      else output.value = r.Events.map(e => e.Message).join('') || '(no output)'
      running.value = false
      ws.close()
    }
    ws.onerror = () => { clearTimeout(timer); error.value = 'Could not reach Go playground (needs internet).'; running.value = false }
  } catch (e) { error.value = 'WebSocket error: ' + e.message; running.value = false }
}

// --- Rust: rust-lang API ---
async function runRust() {
  running.value = true
  try {
    const res = await fetch('https://play.rust-lang.org/execute.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ channel: 'stable', mode: 'debug', edition: '2021', crateType: 'bin', tests: false, code: code.value }),
    })
    const data = await res.json()
    if (data.error) error.value = String(data.error)
    else output.value = (data.stdout || '') + (data.stderr || '')
  } catch (e) {
    error.value = 'Network error: ' + e.message + '\n(Needs internet to reach play.rust-lang.org)'
  } finally { running.value = false }
}

function reset() { code.value = defaultCode[lang.value]; output.value = ''; error.value = '' }
</script>

<template>
  <div class="oc">
    <p class="hint">
      A multi-language online compiler. <strong>JavaScript runs fully offline</strong>; Python/Go/Rust use official playground APIs (need internet).
    </p>
    <div class="tabs">
      <button v-for="l in LANGS" :key="l.id" :class="{ on: lang === l.id }" @click="selectLang(l.id)">
        {{ l.label }} <span v-if="l.offline" class="tag">offline</span>
      </button>
    </div>
    <div class="grid">
      <div class="pane">
        <div class="bar">
          <button class="run" @click="run" :disabled="running">▶ Run</button>
          <button class="reset" @click="reset">Reset</button>
          <span class="label">{{ lang }}</span>
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
.oc { margin: 16px 0; }
.hint { color: var(--vp-c-text-2); font-size: 13px; margin-bottom: 10px; }
.tabs { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; }
.tabs button {
  cursor: pointer; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg);
  color: var(--vp-c-text-1); padding: 6px 12px; border-radius: 8px; font-weight: 600; font-size: 0.82rem;
}
.tabs button.on { background: var(--vp-c-brand-1); color: #fff; border-color: var(--vp-c-brand-1); }
.tabs .tag { font-size: 0.62rem; opacity: 0.8; margin-left: 4px; }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
@media (max-width: 720px) { .grid { grid-template-columns: 1fr; } }
.pane { border: 1px solid var(--vp-c-divider); border-radius: 10px; overflow: hidden; background: var(--vp-c-bg-soft); }
.bar { display: flex; align-items: center; gap: 8px; padding: 8px 10px; border-bottom: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); }
.label { font-size: 12px; color: var(--vp-c-text-2); margin-left: auto; }
button.run { border: none; border-radius: 8px; padding: 6px 14px; font-weight: 600; cursor: pointer; background: #4f46e5; color: #fff; }
button.reset { background: var(--vp-c-bg-soft); color: var(--vp-c-text-1); border: 1px solid var(--vp-c-divider); border-radius: 8px; padding: 6px 14px; font-weight: 600; cursor: pointer; }
button:disabled { opacity: .6; cursor: default; }
.code { width: 100%; height: 340px; border: none; resize: vertical; padding: 12px; font-family: 'JetBrains Mono', monospace; font-size: 13px; background: var(--vp-c-bg-soft); color: var(--vp-c-text-1); }
.out, .err { margin: 0; padding: 12px; height: 340px; overflow: auto; font-family: 'JetBrains Mono', monospace; font-size: 13px; white-space: pre-wrap; }
.err { color: #ef4444; }
</style>
