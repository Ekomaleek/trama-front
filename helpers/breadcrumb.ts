import { NextRouter } from 'next/router'

interface BreadcrumbItem {
  id: number
  name: string
  url: string
}

interface BreadcrumbDictionary {
  [key: string]: string
}

const breadcrumbDictionary: BreadcrumbDictionary = {
  '/': 'Home',
  '/categories': 'Categorias',
  '/categories/create': 'Criar categoria',
  '/categories/update': 'Editar categoria',
  '/records': 'Registros',
  '/records/create': 'Criar registro',
  '/records/update': 'Editar registro',
}

const resolveItemName = (url: string): string => {
  const urlWithoutId = url.replace(/\/(\d+)/g, '')
  const keyOnDict = Object.keys(breadcrumbDictionary).find(dictEntry => dictEntry === urlWithoutId)

  const name = keyOnDict !== undefined
    ? breadcrumbDictionary[keyOnDict]
    : 'Não encontrado'

  return name
}

const resolveItemUrl = (pathItems: string[], index: number): string => {
  if (index === 0) return '/'

  // Checks whether the next pathItem is a number (an id).
  // If so, skip this item
  const nextItem = pathItems[index + 1]
  if (!isNaN(parseInt(nextItem))) return ''

  const currentItems = pathItems.slice(0, index + 1)
  return currentItems.join('/')
}

const getBreadcrumbItems = (router: NextRouter): BreadcrumbItem[] => {
  if (router.pathname === '/404') return [{ id: 0, name: '404', url: '/404' }]

  const pathItems = router.asPath === '/'
    ? ['']
    : router.asPath.split('/')

  const breadcrumbItems = pathItems.map((path, index) => {
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
