import { customAxios as axios } from './'

import { UserForLogin } from 'types/User'

import { getErrorMessage } from 'helpers'

const loginUser = async ({ username, password }: UserForLogin): Promise<string> => {
  try {
    const response = await axios.post(
      '/auth/login',
      { username, password }
    )
    return response.data
  } catch (err) {
    throw new Error(`Erro ao logar: ${getErrorMessage(err)}`)
  }
}

export { loginUser }
