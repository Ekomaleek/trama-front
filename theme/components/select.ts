import defaultTheme from '@chakra-ui/theme'
import { selectAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(selectAnatomy.keys)

const defaultStyle = definePartsStyle({
  field: {
    background: 'black',
    _focus: {
      borderColor: 'orange.500',
      boxShadow: 'none',
    },
  },
})

const Select = defineMultiStyleConfig({
  defaultProps: {
    variant: 'default',
  },
  variants: {
    default: (props) => ({
      ...defaultTheme.components.Select.variants?.flushed(props),
      field: {
        ...defaultTheme.components.Select.variants?.flushed(props).field,
        ...defaultStyle.field,
      },
    }),
  },
})

export default Select
