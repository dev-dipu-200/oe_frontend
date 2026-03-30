import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin((nuxtApp) => {
  // @ts-expect-error $pinia may not be typed
  const pinia = nuxtApp.$pinia
  if (pinia) {
    pinia.use(piniaPluginPersistedstate)
  }
})