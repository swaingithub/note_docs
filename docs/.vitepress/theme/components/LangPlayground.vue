<script setup>
import { ref } from 'vue'

const props = defineProps({
  lang: { type: String, default: 'go' }, // 'go' | 'rust'
  code: { type: String, default: '' },
})

const defaultCode = {
  go: `package main

import "fmt"

func main() {
\tfmt.Println("hello from Go")
\ta, b := 2, 3
\tfmt.Println("sum =", a+b)
}`,
  rust: `fn main() {
    println!("hello from Rust");
    let a = 2;
    let b = 3;
    println!("sum = {}", a + b);
}`,
}

const editable = ref(props.code || defaultCode[props.lang] || '')
const output = ref('')
const error = ref('')
const running = ref(false)

function run() {
  error.value = ''
  output.value = ''
  if (props.lang === 'rust') return runRust()
  return runGo()
}

async function runRust() {
  running.value = true
  try {
    const res = await fetch('https://play.rust-lang.org/execute.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        channel: 'stable', mode: 'debug', edition: '2021',
        crateType: 'bin', tests: false, code: editable.value,
      }),
    })
    const data = await res.json()
    if (data.error) error.value = String(data.error)
    else output.value = (data.stdout || '') + (data.stderr || '')
  } catch (e) {
    error.value = 'Network error: ' + e.message + '\n(Needs internet to reach play.rust-lang.org)'
  } finally {
    running.value = false
  }
}

function runGo() {
  running.value = true
  try {
    const ws = new WebSocket('wss://goplay.golang.org/v1/compile')
    const timer = setTimeout(() => {
      error.value = 'Timeout talking to Go playground.'
      running.value = false
      try { ws.close() } catch {}
    }, 15000)
    ws.onopen = () => ws.send(JSON.stringify({ body: editable.value, withVet: false }))
    ws.onmessage = (ev) => {
      clearTimeout(timer)
      const r = JSON.parse(ev.data)
      if (r.Errors) error.value = r.Errors
      else output.value = r.Events.map(e => e.Message).join('') || '(no output)'
      running.value = false
      ws.close()
    }
    ws.onerror = () => {
      clearTimeout(timer)
      error.value = 'Could not reach Go playground (needs internet).'
      running.value = false
    }
  } catch (e) {
    error.value = 'WebSocket error: ' + e.message
    running.value = false
  }
}

function reset() { editable.value = defaultCode[props.lang] || ''; output.value = ''; error.value = '' }
</script>

<template>
  <div class="lang-play">
    <p class="hint">
      Run <strong>{{ lang === 'go' ? 'Go' : 'Rust' }}</strong> in your browser via the official playground API (needs internet).
    </p>
    <div class="grid">
      <div class="pane">
        <div class="bar">
          <button class="run" @click="run" :disabled="running">▶ Run</button>
          <button class="reset" @click="reset">Reset</button>
          <span class="label">code ({{ lang }})</span>
        </div>
        <textarea v-model="editable" spellcheck="false" class="code"></textarea>
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
.lang-play { margin: 16px 0; }
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
.code { width: 100%; height: 300px; border: none; resize: vertical; padding: 12px; font-family: 'JetBrains Mono', monospace; font-size: 13px; background: var(--vp-c-bg-soft); color: var(--vp-c-text-1); }
.out, .err { margin: 0; padding: 12px; height: 300px; overflow: auto; font-family: 'JetBrains Mono', monospace; font-size: 13px; white-space: pre-wrap; }
.err { color: #ef4444; }
</style>
