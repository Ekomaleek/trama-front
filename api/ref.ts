import { customAxios as axios, NextRequest } from './'

import { getErrorMessage } from 'helpers'

import {
  Ref,
  RefForCreation,
  RefForUpdate,
  RefForDeletion,
  RefId,
} from 'types/Ref'

const getRefById = async (data: RefId, req: NextRequest): Promise<Ref> => {
  const { id } = data

  try {
    const response = await axios.get(
      `/refs/${id}`,
      { headers: { Cookie: req?.headers.cookie } }
    )
    return response.data
  } catch (err) {
    throw new Error(`Erro ao buscar a referência: ${getErrorMessage(err)}`)
  }
}

const getRefs = async (req?: NextRequest): Promise<Ref[]> => {
  try {
    const response = await axios.get(
      '/refs',
      { headers: { Cookie: req?.headers.cookie } }
    )
    return response.data
  } catch (err) {
    throw new Error(`Erro ao buscar referências: ${getErrorMessage(err)}`)
  }
}

const createRef = async (data: RefForCreation, req?: NextRequest): Promise<Ref> => {
  const { record_id, content } = data

  try {
    const response = await axios.post(
      '/refs/create',
      { record_id, content },
      { headers: { Cookie: req?.headers.cookie } }
    )
    return response.data
  } catch (err) {
    throw new Error(`Erro ao criar a referência: ${getErrorMessage(err)}`)
  }
}

const updateRef = async (data: RefForUpdate, req?: NextRequest): Promise<Ref> => {
  const { id, content, record_id } = data

  try {
    const response = await axios.patch(
      `/refs/update/${id}`,
      { content, record_id },
      { headers: { Cookie: req?.headers.cookie } }
    )
    return response.data
  } catch (err) {
    throw new Error(`Erro ao atualizar a referência: ${getErrorMessage(err)}`)
  }
}

const removeRef = async (data: RefForDeletion, req?: NextRequest): Promise<Ref> => {
  const { id } = data

  try {
    const response = await axios.delete(
      `/refs/remove/${id}`,
      { headers: { Cookie: req?.headers.cookie } }
    )
    return response.data
  } catch (err) {
    throw new Error(`Erro ao remover a referência: ${getErrorMessage(err)}`)
  }
}

export {
  getRefs,
  getRefById,
  createRef,
  updateRef,
  removeRef,
}
