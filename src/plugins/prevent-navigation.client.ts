/**
 * Plugin to prevent browser back button and reload
 * This runs only on client side
 */

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    const router = useRouter()
    
    const mainDashboards = {
      'SUPER_ADMIN': '/super-admin/dashboard',
      'ADMIN': '/admin/dashboard',
      'HR': '/hr/dashboard',
      'MANAGER': '/manager/dashboard',
      'NETWORK': '/network/dashboard',
      'UIUX_DESIGNER': '/uiux/dashboard',
      'EMPLOYEE': '/employee/dashboard'
    } as const
    
    type UserRole = keyof typeof mainDashboards
    
    const publicRoutes = ['/login', '/register', '/forgot-password', '/reset-password']

    const preventBackNavigation = (event: PopStateEvent) => {
      const authStore = useAuthStore()
      const isLoggedIn = !!authStore.token
      
      if (isLoggedIn) {
        const targetPath = window.location.pathname
        const isPublicRoute = publicRoutes.some(route => targetPath.startsWith(route))
        
        if (isPublicRoute) {
          event.preventDefault()
          const userRole = authStore.user?.role as UserRole | undefined
          const mainDashboard = userRole && mainDashboards[userRole] ? mainDashboards[userRole] : '/'
          router.push(mainDashboard)
          return
        }
      }
    }
    
    const preventUnload = (_event: BeforeUnloadEvent) => {}
    
    window.addEventListener('popstate', preventBackNavigation)
    window.addEventListener('beforeunload', preventUnload)
    
    if (window.history.state) {
      window.history.replaceState({ ...window.history.state, preventBack: true }, '')
    }
    
    router.beforeEach((to) => {
      const authStore = useAuthStore()
      const isLoggedIn = !!authStore.token
      
      const isPublicRoute = publicRoutes.some(route => to.path.startsWith(route))
      
      if (isLoggedIn && isPublicRoute) {
        const userRole = authStore.user?.role as UserRole | undefined
        const mainDashboard = userRole && mainDashboards[userRole] ? mainDashboards[userRole] : '/'
        return mainDashboard
      }
    })
    
    const { onUnmounted } = nuxtApp.vueApp._context.provides
    if (onUnmounted) {
      onUnmounted(() => {
        window.removeEventListener('popstate', preventBackNavigation)
        window.removeEventListener('beforeunload', preventUnload)
      })
    }
  }
})
