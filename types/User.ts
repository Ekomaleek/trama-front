type User = {
  username: string
  email: string
  password: string
}

type UserForLogin = Pick<User, 'username' | 'password'>

type UserForSignup = User

export type {
  User,
  UserForLogin,
  UserForSignup,
}
