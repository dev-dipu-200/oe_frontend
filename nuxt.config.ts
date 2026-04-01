// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Nuxt',
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },
  srcDir: './src',
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  vite: {
    optimizeDeps: {
      include: [
        'pinia-plugin-persistedstate',
        'vue3-toastify',
      ]
    },
    server: {
    allowedHosts: [
      'upturned-designed-juliette.ngrok-free.dev'
    ],
    hmr: {
      protocol: 'wss',
      clientPort: 443 
    }
  }
  }
})
