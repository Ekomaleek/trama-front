import styled from 'styled-components'
import theme from 'theme'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.black};
  min-height: 150vh;
`

const MainContent = styled.main`
  margin-top: ${theme.navbarHeight};
  flex: 1;
  padding: 3rem;
`

export {
  Container,
  MainContent,
}
