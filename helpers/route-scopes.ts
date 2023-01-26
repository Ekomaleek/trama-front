type RouteScopedFor =
  'allUsers' |
  'notLoggedInUsers' |
  'loggedInUsers'

type RouteScopes = {
  [key in RouteScopedFor]: string[]
}

const routeScopes: RouteScopes = {
  allUsers: [],
  notLoggedInUsers: [
    '/signup',
    '/login',
    '/forgot-password',
    '/forgot-password/confirm-new-password',
  ],
  loggedInUsers: [
    '/categories',
    '/records',
    '/dashboard',
    '/profile',
  ],
}

const getCurrentScope = (pathname: string): RouteScopedFor | null => {
  if (pathname === '/') return 'notLoggedInUsers'

  let key: RouteScopedFor
  for (key in routeScopes) {
    if (routeScopes[key].find(path => pathname.startsWith(path)) !== undefined) {
      return key
    }
  }

  return null
}

export { getCurrentScope }
export type { RouteScopedFor }
