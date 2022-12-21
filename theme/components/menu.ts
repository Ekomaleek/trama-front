import { menuAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

import { firaSans } from 'pages/_app'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys)

const defaultStyle = definePartsStyle({
  list: {
    bg: 'black',
    borderColor: 'orange.500',
  },
  item: {
    fontFamily: firaSans.style.fontFamily,
    bg: 'black',
    color: 'white',
    fontWeight: 'bold',
    transition: '0.2s',
    _hover: {
      bg: 'blackAlpha.500',
    },
  },
})

const Menu = defineMultiStyleConfig({
  defaultProps: {
    variant: 'default',
  },
  variants: {
    default: defaultStyle,
  },
})

export default Menu
