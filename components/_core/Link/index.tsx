import NextLink, { type LinkProps as NextLinkProps } from 'next/link'
import { chakra } from '@chakra-ui/react'

const Link = chakra<typeof NextLink, NextLinkProps>(NextLink, {
  shouldForwardProp: () => true,
  baseStyle: {
    fontWeight: 'bold',
    letterSpacing: '2px',
    transitionProperty: 'color',
    transitionDuration: 'normal',
    textDecoration: 'underline',
    _hover: {
      color: 'orange.500',
    },
  },
})

export default Link
