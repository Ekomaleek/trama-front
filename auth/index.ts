import {
  CognitoUserPool,
  CognitoUser,
  CognitoUserAttribute,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js'

import { NextRouter } from 'next/router'
import {
  User,
  UserForLogin,
  UserForSignup,
  UserForSignupConfirmation,
  UserFromSignup,
} from 'types/User'

const userPool = new CognitoUserPool({
  ClientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  UserPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
})

const createUser = async (userData: UserForSignup): Promise<UserFromSignup> => {
  const userAttributes: CognitoUserAttribute[] = []
  const userEmail = new CognitoUserAttribute({
    Name: 'email',
    Value: userData.email,
  })
  userAttributes.push(userEmail)

  return await new Promise((resolve, reject) => {
    userPool.signUp(
      userData.username,
      userData.password,
      userAttributes,
      [],
      function (err, result) {
        if (err !== null && err !== undefined) reject(err.message)

        else if (result !== undefined) {
          resolve({
            id: result.userSub,
            ...userData,
          })
        }
      })
  })
}

const confirmUserAccount = async ({ username, code }: UserForSignupConfirmation): Promise<string> => {
  const user = new CognitoUser({
    Username: username,
    Pool: userPool,
  })

  return await new Promise((resolve, reject) => {
    user.confirmRegistration(code, true, function (err, result) {
      if (err !== null && err !== undefined) reject(err.message)
      else if (result !== undefined) {
        resolve(result)
      }
    })
  })
}

const resendCode = async ({ username }: Pick<User, 'username'>): Promise<string> => {
  const user = new CognitoUser({
    Username: username,
    Pool: userPool,
  })

  return await new Promise((resolve, reject) => {
    user.resendConfirmationCode(function (err, result) {
      if (err !== null && err !== undefined) reject(err.message)
      else if (result !== undefined) {
        resolve(result.Destination)
      }
    })
  })
}

// TODO: redirect with useApi errorCallback
type AuthenticateUserParams = {
  username: UserForLogin['username']
  password: UserForLogin['password']
  router: NextRouter
}
const authenticateUser = async ({ username, password, router }: AuthenticateUserParams): Promise<string> => {
  const authParams = new AuthenticationDetails({
    Username: username,
    Password: password,
  })

  const user = new CognitoUser({
    Username: username,
    Pool: userPool,
  })

  return await new Promise((resolve, reject) => {
    user.authenticateUser(authParams, {
      onSuccess: (result) => {
        resolve(result.getIdToken().getJwtToken())
      },
      onFailure: (err) => {
        err.message === 'User is not confirmed.' &&
        router.push(`/signup/account-verification?username=${username}`)

        reject(err.message)
      },
    })
  })
}

const logoutUser = async ({ username }: Pick<User, 'username'>): Promise<void> => {
  const user = new CognitoUser({
    Username: username,
    Pool: userPool,
  })

  return await new Promise((resolve, reject) => {
    user.signOut(function () {
      resolve()
    })
  })
}

const getCurrentUser = async (): Promise<CognitoUser | null> => {
  const user = userPool.getCurrentUser()
  return user
}

export {
  userPool,
  createUser,
  confirmUserAccount,
  resendCode,
  authenticateUser,
  logoutUser,
  getCurrentUser,
}

export type {
  AuthenticateUserParams,
}
