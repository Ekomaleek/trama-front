import NextLink, { type LinkProps as NextLinkProps } from 'next/link'
import { chakra } from '@chakra-ui/react'

const NavbarLink = chakra<typeof NextLink, NextLinkProps>(NextLink, {
  shouldForwardProp: () => true,
  baseStyle: {
    fontWeight: 'bold',
    fontSize: '1rem',
    letterSpacing: '2px',
    transitionProperty: 'color',
    transitionDuration: 'normal',
    _hover: {
      color: 'orange.500',
    },
  },
})

export default NavbarLink
