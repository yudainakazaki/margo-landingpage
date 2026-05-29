<script setup>
import { useI18n } from 'vue-i18n'
import { SUPPORTED_LOCALES } from '@/i18n/config'
import { setLocale } from '@/i18n'

const { t, locale } = useI18n()
</script>

<template>
  <nav class="lang" :aria-label="t('a11y.languageSwitcher')">
    <ul class="lang__list">
      <li v-for="(item, index) in SUPPORTED_LOCALES" :key="item.code">
        <button
          type="button"
          class="lang__btn"
          :class="{ 'is-active': locale === item.code }"
          :aria-current="locale === item.code ? 'true' : undefined"
          @click="setLocale(item.code)"
        >
          {{ item.name }}
        </button>
        <span v-if="index < SUPPORTED_LOCALES.length - 1" class="lang__sep">
          /
        </span>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.lang__list {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.lang__list li {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.lang__btn {
  appearance: none;
  background: none;
  border: 0;
  padding: 0.25rem;
  cursor: pointer;
  font: inherit;
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  color: var(--color-muted);
  transition: color 0.3s ease;
}

.lang__btn:hover,
.lang__btn:focus-visible {
  color: var(--color-fg);
}

.lang__btn.is-active {
  color: var(--color-fg);
}

.lang__sep {
  color: var(--color-muted);
  opacity: 0.5;
  user-select: none;
}
</style>
