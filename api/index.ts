import axios from 'axios'
import { GetServerSidePropsContext } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

const customAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

customAxios.interceptors.response.use(
  response => response,
  error => {
    switch (error.code) {
      case 'ERR_NETWORK':
      case 'ETIMEDOUT':
        throw new Error(`
          Nosso sistema parece estar indisponível no momento.
          Por favor, tente novamente mais tarde.
        `)

      default:
        throw new Error(error.response.data.error)
    }
  }
)

type NextRequest = GetServerSidePropsContext['req']

export { customAxios }
export type { NextRequest }
