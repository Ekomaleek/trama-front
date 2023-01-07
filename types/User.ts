type User = {
  username: string
  password: string
}

type UserForLogin = Pick<User, 'username' | 'password'>

export type { User, UserForLogin }
