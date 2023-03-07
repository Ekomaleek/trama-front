import { getBreadcrumbItems } from 'helpers/breadcrumb'

describe('Breadcrumb component test', () => {
  test('Should render correct BreadcrumbItems for given url', () => {
    let breadcrumbItems

    // Home
    breadcrumbItems = getBreadcrumbItems({
      pathname: '/',
      pathnameFromBrowser: '/',
    })
    expect(breadcrumbItems).toEqual([
      {
        id: 0,
        name: 'Home',
        url: '/',
      },
    ])

    // Login
    breadcrumbItems = getBreadcrumbItems({
      pathname: '/login',
      pathnameFromBrowser: '/login',
    })
    expect(breadcrumbItems).toEqual([
      {
        id: 0,
        name: 'Home',
        url: '/',
      },
      {
        id: 1,
        name: 'Login',
        url: '/login',
      },
    ])

    // With id and action
    breadcrumbItems = getBreadcrumbItems({
      pathname: '/records/update/11',
      pathnameFromBrowser: '/records/update/11',
    })
    expect(breadcrumbItems).toEqual([
      {
        id: 0,
        name: 'Home',
        url: '/',
      },
      {
        id: 1,
        name: 'Registros',
        url: '/records',
      },
      {
        id: 2,
        name: 'Editar registro',
        url: '/records/update/11',
      },
    ])

    // 404
    breadcrumbItems = getBreadcrumbItems({
      pathname: '/404',
      pathnameFromBrowser: '/404',
    })
    expect(breadcrumbItems).toEqual([
      {
        id: 0,
        name: '404',
        url: '/404',
      },
    ])
  })
})
