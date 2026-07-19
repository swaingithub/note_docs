<script setup lang="ts">
import { ref, onMounted, computed, watch, onBeforeUnmount } from 'vue'
import { useRoute } from 'vitepress'

interface Store {
  done: Record<number, boolean>
  completedAt?: number
}

interface CourseStat {
  key: string
  title: string
  checked: number
  total: number
  pct: number
  completedAt?: number
}

// Map a course folder to its human title + number of lessons (matches generator).
const courseMeta: Record<string, { title: string; lessons: number; lessonItems: number[] }> = {
  'computer-science': { title: 'Computer Science (OSSU)', lessons: 7, lessonItems: [1, 2, 2, 1, 1, 1, 2] },
  'web-development': { title: 'Web Development', lessons: 9, lessonItems: [3, 3, 3, 2, 2, 3, 3, 2, 4] },
  dsa: { title: 'Data Structures & Algorithms', lessons: 4, lessonItems: [2, 2, 2, 2] },
  'machine-learning': { title: 'Machine Learning', lessons: 7, lessonItems: [2, 2, 1, 3, 2, 2, 2] },
  devops: { title: 'DevOps & Cloud', lessons: 4, lessonItems: [2, 2, 3, 2] },
  mobile: { title: 'Mobile Development', lessons: 4, lessonItems: [2, 1, 2, 1] },
  databases: { title: 'Databases', lessons: 3, lessonItems: [2, 2, 2] },
  'system-design': { title: 'System Design', lessons: 3, lessonItems: [2, 2, 2] },
  cybersecurity: { title: 'Cybersecurity', lessons: 3, lessonItems: [2, 2, 2] },
  docker: { title: 'Docker & Containers', lessons: 44, lessonItems: [8, 12, 20, 9, 11, 7, 10, 8, 11, 7, 8, 11] },
  kubernetes: { title: 'Kubernetes', lessons: 20, lessonItems: [9, 12, 6, 7, 6, 12] },
}

const courses = ref<CourseStat[]>([])
const overview = ref<CourseStat | null>(null)
const loaded = ref(false)

function readStore(raw: string | null): Store {
  if (!raw) return { done: {} }
  try {
    const p = JSON.parse(raw)
    if (p && typeof p === 'object' && 'done' in p) return p as Store
    if (p && typeof p === 'object') return { done: p as Record<number, boolean> }
  } catch {}
  return { done: {} }
}

function computeCourse(folder: string, totalItems: number): CourseStat {
  const prefix = 'devnotes:progress:' + folder + '/'
  let checked = 0
  let completedAt: number | undefined
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i)!
    if (k.startsWith(prefix) && !k.endsWith('/overview')) {
      const s = readStore(localStorage.getItem(k))
      checked += Object.values(s.done).filter(Boolean).length
      if (s.completedAt && (!completedAt || s.completedAt > completedAt)) {
        completedAt = s.completedAt
      }
    }
  }
  const pct = totalItems === 0 ? 0 : Math.round((checked / totalItems) * 100)
  return { key: folder, title: courseMeta[folder].title, checked, total: totalItems, pct, completedAt }
}

function refresh() {
  const stats: CourseStat[] = []
  let totalItems = 0
  let totalChecked = 0
  for (const [folder, meta] of Object.entries(courseMeta)) {
    const items = meta.lessonItems.reduce((a, b) => a + b, 0)
    const stat = computeCourse(folder, items)
    stats.push(stat)
    totalItems += items
    totalChecked += stat.checked
  }
  courses.value = stats.sort((a, b) => b.pct - a.pct)
  const pct = totalItems === 0 ? 0 : Math.round((totalChecked / totalItems) * 100)
  overview.value = {
    key: '__all__',
    title: 'All Courses',
    checked: totalChecked,
    total: totalItems,
    pct,
  }
  loaded.value = true
}

function fmtDate(ts?: number) {
  if (!ts) return ''
  return new Date(ts).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const route = useRoute()

function exportJson() {
  const data: Record<string, unknown> = {}
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i)!
    if (k.startsWith('devnotes:progress:')) {
      try {
        data[k] = JSON.parse(localStorage.getItem(k) || 'null')
      } catch {
        data[k] = localStorage.getItem(k)
      }
    }
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'devnotes-progress.json'
  a.click()
  URL.revokeObjectURL(url)
}

function importJson(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result))
      for (const [k, v] of Object.entries(parsed)) {
        if (k.startsWith('devnotes:progress:')) {
          localStorage.setItem(k, typeof v === 'string' ? v : JSON.stringify(v))
        }
      }
      refresh()
    } catch {
      alert('Invalid progress file.')
    }
  }
  reader.readAsText(file)
}

// ---- Confetti celebration ----
const celebrate = ref(false)
const celebrateText = ref('All courses complete! 🎉')
let canvas: HTMLCanvasElement | null = null
let raf = 0

function fireConfetti(label = 'All courses complete! 🎉') {
  celebrateText.value = label
  celebrate.value = true
  setTimeout(() => (celebrate.value = false), 2200)
  const c = document.createElement('canvas')
  c.className = 'gp-confetti'
  document.body.appendChild(c)
  canvas = c
  const ctx = c.getContext('2d')!
  c.width = window.innerWidth
  c.height = window.innerHeight
  const colors = ['#4f46e5', '#4338ca', '#06b6d4', '#f59e0b', '#f43f5e', '#22c55e']
  const parts = Array.from({ length: 140 }, () => ({
    x: Math.random() * c.width,
    y: -20 - Math.random() * c.height,
    r: 4 + Math.random() * 6,
    vy: 2 + Math.random() * 4,
    vx: -2 + Math.random() * 4,
    a: Math.random() * Math.PI,
    color: colors[(Math.random() * colors.length) | 0],
  }))
  const start = performance.now()
  const tick = (now: number) => {
    ctx.clearRect(0, 0, c.width, c.height)
    for (const p of parts) {
      p.y += p.vy
      p.x += p.vx
      p.a += 0.1
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.a)
      ctx.fillStyle = p.color
      ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 1.6)
      ctx.restore()
    }
    if (now - start < 2000 && canvas) raf = requestAnimationFrame(tick)
    else if (canvas) {
      canvas.remove()
      canvas = null
    }
  }
  raf = requestAnimationFrame(tick)
}

// Track previous percentages per course + overall to detect transitions to 100%.
const prevPct = ref<Record<string, number>>({})

function checkCelebrate() {
  const current: Record<string, number> = {}
  for (const c of courses.value) current[c.key] = c.pct
  if (overview.value) current.__all__ = overview.value.pct

  for (const [k, pct] of Object.entries(current)) {
    const wasFull = prevPct.value[k] === 100
    const nowFull = pct === 100
    if (nowFull && !wasFull) {
      const label =
        k === '__all__'
          ? 'All courses complete! 🎉'
          : (courses.value.find((c) => c.key === k)?.title || 'Course') + ' complete! 🎉'
      fireConfetti(label)
    }
  }
  prevPct.value = current
}

onMounted(() => {
  refresh()
  window.addEventListener('storage', refresh)
})

watch(
  () => route.path,
  () => refresh()
)

// re-evaluate celebration whenever stats change
watch(
  () => [overview.value?.pct, ...courses.value.map((c) => c.pct)],
  () => checkCelebrate(),
  { deep: true }
)

onBeforeUnmount(() => {
  window.removeEventListener('storage', refresh)
  if (raf) cancelAnimationFrame(raf)
  if (canvas) canvas.remove()
})

function linkFor(folder: string) {
  return '/courses/' + folder + '/'
}
</script>

<template>
  <div class="global-progress" v-if="loaded">
    <div v-if="overview" class="gp-overview">
      <div class="gp-overview-head">
        <span class="gp-title">Overall Progress</span>
        <span class="gp-pct">{{ overview.pct }}%</span>
      </div>
      <div class="gp-bar">
        <div class="gp-fill" :style="{ width: overview.pct + '%' }"></div>
      </div>
      <div class="gp-sub">
        {{ overview.checked }} / {{ overview.total }} lessons completed across {{ courses.length }} courses
      </div>
      <div class="gp-actions">
        <button class="gp-btn" @click="exportJson">⬇ Export progress</button>
        <label class="gp-btn">
          ⬆ Import progress
          <input type="file" accept=".json" @change="importJson" hidden />
        </label>
      </div>
    </div>

    <div class="gp-grid">
      <a
        v-for="c in courses"
        :key="c.key"
        class="gp-card"
        :href="linkFor(c.key)"
      >
        <div class="gp-card-head">
          <span class="gp-card-title">{{ c.title }}</span>
          <span class="gp-card-pct">{{ c.pct }}%</span>
        </div>
        <div class="gp-bar">
          <div class="gp-fill" :style="{ width: c.pct + '%' }"></div>
        </div>
        <div class="gp-card-foot">
          <span>{{ c.checked }}/{{ c.total }}</span>
          <span v-if="c.completedAt" class="gp-done">✓ {{ fmtDate(c.completedAt) }}</span>
        </div>
      </a>
    </div>

    <transition name="gp-pop">
      <div v-if="celebrate" class="gp-celebrate">{{ celebrateText }}</div>
    </transition>
  </div>
</template>

<style scoped>
.global-progress {
  margin: 1.5rem 0;
}
.gp-overview {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  padding: 18px 20px;
  margin-bottom: 1.2rem;
}
.gp-overview-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 10px;
}
.gp-title {
  font-weight: 700;
  font-size: 1rem;
}
.gp-pct {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--vp-c-brand-1);
  font-variant-numeric: tabular-nums;
}
.gp-sub {
  margin-top: 8px;
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
}
.gp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 12px;
}
.gp-card {
  display: block;
  text-decoration: none !important;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  padding: 14px 16px;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.gp-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 16px -8px rgba(79, 70, 229, 0.35);
}
.gp-card-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
}
.gp-card-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}
.gp-card-pct {
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--vp-c-brand-1);
  font-variant-numeric: tabular-nums;
}
.gp-bar {
  height: 8px;
  border-radius: 6px;
  background: var(--vp-c-divider);
  overflow: hidden;
}
.gp-fill {
  height: 100%;
  background: var(--vp-c-brand-1);
  transition: width 0.3s ease;
}
.gp-card-foot {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
  font-variant-numeric: tabular-nums;
}
.gp-done {
  color: var(--vp-c-brand-1);
  font-weight: 600;
}
.gp-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}
.gp-btn {
  cursor: pointer;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.82rem;
  padding: 6px 14px;
  border-radius: 8px;
  transition: border-color 0.15s, color 0.15s;
}
.gp-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.gp-confetti {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9999;
}
.gp-celebrate {
  position: fixed;
  top: 28%;
  left: 50%;
  transform: translateX(-50%);
  background: var(--vp-c-brand-1);
  color: #fff;
  font-weight: 800;
  font-size: 1.4rem;
  padding: 16px 28px;
  border-radius: 14px;
  box-shadow: 0 10px 30px -10px rgba(79, 70, 229, 0.6);
  z-index: 10000;
  pointer-events: none;
}
.gp-pop-enter-active,
.gp-pop-leave-active {
  transition: opacity 0.4s, transform 0.4s;
}
.gp-pop-enter-from,
.gp-pop-leave-to {
  opacity: 0;
  transform: translateX(-50%) scale(0.9);
}
</style>
