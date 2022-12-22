import defaultTheme from '@chakra-ui/theme'
import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys)

const defaultStyle = definePartsStyle({
  field: {
    _focus: {
      borderColor: 'orange.500',
      boxShadow: 'none',
    },
  },
})

const Input = defineMultiStyleConfig({
  defaultProps: {
    variant: 'default',
  },
  variants: {
    default: (props) => ({
      ...defaultTheme.components.Input.variants?.flushed(props),
      field: {
        ...defaultTheme.components.Input.variants?.flushed(props).field,
        ...defaultStyle.field,
      },
    }),
  },
})

export default Input
