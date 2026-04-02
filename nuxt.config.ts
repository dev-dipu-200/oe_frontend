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

  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss"],

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || "http://0.0.0.0:8000",
    },
  },
  vite: {
    optimizeDeps: {
      include: ["pinia-plugin-persistedstate", "vue3-toastify", "@iconify/vue"],
    },

    server: {
      allowedHosts: true,
      watch: {
        usePolling: false,
      },
    },
  },

  devServer: {
    host: "0.0.0.0",
    port: 3000,
  },
})
