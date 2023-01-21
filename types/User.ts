type User = {
  id: string
  username: string
  email: string
  password: string
}

type UserForLogin = Pick<User, 'username' | 'password'>

type UserForSignup = Omit<User, 'id'>

type UserForSignupConfirmation = Pick<User, 'username'> & { code: string }

type UserForResendCode = Pick<User, 'username'>

type UserFromLogin =
  Pick<User, 'id' | 'username' | 'email'> &
  { jwtToken: string, email_verified: boolean }

type UserFromSignup = Pick<User, 'id' | 'username' | 'email'>

export type {
  User,
  UserForLogin,
  UserForSignup,
  UserForSignupConfirmation,
  UserForResendCode,
  UserFromLogin,
  UserFromSignup,
}
