import navLinks from 'helpers/nav-links'

import { Flex } from '@chakra-ui/react'
import NavbarLink from 'components/_core/NavbarLink'

const Navbar = (): JSX.Element => {
  return (
    <Flex
      as='header'
      pos='fixed'
      alignItems='center'
      h='navbarHeight'
      w='100%'
      p='8'
      bg='rgba(0, 0, 0, 0.8)'
      borderBottom='1px solid'
      borderColor='primary'
    >
      {navLinks.map(navLink =>
        <NavbarLink
          key={navLink.id}
          href={navLink.url}
        >
          {navLink.name}
        </NavbarLink>
      )}
    </Flex>
  )
}

export default Navbar
