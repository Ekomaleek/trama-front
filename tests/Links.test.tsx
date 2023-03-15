import { render, screen } from '@testing-library/react'
import Link from 'components/_core/Link'
import NavbarLink from 'components/_core/NavbarLink'

describe('Link components test', () => {
  test('Link gets forwarded href correctly', () => {
    const href = '/url/to/link/href'
    render(<Link href={href} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', href)
  })

  test('NavbarLink gets forwarded href correctly', () => {
    const href = '/url/to/navbar/href'
    render(<NavbarLink href={href} />)

    const navbarLink = screen.getByRole('link')
    expect(navbarLink).toHaveAttribute('href', href)
  })
})
