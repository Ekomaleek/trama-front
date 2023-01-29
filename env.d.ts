/* eslint-disable @typescript-eslint/consistent-type-definitions */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URL: string
      COGNITO_JWTID_COOKIE_NAME: string
    }
  }
}

export {}
