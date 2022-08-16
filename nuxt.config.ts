import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  nitro: {
    preset: 'netlify'
  },
  modules: [
    '@nuxt/content',
  ],
  components: {
    global: true,
    dirs: ['~/components'],
  },
  content: {
    // https://content.nuxtjs.org/api/configuration
  },
  css: [
    '@/assets/main.css',
  ]
})
