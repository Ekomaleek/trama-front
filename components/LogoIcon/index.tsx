import { createIcon } from '@chakra-ui/icons'

const LogoIcon = createIcon({
  displayName: 'LogoIcon',
  viewBox: '0 0 100 100',
  d: `
    M 25,0 V 100
    M 50,0 V 100
    M 75,0 V 100
    M 0,25 H 100
    M 0,50 H 100
    M 0,75 H 100
  `,
  defaultProps: {
    stroke: 'white',
    strokeWidth: '6',
    boxSize: '7',
    transitionProperty: 'stroke',
    transitionDuration: 'normal',
    _hover: {
      stroke: 'orange.500',
    },
  },
})

export default LogoIcon
