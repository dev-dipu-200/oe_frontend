// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "HR Onboarding & Exit Management System",
      htmlAttrs: {
        lang: "en",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  srcDir: "./src",
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxt/icon"          // ← Added for Icon component
  ],

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || "http://0.0.0.0:8000",
    },
  },

  // Fix for <Icon> component warning
  vue: {
    compilerOptions: {
      isCustomElement: (tag: string) => ['icon', 'Icon'].includes(tag)
    }
  },

  vite: {
    optimizeDeps: {
      include: [
        "pinia-plugin-persistedstate",
        "vue3-toastify",
        "@iconify/vue"
      ],
    },

    server: {
      allowedHosts: true,
      watch: {
        usePolling: true,
      },
    },
  },

  devServer: {
    host: "0.0.0.0",
    port: 3000,
  },

  // Icon module configuration
  icon: {
    serverBundle: 'remote',   // Best for performance
  },
})