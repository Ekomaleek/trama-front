interface BreadcrumbItem {
  id: number
  name: string
  url: string
}

interface BreadcrumbDictionary {
  [key: string]: string
}

const breadcrumbDictionary: BreadcrumbDictionary = {
  '': 'Home',
  categories: 'Categorias',
  update: 'Editar categoria',
  create: 'Criar categoria',
}

const resolveItemName = (path: string): string => {
  const pathKeyOnDict = Object.keys(breadcrumbDictionary).find(entry => entry === path)
  const name = pathKeyOnDict !== undefined
    ? breadcrumbDictionary[pathKeyOnDict]
    : 'Não encontrado'

  return name
}

const resolveItemUrl = (pathItems: string[], indexToEnd: number): string => {
  let url: string = ''
  let i: number = 0

  // Checks whether the next pathItem is a number (an id).
  // If so, appends it to url
  while (i <= indexToEnd) {
    if (!isNaN(parseInt(pathItems[i + 1]))) {
      url += pathItems[i] + '/' + pathItems[i + 1]
    } else {
      url += pathItems[i] + '/'
    }

    i = i + 1
  }

  return url
}

const getBreadcrumbItems = (pathname: string): BreadcrumbItem[] => {
  const pathItems = pathname === '/'
    ? ['']
    : pathname.split('/')

  const breadcrumbItems = pathItems.map((path, index) => {
    const name = resolveItemName(path)
    const url = resolveItemUrl(pathItems, index)

    return {
      id: index,
      name,
      url,
    }
  })

  return breadcrumbItems.filter(item => item.name !== 'Não encontrado')
}

export { getBreadcrumbItems }
