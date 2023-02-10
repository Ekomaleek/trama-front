type BreadcrumbItem = {
  id: number
  name: string
  url: string
}

type BreadcrumbDictionary = {
  [key: string]: string
}

const actions = ['create', 'update']
const breadcrumbDictionary: BreadcrumbDictionary = {
  '/': 'Home',
  '/categories': 'Categorias',
  '/categories/id': 'Visualizar categoria',
  '/categories/create': 'Criar categoria',
  '/categories/update/id': 'Editar categoria',
  '/records': 'Registros',
  '/records/id': 'Visualizar registro',
  '/records/create': 'Criar registro',
  '/records/update/id': 'Editar registro',
  '/profile': 'Visualizar perfil',
  '/login': 'Login',
  '/signup': 'Cadastro',
  '/forgot-password': 'Recuperação de senha',
}

const resolveItemName = (url: string): string => {
  const urlGenericId = url.replace(/(\d+)/g, 'id')
  const keyOnDict = Object.keys(breadcrumbDictionary).find(dictEntry => dictEntry === urlGenericId)

  const name = keyOnDict !== undefined
    ? breadcrumbDictionary[keyOnDict]
    : 'Não encontrado'

  return name
}

const resolveItemUrl = (pathItems: string[], index: number): string => {
  if (index === 0) return '/'

  // Checks whether the next pathItem is a number (an id) and the current
  // is an action. If so, skip this item.
  const nextItem = pathItems[index + 1]
  if (
    !isNaN(parseInt(nextItem)) &&
    actions.includes(pathItems[index])
  ) return ''

  const currentItems = pathItems.slice(0, index + 1)
  return currentItems.join('/')
}

// Both pathname and pathnameFromBrowser are necessary because if only
// pathnameFromBrowser is used, server and client renders are different
// and that results in a hydration error. If only pathname is used,
// we dont have access to url params and therefore cannot correctly map
// urls that contain ids, for example.
// https://nextjs.org/docs/api-reference/next/router#router-object
type GetBreadcrumbItemsArgs = {
  pathname: string
  pathnameFromBrowser: string
}
const getBreadcrumbItems = ({
  pathname,
  pathnameFromBrowser,
}: GetBreadcrumbItemsArgs): BreadcrumbItem[] => {
  if (pathname === '/404') return [{ id: 0, name: '404', url: '/404' }]

  // Generates an array like ['', 'records', 'update', '13']
  const pathItems = pathnameFromBrowser === '/'
    ? ['']
    : pathnameFromBrowser.split('/')

  const breadcrumbItems = pathItems.map((_, index) => {
    const url = resolveItemUrl(pathItems, index)
    const name = resolveItemName(url)

    return {
      id: index,
      name,
      url,
    }
  })

  return breadcrumbItems.filter(item => item.name !== 'Não encontrado')
}

export { getBreadcrumbItems }
