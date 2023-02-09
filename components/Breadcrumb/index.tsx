import { useRouter } from 'next/router'

import { getBreadcrumbItems } from 'helpers/breadcrumb'
import { breakpoints } from 'theme'

import NavbarLink from 'components/_core/NavbarLink'
import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  useMediaQuery,
} from '@chakra-ui/react'

const BreadcrumbComponent = (): JSX.Element => {
  const router = useRouter()
  const allBreadcrumbItems = getBreadcrumbItems(router)

  const [isDesktop] = useMediaQuery(`(min-width: ${breakpoints.md})`)

  // In a mobile device, only renders the last visited page.
  const breadcrumbItems = isDesktop
    ? allBreadcrumbItems
    : [allBreadcrumbItems[allBreadcrumbItems.length - 2]]

  const shouldBreadcrumbRender = breadcrumbItems[0] !== undefined

  return (
    <Flex
      as='nav'
      mt='navbarHeight'
      px='8'
      py='4'
      alignSelf='flex-start'
      alignItems='baseline'
    >
      {
        shouldBreadcrumbRender &&
        <>
          <Text
            mr='4'
            fontSize='sm'
            whiteSpace='nowrap'
          >
            { isDesktop ? 'Você está aqui: ' : 'Voltar para: ' }
          </Text>
          <Breadcrumb
            separator='>'
            fontWeight='bold'
            fontSize='sm'
          >
            {breadcrumbItems.map(item =>
              <BreadcrumbItem
                key={item.id}
                alignItems='baseline'
              >
                <BreadcrumbLink
                  as={NavbarLink}
                  href={item.url}
                  m='0'
                  fontSize='sm'
                  _hover={{
                    textDecoration: 'none',
                  }}
                >
                  {item.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            )}
          </Breadcrumb>
        </>
      }
    </Flex>
  )
}

export default BreadcrumbComponent
