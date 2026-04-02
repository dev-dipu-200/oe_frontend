export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()

  const publicRoutes = ['/login', '/register', '/forgot-password', '/reset-password']

  const isPublicRoute = publicRoutes.some(
    route => to.path === route || to.path.startsWith(route + '/')
  )

  setPageLayout(isPublicRoute ? 'auth' : 'default')

  await authStore.initialize()

  const isLoggedIn = !!authStore.token && !!authStore.user?.role
  const userRole = authStore.user?.role

  if (!isLoggedIn && !isPublicRoute) {
    return navigateTo('/login')
  }

  if (isLoggedIn && isPublicRoute) {
    return navigateTo(getDashboardRoute(userRole))
  }

  if (isLoggedIn && to.path.startsWith('/super-admin') && userRole !== 'SUPER_ADMIN') {
    return navigateTo(getDashboardRoute(userRole))
  }
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
