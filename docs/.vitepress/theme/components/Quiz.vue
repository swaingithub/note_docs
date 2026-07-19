<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Card {
  q: string
  a: string
}
const props = defineProps<{ cards?: Card[]; storageKey?: string }>()

const KEY = (k: string) => 'devnotes:quiz:' + k
// schedule: { [index]: { due: timestamp, interval: days, reps } }

const schedule = ref<Record<number, { due: number; interval: number; reps: number }>>({})
const idx = ref(0)
const flipped = ref(false)
const done = ref(false)

const cards = computed(() => props.cards || [])

function dueCards() {
  const now = Date.now()
  const list: number[] = []
  cards.value.forEach((_, i) => {
    const s = schedule.value[i]
    if (!s || s.due <= now) list.push(i)
  })
  return list
}

function load() {
  try {
    schedule.value = JSON.parse(localStorage.getItem(KEY(props.storageKey || 'default')) || '{}')
  } catch {
    schedule.value = {}
  }
  const d = dueList()
  if (d.length === 0) {
    // all reviewed; show a fresh round
    idx.value = 0
    if (cards.value.length) done.value = false
  } else {
    idx.value = d[0]
  }
}

const current = computed(() => cards.value[idx.value])

// Study mode: "due" only reschedules; "all" ignores schedule for this session
const mode = ref<'due' | 'all'>('due')
function dueList() {
  const now = Date.now()
  return cards.value.map((_, i) => i).filter((i) => {
    const s = schedule.value[i]
    return !s || s.due <= now
  })
}
// current round queue (so "all" mode still cycles every card once)
const round = ref<number[]>([])
function buildRound() {
  round.value = mode.value === 'all' ? cards.value.map((_, i) => i) : dueList()
}

const nextDue = computed(() => {
  const s = schedule.value[idx.value]
  if (!s || !s.due) return null
  const ms = s.due - Date.now()
  if (ms <= 0) return 'due now'
  const d = Math.floor(ms / 86400000)
  if (d >= 1) return `next in ${d}d`
  const h = Math.floor(ms / 3600000)
  if (h >= 1) return `next in ${h}h`
  const m = Math.max(1, Math.floor(ms / 60000))
  return `next in ${m}m`
})

function flip() {
  flipped.value = !flipped.value
}

function grade(quality: 'again' | 'hard' | 'good') {
  const i = idx.value
  const prev = schedule.value[i] || { due: 0, interval: 0, reps: 0 }
  let interval = prev.interval
  if (quality === 'again') interval = 0
  else if (quality === 'hard') interval = Math.max(1, Math.round(interval * 1.3))
  else interval = Math.max(1, Math.round(interval * 2.2) || 1)
  const due = Date.now() + interval * 24 * 3600 * 1000
  schedule.value[i] = { due, interval, reps: prev.reps + 1 }
  localStorage.setItem(KEY(props.storageKey || 'default'), JSON.stringify(schedule.value))
  flipped.value = false
  advance(quality === 'again' ? i : -1)
}

// advance to the next card in the round (or reschedule-aware next due)
function advance(requeue: number) {
  if (mode.value === 'all') {
    const pos = round.value.indexOf(idx.value)
    const next = round.value[pos + 1]
    if (next === undefined) {
      done.value = true
    } else {
      idx.value = next
    }
    return
  }
  // due mode: re-evaluate due list (an "again" stays due, others drop out)
  const d = dueList()
  if (requeue >= 0) {
    // keep the failed card in the working set by resetting its due now
    schedule.value[requeue] = { ...schedule.value[requeue], due: Date.now() }
  }
  if (d.length === 0) {
    done.value = true
  } else {
    idx.value = d[0]
  }
}

function setMode(m: 'due' | 'all') {
  mode.value = m
  buildRound()
  const d = dueList()
  if (m === 'all') {
    idx.value = round.value[0] ?? 0
    done.value = round.value.length === 0
  } else {
    if (d.length === 0) { done.value = true }
    else { idx.value = d[0]; done.value = false }
  }
  flipped.value = false
}

function resetSchedule() {
  schedule.value = {}
  localStorage.removeItem(KEY(props.storageKey || 'default'))
  mode.value = 'all'
  buildRound()
  idx.value = 0
  done.value = cards.value.length === 0
  flipped.value = false
}

const dueCount = computed(() => dueList().length)
const totalRounds = computed(() => round.value.length)

onMounted(() => { load(); buildRound() })
</script>

<template>
  <div class="quiz" v-if="cards.length">
    <div class="qz-head">
      <span class="qz-title">🧠 Flashcards <span class="qz-sr">· Spaced Repetition</span></span>
      <span class="qz-meta">{{ dueCount }} due · {{ cards.length }} total</span>
    </div>

    <div class="qz-modes">
      <button :class="{ on: mode === 'due' }" @click="setMode('due')">Due only</button>
      <button :class="{ on: mode === 'all' }" @click="setMode('all')">Study all</button>
      <button class="qz-reset" @click="resetSchedule" title="Clear saved schedule">Reset</button>
    </div>

    <div v-if="!done" class="qz-card" @click="flip">
      <div class="qz-side">
        {{ flipped ? 'Answer' : 'Question' }}
        <span class="qz-prog">{{ mode === 'all' ? (round.indexOf(idx) + 1) + '/' + totalRounds : (cards.length - dueCount + 1) + '/' + cards.length }}</span>
      </div>
      <div class="qz-body" v-html="flipped ? current.a : current.q"></div>
      <div class="qz-hint">
        <template v-if="!flipped">click to reveal</template>
        <template v-else>
          Rate your recall ↓ <span v-if="nextDue" class="qz-next">{{ nextDue }}</span>
        </template>
      </div>
    </div>
    <div v-else class="qz-done">
      ✅ All cards reviewed. Come back later — spaced repetition reschedules them.
      <button class="qz-restudy" @click="setMode('all')">Restudy now →</button>
    </div>

    <div v-if="!done && flipped" class="qz-grades">
      <button class="qz-g again" @click.stop="grade('again')">Again</button>
      <button class="qz-g hard" @click.stop="grade('hard')">Hard</button>
      <button class="qz-g good" @click.stop="grade('good')">Good</button>
    </div>
  </div>
</template>

<style scoped>
.quiz {
  margin: 1.6rem 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  padding: 14px 16px;
}
.qz-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 10px;
}
.qz-title { font-weight: 700; font-size: 0.9rem; }
.qz-sr { color: var(--vp-c-brand-1); font-weight: 600; font-size: 0.7rem; }
.qz-meta { font-size: 0.76rem; color: var(--vp-c-text-2); }
.qz-modes { display: flex; gap: 6px; margin-bottom: 10px; }
.qz-modes button {
  cursor: pointer; border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); color: var(--vp-c-text-2);
  padding: 4px 10px; border-radius: 999px; font-size: 0.74rem; font-weight: 600;
}
.qz-modes button.on { background: var(--vp-c-brand-1); color: #fff; border-color: var(--vp-c-brand-1); }
.qz-modes .qz-reset { margin-left: auto; color: var(--vp-c-text-2); }
.qz-prog { float: right; color: var(--vp-c-text-2); font-weight: 600; }
.qz-next { color: var(--vp-c-brand-1); font-weight: 700; }
.qz-restudy {
  display: block; margin-top: 8px; cursor: pointer;
  border: 1px solid var(--vp-c-brand-1); background: transparent;
  color: var(--vp-c-brand-1); padding: 6px 12px; border-radius: 8px; font-weight: 600;
}
.qz-card {
  cursor: pointer;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg);
  padding: 16px;
  min-height: 90px;
}
.qz-side {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--vp-c-brand-1);
  font-weight: 700;
  margin-bottom: 6px;
}
.qz-body { font-size: 0.95rem; line-height: 1.6; }
.qz-hint { margin-top: 8px; font-size: 0.74rem; color: var(--vp-c-text-2); }
.qz-done { padding: 14px; color: var(--vp-c-brand-1); font-weight: 600; }
.qz-grades { display: flex; gap: 8px; margin-top: 10px; }
.qz-g {
  flex: 1;
  cursor: pointer;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  padding: 8px;
  border-radius: 8px;
  font-weight: 600;
}
.qz-g.again:hover { border-color: #f43f5e; color: #f43f5e; }
.qz-g.hard:hover { border-color: #f59e0b; color: #b45309; }
.qz-g.good:hover { border-color: #22c55e; color: #15803d; }
</style>
