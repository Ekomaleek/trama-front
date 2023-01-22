import { getCurrentUser } from 'api/auth'
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from 'react'

import { User, UserFromGetUser } from 'types/User'

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

  const getUser = async (): Promise<void> => {
    const response = await getCurrentUser()
    setUser(response)
  }

  useEffect(() => {
    void getUser()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

const useUser = (): UserContextType => useContext(UserContext)

export { UserProvider, useUser }
