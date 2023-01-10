declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URL: string
      NEXT_PUBLIC_USER_POOL_ID: string
      NEXT_PUBLIC_CLIENT_ID: string
    }
  }
}

export {}
