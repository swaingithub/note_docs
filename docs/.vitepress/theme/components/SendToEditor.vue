<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()
const msg = ref('')

function send() {
  try {
    const blocks = Array.from(document.querySelectorAll('.vp-doc pre code')).map(
      (el) => '```\n' + (el.textContent || '') + '\n```'
    )
    const heading = document.querySelector('.vp-doc h1')?.textContent || route.path
    const md = `# ${heading}\n\nExported code from this page.\n\n` + blocks.join('\n\n')
    localStorage.setItem('devnotes:editor:exported', md)
    msg.value = 'Sent! Opening Live Editor…'
    window.location.href = '/editor?doc=exported'
  } catch {
    msg.value = 'Could not read code blocks.'
  }
}
</script>

<template>
  <div class="ste">
    <button class="ste-btn" @click="send" title="Send all code blocks on this page to the Live Editor">
      ✎ Send code to Live Editor
    </button>
    <span v-if="msg" class="ste-msg">{{ msg }}</span>
  </div>
</template>

<style scoped>
.ste {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: 0.4rem 0 1rem;
}
.ste-btn {
  cursor: pointer;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.8rem;
  padding: 5px 12px;
  border-radius: 8px;
  transition: all 0.15s;
}
.ste-btn:hover { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }
.ste-msg { font-size: 0.76rem; color: var(--vp-c-text-2); }
</style>
