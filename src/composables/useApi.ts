export function useApi() {
  const config = useRuntimeConfig()
  const call = async <T>(
    endpoint: string,
    options: {
      method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
      params?: Record<string, any>
      body?: any
      headers?: Record<string, string>
      token?: string | null   
      onError?: (err: any) => void 
    } = {}
  ): Promise<T | null> => {
    try {
      const baseUrl = config.public.apiBaseUrl

      if (!baseUrl) {
        throw new Error('API base URL not configured')
      }

      const cleanBaseUrl = baseUrl.endsWith('/')
        ? baseUrl.slice(0, -1)
        : baseUrl

      const cleanEndpoint = endpoint.startsWith('/')
        ? endpoint.slice(1)
        : endpoint

      const url = `${cleanBaseUrl}/${cleanEndpoint}`

      const headers: Record<string, string> = {
        ...options.headers,
      }

      if (options.token) {
        headers['Authorization'] = `Bearer ${options.token}`
      }

      const response = await $fetch<T>(url, {
        method: options.method || 'GET',
        params: options.params,
        body: options.body,
        headers,
      })

      return response
    } catch (error: any) {
      console.error(`API error [${endpoint}]:`, error)

      if (options.onError) {
        options.onError(error)
      }

      return null
    }
  }

  return { call }
}