import axios from 'axios'

import {
  Ref,
  RefForCreation,
  RefForUpdate,
  RefForDeletion,
} from 'types/Ref'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

const getRefById = async (id: Ref['id']): Promise<Ref> => {
  const response = await axios
    .get(`${BASE_URL}/refs/${id}`)
    .catch((err: Error) => {
      throw new Error(`Erro ao buscar a referência: ${err.message}`)
    })

  return response.data
}

const getRefs = async (): Promise<Ref[]> => {
  const response = await axios
    .get(`${BASE_URL}/refs`)
    .catch((err: Error) => {
      throw new Error(`Erro ao buscar referências: ${err.message}`)
    })

  return response.data
}

const createRef = async ({ subject_id, content }: RefForCreation): Promise<Ref> => {
  const response = await axios
    .post(`${BASE_URL}/refs/create`, { subject_id, content })
    .catch((err: Error) => {
      throw new Error(`Erro ao criar a referência: ${err.message}`)
    })

  return response.data
}

const updateRef = async ({ id, content, subject_id }: RefForUpdate): Promise<Ref> => {
  const response = await axios
    .patch(`${BASE_URL}/refs/update/${id}`, {
      content,
      subject_id,
    })
    .catch((err: Error) => {
      throw new Error(`Erro ao atualizar a referência: ${err.message}`)
    })

  return response.data
}

const removeRef = async ({ id }: RefForDeletion): Promise<Ref> => {
  const response = await axios
    .delete(`${BASE_URL}/refs/remove/${id}`)
    .catch((err: Error) => {
      throw new Error(`Erro ao remover a referência: ${err.message}`)
    })

  return response.data
}

export {
  getRefs,
  getRefById,
  createRef,
  updateRef,
  removeRef,
}
