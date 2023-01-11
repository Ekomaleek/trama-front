type User = {
  id: string
  username: string
  email: string
  password: string
}

type UserForLogin = Pick<User, 'username' | 'password'>

type UserForSignup = Omit<User, 'id'>

type UserForSignupConfirmation = Pick<User, 'username'> & { code: string }

type UserWithoutPassword = Omit<User, 'password'>

export type {
  User,
  UserForLogin,
  UserForSignup,
  UserForSignupConfirmation,
  UserWithoutPassword,
}
