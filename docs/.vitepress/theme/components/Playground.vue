<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{ lang?: string; code?: string }>()
const lang = props.lang || 'js'
const initial = props.code || defaultCode(lang)
const source = ref(initial)
const output = ref('')
const error = ref('')

function defaultCode(l: string) {
  if (l === 'html') return '<h1>Hello</h1>\n<button onclick="alert(\'hi\')">Click</button>'
  if (l === 'python')
    return 'print("Hello from Python")\n# Note: run Python via the Live Editor / your environment'
  return "console.log('Hello, ' + 'DevNotes!')\nconst sum = [1,2,3].reduce((a,b)=>a+b,0)\nconsole.log('sum =', sum)"
}

const iframeSrc = computed(() => {
  if (lang !== 'html') return ''
  return 'data:text/html;charset=utf-8,' + encodeURIComponent(source.value)
})

function run() {
  error.value = ''
  output.value = ''
  if (lang === 'js') {
    const logs: string[] = []
    const orig = console.log
    ;(console as any).log = (...a: any[]) => logs.push(a.map(String).join(' '))
    try {
      // eslint-disable-next-line no-new-func
      new Function(source.value)()
      output.value = logs.join('\n')
    } catch (e: any) {
      error.value = String(e)
    } finally {
      console.log = orig
    }
  } else if (lang === 'html') {
    output.value = 'Rendered in the preview below ↓'
  } else {
    output.value = `(Cannot execute ${lang} in-browser. Copy this into your local environment or the Live Editor.)`
  }
}

run()
</script>

<template>
  <div class="pg">
    <div class="pg-head">
      <span class="pg-lang">{{ lang.toUpperCase() }} Playground</span>
      <button class="pg-run" @click="run">▶ Run</button>
    </div>
    <textarea v-model="source" class="pg-input" spellcheck="false"></textarea>
    <div v-if="lang === 'html'" class="pg-iframe">
      <iframe :src="iframeSrc" title="preview"></iframe>
    </div>
    <pre v-if="output" class="pg-out">{{ output }}</pre>
    <pre v-if="error" class="pg-err">{{ error }}</pre>
  </div>
</template>

<style scoped>
.pg {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  margin: 1.2rem 0;
  overflow: hidden;
}
.pg-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
}
.pg-lang {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
}
.pg-run {
  cursor: pointer;
  border: 1px solid var(--vp-c-brand-1);
  background: var(--vp-c-brand-1);
  color: #fff;
  font-size: 0.8rem;
  padding: 4px 14px;
  border-radius: 7px;
}
.pg-run:hover {
  background: var(--vp-c-brand-2);
}
.pg-input {
  width: 100%;
  border: none;
  resize: vertical;
  min-height: 120px;
  padding: 12px 14px;
  font-family: ui-monospace, monospace;
  font-size: 0.85rem;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  outline: none;
}
.pg-iframe {
  border-top: 1px solid var(--vp-c-divider);
}
.pg-iframe iframe {
  width: 100%;
  height: 160px;
  border: none;
  background: #fff;
}
.pg-out {
  margin: 0;
  padding: 10px 14px;
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  font-size: 0.82rem;
  white-space: pre-wrap;
  color: var(--vp-c-text-1);
}
.pg-err {
  margin: 0;
  padding: 10px 14px;
  border-top: 1px solid var(--vp-c-divider);
  background: color-mix(in srgb, #f43f5e 8%, var(--vp-c-bg));
  color: #f43f5e;
  font-size: 0.82rem;
  white-space: pre-wrap;
}
</style>
