import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

const customAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

export { customAxios }
