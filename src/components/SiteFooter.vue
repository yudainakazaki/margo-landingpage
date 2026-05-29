<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <small class="footer__text">&copy; {{ year }} Margo</small>
  </footer>
</template>

<style scoped>
.footer {
  padding: 2rem 0 0;
}

.footer__text {
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: var(--color-muted);
}
</style>
