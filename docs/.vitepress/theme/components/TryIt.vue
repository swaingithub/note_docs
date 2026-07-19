<script setup lang="ts">
// TryIt: wraps the Playground in a W3Schools-style "Try it yourself" card.
const props = defineProps<{ lang?: string; code?: string; title?: string }>()
</script>

<template>
  <div class="tryit">
    <div class="tryit-head">
      <span class="tryit-ico">▶</span>
      <span class="tryit-title">{{ title || 'Try it yourself' }}</span>
      <span class="tryit-hint">Runs in your browser</span>
    </div>
    <Playground :lang="lang || 'js'" :code="code" />
  </div>
</template>

<style scoped>
.tryit {
  margin: 1.3rem 0;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 12px;
  overflow: hidden;
  background: var(--vp-c-bg);
}
.tryit-head {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 14px;
  background: var(--vp-c-brand-1);
  color: #fff;
}
.tryit-ico {
  font-size: 0.8rem;
}
.tryit-title {
  font-weight: 700;
  font-size: 0.85rem;
}
.tryit-hint {
  margin-left: auto;
  font-size: 0.72rem;
  opacity: 0.85;
}
</style>
