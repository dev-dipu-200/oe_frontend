import { config } from "dotenv"

// 🔥 Detect environment
const env = process.env.NUXT_ENV || "dev"

// 🔥 Load correct env file
config({ path: `.env.${env}` })

const isDev = env === "dev"
const isProd = env === "prod"

// 🔥 Dynamic port
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

  // ✅ Devtools only in dev
  devtools: { enabled: isDev },

  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxt/icon"
  ],

  runtimeConfig: {
    public: {
      // ✅ NO 0.0.0.0 anymore
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || ""
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

      // ✅ HMR only in DEV
      hmr: isDev
        ? {
            host: "onboarding-exit-ui.devtrust.biz",
            protocol: "wss",
            clientPort: 443,
            port
          }
        : false,
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