import { ReactElement } from 'react'

import Navbar from 'components/Navbar'
import { Container, MainContent } from './styled'

interface LayoutProps {
  children: ReactElement
  className?: string
}

const Layout = ({ children, className }: LayoutProps): JSX.Element => {
  return (
    <Container className={className}>
      <Navbar />

      <MainContent>
        {children}
      </MainContent>
    </Container>
  )
}

export default Layout
