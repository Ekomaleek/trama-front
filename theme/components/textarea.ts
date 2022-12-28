import defaultTheme from '@chakra-ui/theme'
import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const defaultStyle = defineStyle({
  _focus: {
    borderColor: 'orange.500',
    boxShadow: 'none',
  },
})

const Textarea = defineStyleConfig({
  defaultProps: {
    variant: 'default',
  },
  variants: {
    default: (props) => ({
      ...defaultTheme.components.Textarea.variants?.outline(props),
      ...defaultStyle,
    }),
  },
})

export default Textarea
