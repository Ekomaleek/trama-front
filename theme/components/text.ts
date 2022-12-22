import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const defaultStyle = defineStyle({
  letterSpacing: '1.2px',
  fontWeight: 300,
  color: 'white',
})

// To use this variant, pass a var '--n-lines' var to the component,
// that will be the number of lines the text will span
// <Text {...props} sx={{ '--n-lines': 'a number' }}>
const overflowEllipsis = defineStyle({
  ...defaultStyle,
  display: '-webkit-box',
  WebkitLineClamp: 'var(--n-lines)',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})

const Text = defineStyleConfig({
  defaultProps: {
    variant: 'default',
  },
  variants: {
    default: defaultStyle,
    overflowEllipsis,
  },
})

export default Text
