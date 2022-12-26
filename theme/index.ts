// https://chakra-ui.com/docs/styled-system/theme

import { robotoSlab, firaSans } from 'pages/_app'

import components from './components'

const colors = {
  black: '#222222',
  white: '#EEEEEE',
}

// Global styles from chakra-ui
const styles = {
  global: {
    'html, body': {
      padding: 0,
      margin: 0,
      boxSizing: 'border-box',
    },
    '*': {
      color: 'white',
      letterSpacing: '1.3px',
    },
    'a, button, label': {
      fontFamily: firaSans.style.fontFamily,
      fontWeight: 'bold !important',
    },
    'input, textarea': {
      fontFamily: robotoSlab.style.fontFamily,
    },
    option: {
      background: 'black !important',
      fontFamily: robotoSlab.style.fontFamily,
    },
  },
}

const fonts = {
  heading: firaSans.style.fontFamily,
  body: robotoSlab.style.fontFamily,
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
