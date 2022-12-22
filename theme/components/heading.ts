import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const defaultStyle = defineStyle({
  fontWeight: '800',
  letterSpacing: '3px',
  color: 'white',
})

// To use this variant, pass a var '--n-lines' var to the component,
// that will be the number of lines the heading will span
// <Heading {...props} sx={{ '--n-lines': 'a number' }}>
const overflowEllipsis = defineStyle({
  ...defaultStyle,
  display: '-webkit-box',
  WebkitLineClamp: 'var(--n-lines)',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})

const Heading = defineStyleConfig({
  defaultProps: {
    variant: 'default',
  },
  variants: {
    default: defaultStyle,
    overflowEllipsis,
  },
})

export default Heading
