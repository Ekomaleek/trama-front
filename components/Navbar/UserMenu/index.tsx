import { useApi } from 'hooks/use-api'
import { useUser } from 'context/user'
import { logoutUser } from 'api/auth'

import NextLink from 'next/link'
import { AtSignIcon, InfoIcon, MinusIcon } from '@chakra-ui/icons'
import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'

const UserMenu = (): JSX.Element => {
  const { makeRequest } = useApi()
  const { setUser } = useUser()

  const handleLogout = async (): Promise<void> => {
    await makeRequest({
      apiMethod: logoutUser,
      apiMethodArgs: {},
      successMessage: 'Usuário deslogado com sucesso.',
      withRedirect: '/',
      successCallback: () => setUser(null),
    })
  }

  return (
    <Menu>
      <MenuButton
        aria-label='Menu de perfil de usuário'
        as={IconButton}
        icon={<AtSignIcon />}
        size='sm'
      />
      <MenuList>
        <NextLink href='/profile'>
          <MenuItem icon={<InfoIcon />}>
            Ver perfil
          </MenuItem>
        </NextLink>

        <MenuItem icon={<MinusIcon />} onClick={handleLogout}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default UserMenu
