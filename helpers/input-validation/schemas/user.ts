import { object, string, ref, InferType } from 'yup'
import { passwordRegex, passwordErrorMessage } from 'helpers/input-validation'

const userSchema = object({
  id: string()
    .required()
    .uuid(),
  username: string()
    .required('O nome de usuário é obrigatório.')
    .matches(/^[^\s]+$/, 'O nome de usuário não pode conter espaços.'),
  email: string()
    .required('O e-mail é obrigatório.')
    .email('E-mail em formato inválido.'),
  password: string()
    .required('A senha é obrigatória.')
    .matches(passwordRegex, passwordErrorMessage),
})

const userForLoginSchema = userSchema.pick(['username', 'password'])

const userForSignupSchema = userSchema.omit(['id'])
  .concat(object({
    confirmPassword: string()
      .required('A confirmação de senha é obrigatória.')
      .oneOf([ref('password')], 'As senhas devem ser iguais.'),
  }))

const CODE_LENGTH = 6
const confirmationCodeSchema = object({
  code: string()
    .required('O código é obrigatório.')
    .length(CODE_LENGTH, 'Código em formato inválido.'),
})

const userForForgotPasswordSchema = userSchema.pick(['username'])

const userForConfirmNewPasswordSchema = userSchema.pick(['username'])
  .concat(object({
    newPassword: userSchema.fields.password,
    confirmNewPassword: string()
      .required('A confirmação de senha é obrigatória.')
      .oneOf([ref('newPassword')], 'As senhas devem ser iguais.'),
    code: confirmationCodeSchema.fields.code,
  }))

type UserFromSchema = InferType<typeof userSchema>

export type { UserFromSchema }
export {
  userSchema,
  userForLoginSchema,
  userForSignupSchema,
  CODE_LENGTH,
  confirmationCodeSchema,
  userForForgotPasswordSchema,
  userForConfirmNewPasswordSchema,
}
