import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const defaultStyle = defineStyle({
  fontWeight: '800',
  letterSpacing: '3px',
  color: 'white',
})

const Heading = defineStyleConfig({
  defaultProps: {
    variant: 'default',
  },
  variants: {
    default: defaultStyle,
  },
})

export default Heading
