import NextLink, { type LinkProps as NextLinkProps } from 'next/link'
import { chakra } from '@chakra-ui/react'

const NavbarLink = chakra<typeof NextLink, NextLinkProps>(NextLink, {
  shouldForwardProp: (prop) => ['href', 'target', 'children', 'onClick'].includes(prop),
  baseStyle: {
    fontWeight: 'bold',
    fontSize: '18px',
    letterSpacing: '2px',
    transitionProperty: 'color',
    transitionDuration: 'normal',
    _hover: {
      color: 'orange.500',
    },
  },
})

export default NavbarLink
