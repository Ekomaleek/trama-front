import navLinks from 'helpers/nav-links'

import Link from 'components/_core/Link'
import { Container } from './styled'

const Navbar = (): JSX.Element => {
  return (
    <Container>
      {navLinks.map(navLink =>
        <Link
          key={navLink.id}
          href={navLink.url}
        >
          {navLink.name}
        </Link>
      )}
    </Container>
  )
}

export default Navbar
