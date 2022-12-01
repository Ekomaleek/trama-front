// https://chakra-ui.com/docs/styled-system/theme
import { robotoSlab, firaSans } from 'pages/_app'

const colors = {
  primary: '#FFD403',
  secondary: '#707070',
  black: '#222222',
  white: '#EEEEEE',
  whiteHover: '#BBBBBB',
  success: '#0af521',
  error: '#ff000c',
}

const navbarHeight = '80px'

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
      fontFamily: firaSans.style.fontFamily,
    },
    'p, span': {
      fontWeight: 800,
      fontFamily: robotoSlab.style.fontFamily,
    },
  },
}

const theme = {
  colors,
  navbarHeight,
  styles,
}
export default theme
