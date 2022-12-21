import { cardAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys)

const defaultStyle = definePartsStyle({
  container: {
    backgroundColor: 'blackAlpha.900',
    border: '1px solid',
    borderColor: 'orange.500',
  },
})

const Card = defineMultiStyleConfig({
  defaultProps: {
    variant: 'default',
  },
  variants: {
    default: defaultStyle,
  },
})

export default Card
