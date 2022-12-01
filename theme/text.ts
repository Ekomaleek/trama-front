import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const styles = defineStyle({
  letterSpacing: '1.2px',
  fontWeight: 300,
})

const Text = defineStyleConfig({
  variants: {
    default: styles,
  },
  defaultProps: {
    variant: 'default',
  },
})

export default Text
