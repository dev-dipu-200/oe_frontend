// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Nuxt",
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
      // Allow your ngrok domain (and all hosts in dev)
      allowedHosts: true,                    // Best for ngrok / custom domains in recent Vite
      // allowedHosts: ["upturned-designed-juliette.ngrok-free.dev"], // Alternative if you prefer specific

      hmr: {
        protocol: "wss",
        clientPort: 443,                     // Important when accessing via https ngrok (port 443)
        // host: "upturned-designed-juliette.ngrok-free.dev", // Uncomment only if still having issues
      },

      watch: {
        usePolling: false,                   // Keep false unless you're in Docker/WSL
      },
    },
  },

  devServer: {
    host: "0.0.0.0",
    port: 3000,
  },
  // === End of fixes ===
})