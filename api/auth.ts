import { customAxios as axios } from './'

import {
  UserForLogin,
  UserForSignup,
  UserFromLogin,
  UserFromSignup,
  UserForSignupConfirmation,
  UserForResendCode,
} from 'types/User'

import { getErrorMessage } from 'helpers'

const loginUser = async (userData: UserForLogin): Promise<UserFromLogin> => {
  try {
    const response = await axios.post(
      '/auth/login',
      { ...userData }
    )
    return response.data
  } catch (err) {
    throw new Error(`Erro ao logar: ${getErrorMessage(err)}`)
  }
}

const signupUser = async (userData: UserForSignup): Promise<UserFromSignup> => {
  try {
    const response = await axios.post(
      '/auth/signup',
      { ...userData },
    )
    return response.data
  } catch (err) {
    throw new Error(`Erro ao criar usuário: ${getErrorMessage(err)}`)
  }
}

const confirmAccount = async (userData: UserForSignupConfirmation): Promise<string> => {
  const { username, code } = userData

  try {
    const response = await axios.post(
      '/auth/confirm-account',
      { username, code }
    )
    return response.data
  } catch (err) {
    throw new Error(`Erro ao confirmar conta: ${getErrorMessage(err)}`)
  }
}

const resendConfirmationCode = async (userData: UserForResendCode): Promise<string> => {
  const { username } = userData

  try {
    const response = await axios.post(
      '/auth/resend-code',
      { username }
    )
    return response.data
  } catch (err) {
    throw new Error(`Erro ao reenviar o código: ${getErrorMessage(err)}`)
  }
}

export {
  loginUser,
  signupUser,
  confirmAccount,
  resendConfirmationCode,
}
