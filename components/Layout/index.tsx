import { ReactNode } from 'react'

import { Flex, Box } from '@chakra-ui/react'
import Navbar from 'components/Navbar'
import Breadcrumb from 'components/Breadcrumb'

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <Flex
      direction='column'
      alignItems='center'
      bg='black'
      minH='100vh'
    >
      <Navbar />
      <Breadcrumb />

      <Box
        as='main'
        p='8'
        flex='1'
        w='100%'
        maxW='1200px'
      >
        {children}
      </Box>
    </Flex>
  )
}

export default Layout
