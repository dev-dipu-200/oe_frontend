export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()
  const authCookie = useCookie<string | null>('auth_token')

  const publicRoutes = ['/login', '/register', '/forgot-password', '/reset-password']

  const isPublicRoute = publicRoutes.some(
    route => to.path === route || to.path.startsWith(route + '/')
  )

  // ✅ Initialize auth (SSR safe)
  if (!authStore.isInitialized) {
    if (authCookie.value) {
      authStore.token = authCookie.value

      const { call } = useApi()
      await authStore.fetchUser(call)
    }
    authStore.isInitialized = true
  }

  const isLoggedIn = !!authStore.token && !!authStore.user?.role
  const userRole = authStore.user?.role

  // ❌ Not logged in
  if (!isLoggedIn && !isPublicRoute) {
    return navigateTo('/login')
  }

  // ❌ Already logged in
  if (isLoggedIn && isPublicRoute) {
    return navigateTo(getDashboardRoute(userRole))
  }

  // 🔐 Role protection
  if (isLoggedIn && to.path.startsWith('/super-admin') && userRole !== 'SUPER_ADMIN') {
    return navigateTo(getDashboardRoute(userRole))
  }

  // 🎨 Layout control
  setPageLayout(isPublicRoute ? 'auth' : 'default')
})

function getDashboardRoute(role: string | undefined): string {
  switch (role) {
    case 'SUPER_ADMIN':
      return '/super-admin/dashboard'
    case 'ADMIN':
      return '/admin/dashboard'
    case 'HR':
      return '/hr/dashboard'
    case 'MANAGER':
      return '/manager/dashboard'
    case 'NETWORK':
      return '/network/dashboard'
    case 'UIUX_DESIGNER':
      return '/uiux/dashboard'
    default:
      return '/'
  }
}