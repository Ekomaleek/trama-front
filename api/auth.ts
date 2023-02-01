import { customAxios as axios } from './'

import {
  UserForLogin,
  UserForSignup,
  UserFromLogin,
  UserFromSignup,
  UserForSignupConfirmation,
  UserForResendCode,
  UserFromGetUser,
  UserForForgotPassword,
  UserForConfirmNewPassword,
} from 'types/User'

const loginUser = async (userData: UserForLogin): Promise<UserFromLogin> => {
  const response = await axios.post(
    '/auth/login',
    { ...userData }
  )
  return response.data
}

const signupUser = async (userData: UserForSignup): Promise<UserFromSignup> => {
  const response = await axios.post(
    '/auth/signup',
    { ...userData },
  )
  return response.data
}

const confirmAccount = async (userData: UserForSignupConfirmation): Promise<string> => {
  const { username, code } = userData

  const response = await axios.post(
    '/auth/confirm-account',
    { username, code }
  )
  return response.data
}

const resendConfirmationCode = async (userData: UserForResendCode): Promise<string> => {
  const { username } = userData

  const response = await axios.post(
    '/auth/resend-code',
    { username }
  )
  return response.data
}

const getCurrentUser = async (): Promise<UserFromGetUser> => {
  const response = await axios.get('/auth/user')
  return response.data === ''
    ? null
    : response.data
}

const logoutUser = async (): Promise<void> => {
  await axios.get('/auth/logout')
}

const forgotPassword = async (userData: UserForForgotPassword): Promise<string> => {
  const { username } = userData

  const response = await axios.post(
    '/auth/forgot-password',
    { username }
  )
  return response.data
}

const confirmNewPassword = async (userData: UserForConfirmNewPassword): Promise<string> => {
  const { username, newPassword, code } = userData

  const response = await axios.post(
    '/auth/confirm-new-password',
    { username, newPassword, code }
  )
  return response.data
}

export {
  loginUser,
  signupUser,
  confirmAccount,
  resendConfirmationCode,
  getCurrentUser,
  logoutUser,
  forgotPassword,
  confirmNewPassword,
}
