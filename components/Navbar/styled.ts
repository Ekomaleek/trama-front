import styled from 'styled-components'
import theme from 'theme'

const Container = styled.header`
  position: fixed;
  display: flex;
  align-items: center;
  height: ${theme.navbarHeight};
  width: 100%;
  padding: 1rem;
  border-bottom: 1px solid ${theme.colors.primary};
  background: ${theme.colors.black};
`

export { Container }
