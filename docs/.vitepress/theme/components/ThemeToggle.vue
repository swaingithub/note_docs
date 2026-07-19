<script setup lang="ts">
import { ref, onMounted } from 'vue'

type Mode = 'light' | 'dark' | 'auto'
const mode = ref<Mode>('auto')
const KEY = 'devnotes:theme'

function apply() {
  const root = document.documentElement
  if (mode.value === 'dark') {
    root.classList.add('dark')
  } else if (mode.value === 'light') {
    root.classList.remove('dark')
  } else {
    // auto: follow system
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    root.classList.toggle('dark', prefersDark)
  }
}

function set(m: Mode) {
  mode.value = m
  localStorage.setItem(KEY, m)
  apply()
}

function cycle() {
  const order: Mode[] = ['light', 'dark', 'auto']
  const next = order[(order.indexOf(mode.value) + 1) % order.length]
  set(next)
}

const icon = () => (mode.value === 'dark' ? '🌙' : mode.value === 'light' ? '☀️' : '🌗')

onMounted(() => {
  mode.value = (localStorage.getItem(KEY) as Mode) || 'auto'
  apply()
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (mode.value === 'auto') apply()
  })
})
</script>

<template>
  <button class="tt-btn" :title="'Theme: ' + mode" @click="cycle">
    <span class="tt-icon">{{ icon() }}</span>
    <span class="tt-label">{{ mode }}</span>
  </button>
</template>

<style scoped>
.tt-btn {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 900;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  padding: 8px 14px;
  border-radius: 999px;
  box-shadow: 0 6px 20px -10px rgba(0, 0, 0, 0.4);
  font-size: 0.82rem;
  transition: border-color 0.15s, transform 0.15s;
}
.tt-btn:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-1px);
}
.tt-label {
  text-transform: capitalize;
}
</style>
