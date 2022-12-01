import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const styles = defineStyle({
  fontWeight: '800',
  letterSpacing: '3px',
})

const Heading = defineStyleConfig({
  variants: {
    default: styles,
  },
  defaultProps: {
    variant: 'default',
  },
})

export default Heading
