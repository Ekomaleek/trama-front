import { useState, useEffect } from 'react'

import { useUser } from 'context/user'
import navLinks from 'helpers/nav-links'

import LogoIcon from 'components/LogoIcon'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import NavbarLink from 'components/_core/NavbarLink'
import UserMenu from './UserMenu'
import {
  useMediaQuery,
  Flex,
  IconButton,
  Box,
  useTheme,
} from '@chakra-ui/react'

const Navbar = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const theme = useTheme()
  const mdBreakpoint = theme.breakpoints.md as string
  const [isDesktop] = useMediaQuery(`(min-width: ${mdBreakpoint})`)

  const toggleMenu = (): void => {
    setIsOpen(isOpen => !isOpen)
  }

  const { user } = useUser()
  const navlinksToRender = user === null
    ? [...navLinks.allUsers, ...navLinks.notLoggedInUsers]
    : [...navLinks.allUsers, ...navLinks.loggedInUsers]

  // Hide navbar on scroll down
  const [previousScroll, setPreviousScroll] = useState<number>(0)
  const [shouldHide, setShouldHide] = useState<boolean>(false)

  useEffect(() => {
    const scrollListenerHandler = (): void => {
      setPreviousScroll(window.scrollY)

      window.scrollY > previousScroll
        ? setShouldHide(true)
        : setShouldHide(false)
    }

    window.addEventListener('scroll', scrollListenerHandler)
    return () => window.removeEventListener('scroll', scrollListenerHandler)
  }, [previousScroll])

  return (
    <Flex
      as='header'
      pos='fixed'
      alignItems='center'
      justifyContent='space-between'
      height='navbarHeight'
      width='100%'
      paddingY='4'
      paddingX='8'
      bg='blackAlpha.900'
      borderBottom='1px solid'
      borderColor='orange.500'
      zIndex='sticky'
      left='0'
      opacity={shouldHide ? 0 : 1}
      visibility={shouldHide ? 'hidden' : 'visible'}
      transitionProperty='opacity visibility'
      transitionDuration='slow'
    >
      {!isDesktop &&
        <>
          <Flex
            width='100%'
            justifyContent='space-between'
            display={{ base: 'flex', md: 'none' }}
          >
            <IconButton
              aria-label='Abrir menu de navegação'
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              onClick={toggleMenu}
              size='sm'
            />

            <NavbarLink href='/'>
              <LogoIcon
                position='absolute'
                transform='translateX(-50%)'
                left='50%'
              />
            </NavbarLink>

            {user !== null && <UserMenu />}
          </Flex>

          <Flex
            position='absolute'
            minHeight='calc(100vh - var(--chakra-sizes-navbarHeight))'
            width='100%'
            bg='#000000'
            p='8'
            left='0'
            top='navbarHeight'
            flexDirection='column'
            alignItems='center'
            marginLeft={isOpen ? 0 : '-100vw'}
            transitionProperty='margin-left'
            transitionDuration='normal'
          >
            {navlinksToRender.map(navLink =>
              <NavbarLink
                key={navLink.id}
                href={navLink.url}
                mb='4'
                onClick={() => setIsOpen(false)}
              >
                {
                  navLink.url !== '/' &&
                  navLink.name
                }
              </NavbarLink>
            )}
          </Flex>
        </>
      }

      {isDesktop &&
        <Flex
          alignItems='center'
          justifyContent='space-between'
          width='100%'
        >
          <Box>
            {navlinksToRender.map(navLink =>
              <NavbarLink
                key={navLink.id}
                href={navLink.url}
                mr='4'
              >
                {
                  navLink.url === '/'
                    ? <LogoIcon maxH='100%' />
                    : navLink.name
                }
              </NavbarLink>
            )}
          </Box>

          {user !== null && <UserMenu />}
        </Flex>
      }
    </Flex>
  )
}

export default Navbar
