import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // Served from the root in every environment:
  //   - GitHub Pages *user* site:   https://yudainakazaki.github.io/
  //   - Custom domain (later):      https://2bcdef4hijkl1n5pq3stuvwxyz.jp/
  // So base stays '/'. (A GitHub Pages *project* site would instead need
  // base '/<repo>/', which is exactly the subpath hassle we're avoiding.)
  base: '/',
})
