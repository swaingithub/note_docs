<script setup>
import { ref, onMounted, computed } from 'vue'
import { getActivity, currentStreak, recordStudy } from '../studyActivity'

const dates = ref([])
const weeks = ref([])

function build() {
  dates.value = getActivity()
  const set = new Set(dates.value)
  // Build last 12 weeks (84 days) grid, Sun..Sat columns
  const today = new Date()
  const grid = []
  // start 83 days ago, aligned to Sunday
  const start = new Date(today)
  start.setDate(start.getDate() - 83)
  start.setDate(start.getDate() - start.getDay())
  for (let w = 0; w < 12; w++) {
    const col = []
    for (let d = 0; d < 7; d++) {
      const cur = new Date(start)
      cur.setDate(start.getDate() + w * 7 + d)
      const iso = cur.toISOString().slice(0, 10)
      const future = cur > today
      col.push({ iso, on: set.has(iso) && !future, future })
    }
    grid.push(col)
  }
  weeks.value = grid
}

const streak = computed(() => currentStreak(dates.value))
const total = computed(() => dates.value.length)
const monthAgo = computed(() => {
  const d = new Date()
  d.setDate(d.getDate() - 30)
  return dates.value.filter((x) => x >= d.toISOString().slice(0, 10)).length
})

onMounted(() => {
  // viewing the dashboard counts as a study visit today
  recordStudy()
  build()
})

function cls(c) {
  if (c.future) return 'cell fut'
  if (c.on) return 'cell on'
  return 'cell'
}
</script>

<template>
  <div class="streak">
    <div class="stats">
      <div class="s"><span class="n">🔥 {{ streak }}</span><span class="l">day streak</span></div>
      <div class="s"><span class="n">{{ monthAgo }}</span><span class="l">active last 30d</span></div>
      <div class="s"><span class="n">{{ total }}</span><span class="l">total days</span></div>
    </div>
    <div class="heat">
      <div v-for="(col, ci) in weeks" :key="ci" class="col">
        <div v-for="(c, ri) in col" :key="ri" :class="cls(c)" :title="c.iso"></div>
      </div>
    </div>
    <p class="hint">Your study activity is saved in this browser only. Studying flashcards or ticking checklists extends your streak.</p>
  </div>
</template>

<style scoped>
.streak { border: 1px solid var(--vp-c-divider); border-radius: 12px; background: var(--vp-c-bg-soft); padding: 14px 16px; margin: 16px 0; }
.stats { display: flex; gap: 20px; flex-wrap: wrap; margin-bottom: 12px; }
.s { display: flex; flex-direction: column; }
.n { font-size: 1.4rem; font-weight: 800; color: var(--vp-c-brand-1); }
.l { font-size: 0.72rem; color: var(--vp-c-text-2); }
.heat { display: flex; gap: 3px; overflow-x: auto; padding-bottom: 4px; }
.col { display: flex; flex-direction: column; gap: 3px; }
.cell { width: 13px; height: 13px; border-radius: 3px; background: var(--vp-c-divider); }
.cell.on { background: #4f46e5; }
.cell.fut { background: transparent; }
.hint { margin: 10px 0 0; font-size: 0.74rem; color: var(--vp-c-text-2); }
</style>
