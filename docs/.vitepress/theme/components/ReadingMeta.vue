<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useData } from 'vitepress'

const props = defineProps<{ words?: number }>()

const { content } = useData()
const progress = ref(0)

function onScroll() {
  const el = document.documentElement
  const max = el.scrollHeight - el.clientHeight
  progress.value = max > 0 ? Math.min(100, Math.round((el.scrollTop / max) * 100)) : 0
}

const words = computed(() => {
  if (props.words) return props.words
  const text = (content.value || '').replace(/[#>*_`\-]/g, ' ').replace(/<[^>]+>/g, ' ')
  return text.split(/\s+/).filter(Boolean).length
})
const minutes = computed(() => Math.max(1, Math.round(words.value / 200)))

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <div class="rm">
    <div class="rm-bar">
      <div class="rm-fill" :style="{ width: progress + '%' }"></div>
    </div>
    <div class="rm-meta">☰ {{ minutes }} min read · {{ words }} words</div>
  </div>
</template>

<style scoped>
.rm {
  margin: 0 0 1rem;
}
.rm-bar {
  position: sticky;
  top: 0;
  height: 3px;
  border-radius: 3px;
  background: var(--vp-c-divider);
  overflow: hidden;
  z-index: 5;
}
.rm-fill {
  height: 100%;
  background: var(--vp-c-brand-1);
  transition: width 0.1s linear;
}
.rm-meta {
  margin-top: 6px;
  font-size: 0.76rem;
  color: var(--vp-c-text-2);
  font-variant-numeric: tabular-nums;
}
</style>
