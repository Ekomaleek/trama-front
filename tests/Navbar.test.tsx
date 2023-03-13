import { render, screen } from '@testing-library/react'
import Navbar from 'components/Navbar'
import { UserContext } from 'context/user'

// Mock useTheme and useMediaQuery
jest.mock('@chakra-ui/react', () => {
  const originalModule = jest.requireActual('@chakra-ui/react')

  return {
    __esModule: true,
    ...originalModule,
    useTheme: jest.fn().mockImplementation(() => ({
      breakpoints: {
        md: '768px',
      },
    })),
    // const [isDesktop] = [true]
    useMediaQuery: jest.fn().mockImplementation(() => ([true])),
  }
})

describe('Navbar component test', () => {
  test('Without user, should not render profile menu', () => {
    render(<Navbar />)
    expect(
      () => screen.getByLabelText('Menu de perfil de usuário')
    ).toThrow()
  })

  test('With user, should render profile menu', () => {
    render(
      <UserContext.Provider value={{
        user: {
          id: '123',
          username: 'jansen',
          email: 'jansen@jansen.com',
        },
        setUser: () => {},
      }}
      >
        <Navbar />
      </UserContext.Provider>
    )
    const profileMenu = screen.getByLabelText('Menu de perfil de usuário')
    expect(profileMenu).toBeInTheDocument()
  })
})
