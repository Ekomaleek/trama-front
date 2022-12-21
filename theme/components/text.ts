import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const defaultStyle = defineStyle({
  letterSpacing: '1.2px',
  fontWeight: 300,
  color: 'white',
})

const Text = defineStyleConfig({
  defaultProps: {
    variant: 'default',
  },
  variants: {
    default: defaultStyle,
  },
})

export default Text
