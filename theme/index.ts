// https://chakra-ui.com/docs/styled-system/theme

import { robotoSlab, firaSans } from 'pages/_app'

import Heading from './heading'
import Text from './text'

const colors = {
  primary: '#FFD403',
  secondary: '#707070',
  black: '#222222',
  white: '#EEEEEE',
  whiteHover: '#BBBBBB',
  success: '#0af521',
  error: '#ff000c',
}

// Global styles from chakra-ui
const styles = {
  global: {
    'html, body': {
      padding: 0,
      margin: 0,
      boxSizing: 'border-box',
      color: colors.white,
    },
    'h1, h2, h3, h4, h5, h6': {
      fontWeight: 800,
    },
    a: {
      fontFamily: firaSans.style.fontFamily,
    },
  },
}

const fonts = {
  heading: firaSans.style.fontFamily,
  body: robotoSlab.style.fontFamily,
}

const components = {
  Heading,
  Text,
}

const navbarHeight = '5rem'

const sizes = {
  navbarHeight,
}

const space = {
  navbarHeight,
}

const theme = {
  colors,
  navbarHeight,
  styles,
  fonts,
  components,
  sizes,
  space,
}
export default theme
