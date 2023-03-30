import { customAxios as axios, NextRequest } from './'

import {
  Ref,
  RefForCreation,
  RefForUpdate,
  RefForDeletion,
  RefId,
} from 'types/Ref'

const getRefById = async (data: RefId, req: NextRequest): Promise<Ref> => {
  const { id } = data

  const response = await axios.get(
    `/ref/${id}`,
    { headers: { Cookie: req?.headers.cookie } }
  )
  return response.data
}

const getRefs = async (req?: NextRequest): Promise<Ref[]> => {
  const response = await axios.get(
    '/ref',
    { headers: { Cookie: req?.headers.cookie } }
  )
  return response.data
}

const createRef = async (data: RefForCreation, req?: NextRequest): Promise<Ref> => {
  const { record_id, content } = data

  const response = await axios.post(
    '/ref',
    { record_id, content },
    { headers: { Cookie: req?.headers.cookie } }
  )
  return response.data
}

const updateRef = async (data: RefForUpdate, req?: NextRequest): Promise<Ref> => {
  const { id, content, record_id } = data

  const response = await axios.patch(
    `/ref/${id}`,
    { content, record_id },
    { headers: { Cookie: req?.headers.cookie } }
  )
  return response.data
}

const removeRef = async (data: RefForDeletion, req?: NextRequest): Promise<Ref> => {
  const { id } = data

  const response = await axios.delete(
    `/ref/${id}`,
    { headers: { Cookie: req?.headers.cookie } }
  )
  return response.data
}

export {
  getRefs,
  getRefById,
  createRef,
  updateRef,
  removeRef,
}
