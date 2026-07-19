<script setup>
import { ref, computed, onMounted } from 'vue'

const decks = ref([])
const filter = ref<'all' | 'due'>('due')

function titleFromKey(key) {
  const last = key.split('/').pop()
  return last
    .replace(/^quiz-/, '')
    .replace(/-(md|overview)$/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function sectionFromKey(key) {
  const parts = key.split('/')
  if (parts.length > 1) return parts[0].replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  return 'Languages'
}

function load() {
  const rows = []
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i)
    if (!k || !k.startsWith('devnotes:quiz:')) continue
    const key = k.slice('devnotes:quiz:'.length)
    let schedule = {}
    try { schedule = JSON.parse(localStorage.getItem(k) || '{}') } catch {}
    const ids = Object.keys(schedule)
    const total = ids.length
    const now = Date.now()
    let due = 0
    let nextDue = Infinity
    ids.forEach((id) => {
      const s = schedule[id]
      if (!s || !s.due || s.due <= now) due++
      else if (s.due < nextDue) nextDue = s.due
    })
    rows.push({
      key,
      path: '/' + key,
      title: titleFromKey(key),
      section: sectionFromKey(key),
      total,
      due,
      nextDue: nextDue === Infinity ? null : nextDue,
    })
  }
  // Only show decks that have some scheduling history (user has studied them)
  decks.value = rows.sort((a, b) => a.section.localeCompare(b.section) || a.title.localeCompare(b.title))
}

const visible = computed(() => {
  const list = filter.value === 'due' ? decks.value.filter((d) => d.due > 0) : decks.value
  return list
})

const sections = computed(() => {
  const map = {}
  visible.value.forEach((d) => { (map[d.section] = map[d.section] || []).push(d) })
  return Object.entries(map)
})

const totalDue = computed(() => decks.value.reduce((s, d) => s + d.due, 0))
const totalStudied = computed(() => decks.value.length)
const totalCards = computed(() => decks.value.reduce((s, d) => s + d.total, 0))

function dueLabel(d) {
  if (d.due > 0) return `${d.due} due`
  if (!d.nextDue) return '—'
  const ms = d.nextDue - Date.now()
  const day = Math.floor(ms / 86400000)
  if (day >= 1) return `next in ${day}d`
  const hr = Math.floor(ms / 3600000)
  if (hr >= 1) return `next in ${hr}h`
  return 'next soon'
}

function refresh() { load() }

onMounted(() => { load() })
</script>

<template>
  <div class="srs">
    <div class="summary">
      <div class="stat"><span class="n">{{ totalDue }}</span><span class="l">cards due</span></div>
      <div class="stat"><span class="n">{{ totalStudied }}</span><span class="l">decks studied</span></div>
      <div class="stat"><span class="n">{{ totalCards }}</span><span class="l">total reviews</span></div>
      <button class="refresh" @click="refresh">↻ Refresh</button>
    </div>

    <div class="modes">
      <button :class="{ on: filter === 'due' }" @click="filter = 'due'">Due only</button>
      <button :class="{ on: filter === 'all' }" @click="filter = 'all'">All decks</button>
    </div>

    <p v-if="!decks.length" class="empty">
      No review history yet. Open any lesson with a 🧠 Flashcards box, study a few cards, then come back here to track your spaced-repetition schedule.
    </p>

    <div v-for="[sec, list] in sections" :key="sec" class="group">
      <h3>{{ sec }}</h3>
      <ul>
        <li v-for="d in list" :key="d.key">
          <a :href="d.path">{{ d.title }}</a>
          <span class="badge" :class="{ hot: d.due > 0 }">{{ dueLabel(d) }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.srs { margin: 16px 0; }
.summary { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; padding: 14px 16px; border: 1px solid var(--vp-c-divider); border-radius: 12px; background: var(--vp-c-bg-soft); }
.stat { display: flex; flex-direction: column; }
.stat .n { font-size: 1.5rem; font-weight: 800; color: var(--vp-c-brand-1); }
.stat .l { font-size: 0.72rem; color: var(--vp-c-text-2); }
.refresh { margin-left: auto; cursor: pointer; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); color: var(--vp-c-text-1); border-radius: 8px; padding: 6px 12px; font-weight: 600; }
.modes { display: flex; gap: 6px; margin: 12px 0; }
.modes button { cursor: pointer; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); color: var(--vp-c-text-2); padding: 4px 10px; border-radius: 999px; font-size: 0.74rem; font-weight: 600; }
.modes button.on { background: var(--vp-c-brand-1); color: #fff; border-color: var(--vp-c-brand-1); }
.empty { color: var(--vp-c-text-2); font-size: 0.9rem; }
.group { margin: 14px 0; }
.group h3 { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--vp-c-text-2); margin: 0 0 6px; }
.group ul { list-style: none; margin: 0; padding: 0; }
.group li { display: flex; align-items: center; justify-content: space-between; padding: 7px 0; border-bottom: 1px solid var(--vp-c-divider); }
.group li a { color: var(--vp-c-text-1); text-decoration: none; font-weight: 600; }
.group li a:hover { color: var(--vp-c-brand-1); }
.badge { font-size: 0.72rem; font-weight: 700; color: var(--vp-c-text-2); background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); border-radius: 999px; padding: 2px 10px; }
.badge.hot { color: #b45309; background: #fef3c7; border-color: #fde68a; }
</style>
