<script setup>
import { ref, watch, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import { getSiteContent } from '@/content'

const { locale } = useI18n()

const ready = ref(false)
const content = ref(null)

// Reload content whenever the locale changes. `getSiteContent` is async so this
// already behaves correctly when content moves to a CMS behind the same call.
watch(
  locale,
  async (current) => {
    content.value = await getSiteContent(current)
    requestAnimationFrame(() => {
      ready.value = true
    })
  },
  { immediate: true },
)

// Keep the document title in sync with the localized content.
watchEffect(() => {
  if (content.value?.meta?.title) {
    document.title = content.value.meta.title
  }
})
</script>

<template>
  <div class="layout" :class="{ 'is-ready': ready }">
    <header class="layout__header">
      <LanguageSwitcher />
    </header>

    <main v-if="content" class="landing">
      <h1 class="landing__title">{{ content.hero.title }}</h1>
    </main>

    <SiteFooter />
  </div>
</template>

<style scoped>
.layout {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 2rem 2rem;
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 1.1s ease,
    transform 1.1s ease;
}

.layout.is-ready {
  opacity: 1;
  transform: translateY(0);
}

.layout__header {
  display: flex;
  justify-content: flex-end;
}

.landing {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.landing__title {
  font-size: clamp(3rem, 14vw, 9rem);
  font-weight: 500;
  line-height: 1;
  margin: 0;
  letter-spacing: -0.01em;
  text-transform: uppercase;
}
</style>
