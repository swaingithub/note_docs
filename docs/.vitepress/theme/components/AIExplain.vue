<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useData } from 'vitepress'

const { page, content } = useData()

const KEY_KEY = 'devnotes:ai:key'
const KEY_URL = 'devnotes:ai:url'
const key = ref('')
const url = ref('https://api.openai.com/v1/chat/completions')
const model = ref('gpt-4o-mini')
const mode = ref<'summarize' | 'simplify' | 'quiz'>('summarize')
const output = ref('')
const loading = ref(false)
const error = ref('')

function load() {
  key.value = localStorage.getItem(KEY_KEY) || ''
  url.value = localStorage.getItem(KEY_URL) || url.value
}
function saveCfg() {
  localStorage.setItem(KEY_KEY, key.value)
  localStorage.setItem(KEY_URL, url.value)
}
async function run() {
  if (!key.value) {
    error.value = 'Add your API key first (click ⚙). It is stored only in this browser.'
    return
  }
  error.value = ''
  loading.value = true
  output.value = ''
  const prompt =
    mode.value === 'summarize'
      ? 'Summarize the following technical notes concisely in bullet points for a learner:'
      : mode.value === 'simplify'
      ? 'Explain the following technical notes in simple terms, like teaching a beginner. Use short paragraphs:'
      : 'Based on the following notes, generate 5 flashcards as "Q: ... A: ..." pairs for spaced repetition:'
  const text = (content.value || '').slice(0, 12000)
  try {
    const res = await fetch(url.value, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + key.value,
      },
      body: JSON.stringify({
        model: model.value,
        messages: [
          { role: 'system', content: 'You are a helpful coding tutor.' },
          { role: 'user', content: prompt + '\n\n' + text },
        ],
        temperature: 0.3,
      }),
    })
    if (!res.ok) throw new Error('HTTP ' + res.status)
    const data = await res.json()
    output.value = data?.choices?.[0]?.message?.content || '(no content)'
  } catch (e: any) {
    error.value = String(e.message || e)
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>

<template>
  <div class="ai">
    <div class="ai-bar">
      <button class="ai-btn" :class="{ on: mode === 'summarize' }" @click="mode = 'summarize'">Summary</button>
      <button class="ai-btn" :class="{ on: mode === 'simplify' }" @click="mode = 'simplify'">Simplify</button>
      <button class="ai-btn" :class="{ on: mode === 'quiz' }" @click="mode = 'quiz'">Make quiz</button>
      <button class="ai-go" @click="run" :disabled="loading">{{ loading ? '…' : '✨ Run AI' }}</button>
      <details class="ai-cfg">
        <summary>⚙</summary>
        <label>API key
          <input type="password" v-model="key" @change="saveCfg" placeholder="sk-..." />
        </label>
        <label>Endpoint
          <input v-model="url" @change="saveCfg" placeholder="https://api.openai.com/v1/chat/completions" />
        </label>
        <label>Model
          <input v-model="model" @change="saveCfg" placeholder="gpt-4o-mini" />
        </label>
      </details>
    </div>
    <div v-if="error" class="ai-err">{{ error }}</div>
    <pre v-if="output" class="ai-out">{{ output }}</pre>
  </div>
</template>

<style scoped>
.ai {
  margin: 1.4rem 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  padding: 12px 14px;
}
.ai-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
.ai-btn {
  cursor: pointer;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.78rem;
  padding: 5px 10px;
  border-radius: 8px;
}
.ai-btn.on { background: var(--vp-c-brand-1); color: #fff; border-color: var(--vp-c-brand-1); }
.ai-go {
  cursor: pointer;
  border: 1px solid var(--vp-c-brand-1);
  background: var(--vp-c-brand-1);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 8px;
}
.ai-go:disabled { opacity: 0.6; cursor: default; }
.ai-cfg { margin-left: auto; font-size: 0.8rem; }
.ai-cfg summary { cursor: pointer; list-style: none; padding: 4px 8px; }
.ai-cfg label {
  display: block;
  font-size: 0.72rem;
  color: var(--vp-c-text-2);
  margin: 6px 0;
}
.ai-cfg input {
  width: 100%;
  margin-top: 3px;
  padding: 5px 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}
.ai-err { color: #f43f5e; font-size: 0.82rem; margin-top: 8px; }
.ai-out {
  margin: 10px 0 0;
  white-space: pre-wrap;
  font-size: 0.86rem;
  line-height: 1.6;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 12px 14px;
}
</style>
