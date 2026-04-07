import { config } from "dotenv"

const env = process.env.NUXT_ENV || "dev"

config({ path: `.env.${env}` })

const isDev = env === "dev"
const isProd = env === "prod"

const port = Number(process.env.PORT) || 3000

export default defineNuxtConfig({
  app: {
    head: {
      title: "HR Onboarding & Exit Management System",
      htmlAttrs: { lang: "en" },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  srcDir: "./src",
  compatibilityDate: "2025-07-15",

  devtools: { enabled: isDev },

  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxt/icon"
  ],

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NODE_ENV === 'dev'
        ? '/api'
        : (process.env.NUXT_PUBLIC_API_BASE_URL || "")
    },
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag: string) => ["icon", "Icon"].includes(tag),
    },
  },

  vite: {
    optimizeDeps: {
      include: [
        "pinia-plugin-persistedstate",
        "vue3-toastify",
        "@iconify/vue",
      ],
    },

    server: {
      host: "0.0.0.0",
      port,

      allowedHosts: true,

      watch: {
        usePolling: true,
      },
      proxy: {
        '/api': {
          target: 'https://onboarding-exit-api.devtrust.biz',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  },

  devServer: {
    host: "0.0.0.0",
    port,
  },

  icon: {
    serverBundle: "remote",
  },
})