import { object, string, InferType } from 'yup'

import { passwordRegex, passwordErrorMessage } from 'helpers/input-validation'

const userSchema = object({
  id: string()
    .required().uuid(),
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

type UserFromSchema = InferType<typeof userSchema>

export { userSchema }
export type { UserFromSchema }
