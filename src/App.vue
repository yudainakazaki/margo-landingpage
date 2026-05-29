<script setup>
import { ref, onMounted } from 'vue'
import SiteFooter from '@/components/SiteFooter.vue'

// Placeholder landing state. Replace with real content once the design is in.
const ready = ref(false)

onMounted(() => {
  // Small mount delay so the intro fade reads as intentional, not a flash.
  requestAnimationFrame(() => {
    ready.value = true
  })
})
</script>

<template>
  <main class="landing" :class="{ 'is-ready': ready }">
    <div class="landing__inner">
      <p class="landing__eyebrow">Art Project</p>
      <h1 class="landing__title">Margo</h1>
      <p class="landing__tagline">Coming soon.</p>
    </div>
    <SiteFooter />
  </main>
</template>

<style scoped>
.landing {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 1.1s ease,
    transform 1.1s ease;
}

.landing.is-ready {
  opacity: 1;
  transform: translateY(0);
}

.landing__inner {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.landing__eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.4em;
  font-size: 0.75rem;
  color: var(--color-muted);
  margin: 0 0 1.5rem;
}

.landing__title {
  font-size: clamp(3rem, 14vw, 9rem);
  font-weight: 500;
  line-height: 1;
  margin: 0;
  letter-spacing: -0.02em;
}

.landing__tagline {
  margin: 1.5rem 0 0;
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: var(--color-muted);
}
</style>
