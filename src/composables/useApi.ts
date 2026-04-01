import { useToastStore } from '@/stores/toast'

/**
 * Interface for API call options.
 */
interface ApiOptions {
  /**
   * Query parameters to be appended to the URL.
   */
  params?: Record<string, any>;
  /**
   * HTTP method for the request (e.g., 'GET', 'POST', 'PUT', 'DELETE').
   * Defaults to 'GET'.
   */
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  /**
   * Request body for 'POST', 'PUT', 'PATCH' requests.
   */
  body?: Record<string, any> | string;
  // Add other fetch options as needed, e.g., headers
}

/**
 * A composable for making API calls in Nuxt applications.
 * It encapsulates base URL resolution, error handling, and toast notifications.
 *
 * @returns A function `call` that can be used to make API requests.
 */
export function useApi() {
  const toastStore = useToastStore()
  const baseUrl = useRuntimeConfig().public.apiBaseUrl

  if (!baseUrl) {
    console.error('NUXT_PUBLIC_API_BASE_URL is not defined in runtime config.')
    toastStore.addToast({
      message: 'API base URL is not configured.',
      type: 'error',
    })
    // Return a dummy function to prevent errors if base URL is missing
    return {
      call: async <T>(endpoint: string, options?: ApiOptions): Promise<T | null> => {
        return null;
      }
    }
  }

  /**
   * Makes an API call to a specified endpoint.
   *
   * @param endpoint The API endpoint (e.g., 'tasks', 'auth/login').
   * @param options Optional configuration for the API call.
   * @returns A Promise that resolves with the API response data, or null if an error occurs.
   */
  const call = async <T>(endpoint: string, options: ApiOptions = {}): Promise<T | null> => {
    try {
      const url = `${baseUrl}/${endpoint}`
      console.log(`Calling API: ${url} with method: ${options.method || 'GET'} and params:`, options.params); // For debugging
      const response = await $fetch<T>(url, {
        method: options.method || 'GET',
        params: options.params,
        body: options.body,
        // Add other fetch options here (e.g., headers)
      })
      return response
    } catch (error: any) {
      console.error(`API call to ${endpoint} failed:`, error)
      toastStore.addToast({
        message: error.data?.message || error.message || `Failed to fetch data from ${endpoint}`,
        type: 'error',
      })
      return null
    }
  }

  return {
    call
  }
}
