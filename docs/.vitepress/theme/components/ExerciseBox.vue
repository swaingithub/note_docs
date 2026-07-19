<script setup lang="ts">
// ExerciseBox: a W3Schools-style exercise / self-check card.
defineProps<{ title?: string; difficulty?: 'Easy' | 'Medium' | 'Hard' }>()
</script>

<template>
  <div class="ex">
    <div class="ex-head">
      <span class="ex-ico">✎</span>
      <span class="ex-title">{{ title || 'Exercise' }}</span>
      <span class="ex-diff" :class="'ex-' + (difficulty || 'Easy').toLowerCase()">{{
        difficulty || 'Easy'
      }}</span>
    </div>
    <div class="ex-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.ex {
  margin: 1.3rem 0;
  border: 1px solid var(--vp-c-divider);
  border-left: 4px solid #f59e0b;
  border-radius: 10px;
  background: color-mix(in srgb, #f59e0b 6%, var(--vp-c-bg));
  overflow: hidden;
}
.ex-head {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: color-mix(in srgb, #f59e0b 10%, var(--vp-c-bg-soft));
}
.ex-ico {
  color: #f59e0b;
}
.ex-title {
  font-weight: 700;
  font-size: 0.85rem;
  color: #b45309;
}
.ex-diff {
  margin-left: auto;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 2px 9px;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
.ex-easy {
  background: #dcfce7;
  color: #166534;
}
.ex-medium {
  background: #fef3c7;
  color: #92400e;
}
.ex-hard {
  background: #fee2e2;
  color: #991b1b;
}
.ex-body {
  padding: 12px 16px;
  font-size: 0.9rem;
}
.ex-body :deep(p) {
  margin: 0.4rem 0;
}
.ex-body :deep(code) {
  font-weight: 600;
}
</style>
