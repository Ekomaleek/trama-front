import axios from 'axios'
import { GetServerSidePropsContext } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

const customAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

type NextRequest = GetServerSidePropsContext['req']

export { customAxios }
export type { NextRequest }
