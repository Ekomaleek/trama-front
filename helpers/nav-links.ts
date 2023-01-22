import { RouteScopedFor } from './route-scopes'

type NavLink = {
  id: number
  name: string
  url: string
}

type NavLinks = {
  [key in RouteScopedFor]: NavLink[]
}

const navLinks: NavLinks = {
  allUsers: [
    {
      id: 1,
      name: 'Home',
      url: '/',
    },
  ],
  notLoggedInUsers: [
    {
      id: 6,
      name: 'Login',
      url: '/login',
    },
    {
      id: 7,
      name: 'Signup',
      url: '/signup',
    },
  ],
  loggedInUsers: [
    {
      id: 2,
      name: 'Categorias',
      url: '/categories',
    },
    {
      id: 3,
      name: 'Registros',
      url: '/records',
    },
  ],
}

export default navLinks
