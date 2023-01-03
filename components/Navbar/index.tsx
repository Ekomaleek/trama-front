import { useState } from 'react'

import navLinks from 'helpers/nav-links'

import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { Flex, IconButton, useMediaQuery } from '@chakra-ui/react'
import NavbarLink from 'components/_core/NavbarLink'

const Navbar = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggleMenu = (): void => {
    setIsOpen(isOpen => !isOpen)
  }

  const [isDesktop] = useMediaQuery('(min-width: 978px)')

  return (
    <Flex
      as='header'
      pos='fixed'
      alignItems='center'
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
        display={isDesktop ? 'none' : 'block'}
      />

      {isDesktop &&
        navLinks.map(navLink =>
          <NavbarLink
            key={navLink.id}
            href={navLink.url}
            mr='4'
          >
            {navLink.name}
          </NavbarLink>
        )
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
          {navLinks.map(navLink =>
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
    </Flex>
  )
}

export default Navbar
