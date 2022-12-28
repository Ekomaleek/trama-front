import { useRouter } from 'next/router'
import { getBreadcrumbItems } from 'helpers/breadcrumb'

import NavbarLink from 'components/_core/NavbarLink'
import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from '@chakra-ui/react'

const BreadcrumbComponent = (): JSX.Element => {
  const router = useRouter()
  const breadcrumbItems = getBreadcrumbItems(router)

  return (
    <Flex
      mt='navbarHeight'
      px='8'
      py='4'
      alignSelf='flex-start'
      alignItems='baseline'
    >
      <Text mr='4' fontSize='sm'>
        Você está aqui:
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
              mr='0'
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
    </Flex>
  )
}

export default BreadcrumbComponent
