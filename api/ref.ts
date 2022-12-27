import axios from 'axios'
import { getErrorMessage } from 'helpers'

import {
  Ref,
  RefForCreation,
  RefForUpdate,
  RefForDeletion,
} from 'types/Ref'

import { BASE_URL } from './'

const getRefById = async (id: Ref['id']): Promise<Ref> => {
  try {
    const response = await axios.get(`${BASE_URL}/refs/${id}`)
    return response.data
  } catch (err) {
    throw new Error(`Erro ao buscar a referência: ${getErrorMessage(err)}`)
  }
}

const getRefs = async (): Promise<Ref[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/refs`)
    return response.data
  } catch (err) {
    throw new Error(`Erro ao buscar referências: ${getErrorMessage(err)}`)
  }
}

const createRef = async ({ subject_id, content }: RefForCreation): Promise<Ref> => {
  try {
    const response = await axios.post(`${BASE_URL}/refs/create`, { subject_id, content })
    return response.data
  } catch (err) {
    throw new Error(`Erro ao criar a referência: ${getErrorMessage(err)}`)
  }
}

const updateRef = async ({ id, content, subject_id }: RefForUpdate): Promise<Ref> => {
  try {
    const response = await axios.patch(`${BASE_URL}/refs/update/${id}`, { content, subject_id })
    return response.data
  } catch (err) {
    throw new Error(`Erro ao atualizar a referência: ${getErrorMessage(err)}`)
  }
}

const removeRef = async ({ id }: RefForDeletion): Promise<Ref> => {
  try {
    const response = await axios.delete(`${BASE_URL}/refs/remove/${id}`)
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
