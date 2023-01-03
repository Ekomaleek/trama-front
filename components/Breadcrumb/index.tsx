import { useRouter } from 'next/router'
import { getBreadcrumbItems } from 'helpers/breadcrumb'

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

  const [isDesktop] = useMediaQuery('(min-width: 978px)')
  // if in mobile device, only renders last page visited
  const breadcrumbItems = isDesktop
    ? allBreadcrumbItems
    : [allBreadcrumbItems[allBreadcrumbItems.length - 2]]

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
        breadcrumbItems[0] !== undefined &&
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
              <BreadcrumbItem key={item.id}>
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
