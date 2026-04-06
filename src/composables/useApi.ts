import { useAuthStore } from "@/stores/auth";

export function useApi() {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();

  const call = async <T>(
    endpoint: string,
    options: {
      method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
      params?: Record<string, any>;
      body?: any;
      headers?: Record<string, string>;
      token?: string | null;
      onError?: (err: any) => void;
      skipAuth?: boolean;
    } = {},
  ): Promise<T | null> => {
    try {
      const baseUrl = config.public.apiBaseUrl;

      if (!baseUrl) {
        throw new Error("API base URL not configured");
      }

      const cleanBaseUrl = baseUrl.endsWith("/")
        ? baseUrl.slice(0, -1)
        : baseUrl;

      const cleanEndpoint = endpoint.startsWith("/")
        ? endpoint.slice(1)
        : endpoint;

      const url = `${cleanBaseUrl}/${cleanEndpoint}`;

      const headers: Record<string, string> = {
        ...options.headers,
      };

      // Add authorization token if available and not skipped
      const token =
        options.token !== undefined ? options.token : authStore.token;
      if (token && !options.skipAuth) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await $fetch<T>(url, {
        method: options.method || "GET",
        params: options.params,
        body: options.body,
        headers,
      });

      return response;
    } catch (error: any) {
      console.error(`API error [${endpoint}]:`, error);

      // Handle 401 Unauthorized
      if (error.status === 401 || error.response?.status === 401) {
        console.warn("Unauthorized access - redirecting to login");
        authStore.clearAuth();
        
        // Clear cookies manually if clearAuth doesn't handle them all
        const authCookie = useCookie("auth_token");
        const userCookie = useCookie("auth_user");
        authCookie.value = null;
        userCookie.value = null;

        // Redirect to login
        navigateTo("/login");
      }

      if (options.onError) {
        options.onError(error);
      }

      return null;
    }
  };

  return { call };
}
