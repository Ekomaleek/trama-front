// https://chakra-ui.com/docs/styled-system/theme

import { robotoSlab, firaSans } from 'pages/_app'
import { reactQuillCssClasses } from 'helpers/react-quill-css-classes'

import components from './components'

const colors = {
  black: '#222222',
  white: '#EEEEEE',
}

const breakpoints = {
  sm: '380px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
}

// Global styles from chakra-ui
const styles = {
  global: {
    // Redefine chakra space variables for consistent spacings in multiple devices
    ':root': {
      '--chakra-space-2': '0.4rem',
      '--chakra-space-4': '0.8rem',
      '--chakra-space-8': '1.5rem',
      [`@media (min-width: ${breakpoints.md})`]: {
        '--chakra-space-2': '0.5rem',
        '--chakra-space-4': '1rem',
        '--chakra-space-8': '2rem',
      },
    },
    'html, body': {
      padding: 0,
      margin: 0,
      boxSizing: 'border-box',
      fontSize: '14px',
      scrollBehavior: 'smooth',
      [`@media (min-width: ${breakpoints.md})`]: {
        fontSize: '16px',
      },
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
    // React Quill Reset Start
    [reactQuillCssClasses.editorContainer]: {
      fontSize: '1rem',
    },
    [reactQuillCssClasses.editorContent]: {
      fontFamily: robotoSlab.style.fontFamily,
    },
    [reactQuillCssClasses.toolbarButtonsColor]: {
      color: 'orange.500',
    },
    [reactQuillCssClasses.toolbarButtonsFill]: {
      fill: 'orange.500',
    },
    [reactQuillCssClasses.toolbarButtonsStroke]: {
      stroke: 'orange.500',
    },
    [reactQuillCssClasses.toolbarMenus]: {
      backgroundColor: 'black',
      color: 'white',
      zIndex: 'sticky',
      boxShadow: 'none',
    },
    [reactQuillCssClasses.links]: {
      color: 'orange.500',
    },
    [reactQuillCssClasses.toolbarMenusInputs]: {
      backgroundColor: 'black',
    },
    [reactQuillCssClasses.insertLinkText]: {
      content: '"Insira o link: "',
    },
    [reactQuillCssClasses.saveActionText]: {
      content: '"Salvar"',
    },
    [reactQuillCssClasses.inputPlaceholder]: {
      color: 'gray.500',
      fontStyle: 'unset',
    },
    [reactQuillCssClasses.svgIconsStroke]: {
      stroke: 'white',
    },
    [reactQuillCssClasses.svgIconsFill]: {
      fill: 'white',
    },
    // React Quill Reset End
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
  breakpoints,
  navbarHeight,
  styles,
  fonts,
  components,
  sizes,
  space,
}

export default theme
export { breakpoints }
