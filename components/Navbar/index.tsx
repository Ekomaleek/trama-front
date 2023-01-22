import { useState } from 'react'

import { useUser } from 'context/user'
import navLinks from 'helpers/nav-links'
import { breakpoints } from 'theme'

import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import {
  useMediaQuery,
  Flex,
  IconButton,
  Box,
} from '@chakra-ui/react'
import NavbarLink from 'components/_core/NavbarLink'
import UserMenu from './UserMenu'

const Navbar = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isDesktop] = useMediaQuery(`(min-width: ${breakpoints.md})`)

  const toggleMenu = (): void => {
    setIsOpen(isOpen => !isOpen)
  }

  const { user } = useUser()
  const navlinksToRender = user === null
    ? [...navLinks.allUsers, ...navLinks.notLoggedInUsers]
    : [...navLinks.allUsers, ...navLinks.loggedInUsers]

  return (
    <Flex
      as='header'
      pos='fixed'
      alignItems='center'
      justifyContent='space-between'
      h='navbarHeight'
      w='100%'
      p='8'
      bg='blackAlpha.900'
      borderBottom='1px solid'
      borderColor='orange.500'
      zIndex='sticky'
    >
      <IconButton
        aria-label='Abrir menu de navegação'
        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
        onClick={toggleMenu}
        display={{ base: 'block', md: 'none' }}
        size='sm'
      />

      {isDesktop &&
        <Box>
          {navlinksToRender.map(navLink =>
            <NavbarLink
              key={navLink.id}
              href={navLink.url}
              mr='4'
            >
              {navLink.name}
            </NavbarLink>
          )}
        </Box>
      }

      {!isDesktop &&
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
              {navLink.name}
            </NavbarLink>
          )}
        </Flex>
      }

      <UserMenu user={user} />
    </Flex>
  )
}

export default Navbar
