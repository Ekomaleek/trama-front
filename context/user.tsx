import { getCurrentUser } from 'api/auth'
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from 'react'

import { User, UserFromGetUser } from 'types/User'

import { useApi } from 'hooks/use-api'

type UserContextType = {
  user: Omit<User, 'password'> | null
  setUser: React.Dispatch<React.SetStateAction<UserFromGetUser>>
}

type UserProviderProps = {
  children: ReactNode
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
})

const UserProvider = ({ children }: UserProviderProps): JSX.Element => {
  const [user, setUser] = useState<UserFromGetUser>(null)
  const { makeRequest } = useApi<UserFromGetUser, {}>()

  const getUser = async (): Promise<void> => {
    await makeRequest({
      apiMethod: getCurrentUser,
      apiMethodArgs: {},
      withToast: false,
      successCallback: setUser,
    })
  }

  useEffect(() => {
    void getUser()
    // Disabling this rule because it is necessary
    // that the function gets executed only on mount.

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

const useUser = (): UserContextType => useContext(UserContext)

export { UserProvider, UserContext, useUser }
