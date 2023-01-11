import {
  CognitoUserPool,
  CognitoUser,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js'

import {
  UserForSignup,
  UserForSignupConfirmation,
  UserWithoutPassword,
} from 'types/User'

const userPool = new CognitoUserPool({
  ClientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  UserPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
})

const createUser = async (userData: UserForSignup): Promise<UserWithoutPassword> => {
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

export { createUser, confirmUserAccount }
