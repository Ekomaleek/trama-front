import styled from 'styled-components'
import NextLink from 'next/link'
import theme from 'theme'

const Link = styled(NextLink)`
  font-weight: bold;
  transition: color 0.2s;

  :hover {
    color: ${theme.colors.primary};
  }
`

export default Link
