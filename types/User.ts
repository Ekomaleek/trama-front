import { UserFromSchema } from 'helpers/input-validation/schemas/user'

// Base type is being imported from schema because
// the opposite (defining a schema based on a type)
// isn't working using yup's ObjectSchema.
type User = UserFromSchema

type UserForLogin = Pick<User, 'username' | 'password'>

type UserForSignup = Omit<User, 'id'>

type UserForSignupConfirmation = Pick<User, 'username'> & { code: string }

type UserForResendCode = Pick<User, 'username'>

type UserFromLogin =
  Pick<User, 'id' | 'username' | 'email'> &
  { jwtToken: string, email_verified: boolean }

type UserFromSignup = Pick<User, 'id' | 'username' | 'email'>

type UserFromGetUser = Omit<User, 'password'> | null

type UserForForgotPassword = Pick<User, 'username'>

type UserForConfirmNewPassword = Pick<User, 'username'> & {
  newPassword: User['password']
  confirmNewPassword: UserForConfirmNewPassword['newPassword']
  code: string
}

export type {
  User,
  UserForLogin,
  UserForSignup,
  UserForSignupConfirmation,
  UserForResendCode,
  UserFromLogin,
  UserFromSignup,
  UserFromGetUser,
  UserForForgotPassword,
  UserForConfirmNewPassword,
}
