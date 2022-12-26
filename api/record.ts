import axios from 'axios'

import { createRef, removeRef, updateRef } from './ref'

import {
  Record,
  RecordForCreation,
  RecordForCreationWithRefs,
  RecordForUpdate,
  RecordForUpdateWithRefs,
  RecordForDeletion,
} from 'types/Record'
import { Ref } from 'types/Ref'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

const getRecordById = async (id: Record['id']): Promise<Record> => {
  const response = await axios
    .get(`${BASE_URL}/subject/${id}`)
    .catch((err: Error) => {
      throw new Error(`Erro ao buscar o registro: ${err.message}`)
    })

  return response.data
}

const getRecords = async (): Promise<Record[]> => {
  const response = await axios
    .get(`${BASE_URL}/subject`)
    .catch((err: Error) => {
      throw new Error(`Erro ao buscar registros: ${err.message}`)
    })

  return response.data
}

const createRecord = async ({ name, description, category_id }: RecordForCreation): Promise<Record> => {
  const response = await axios
    .post(`${BASE_URL}/subject/create`, {
      name,
      description,
      category_id,
    })
    .catch((err: Error) => {
      throw new Error(`Erro ao criar o registro: ${err.message}`)
    })

  return response.data
}

const updateRecord = async ({ id, name, description, category_id }: RecordForUpdate): Promise<Record> => {
  const response = await axios
    .patch(`${BASE_URL}/subject/update/${id}`, {
      name,
      description,
      category_id,
    })
    .catch((err: Error) => {
      throw new Error(`Erro ao atualizar o registro: ${err.message}`)
    })

  return response.data
}

const removeRecord = async ({ id }: RecordForDeletion): Promise<Record> => {
  const response = await axios
    .delete(`${BASE_URL}/subject/remove/${id}`)
    .catch((err: Error) => {
      throw new Error(`Erro ao remover o registro: ${err.message}`)
    })

  return response.data
}

const getRefsByRecordId = async (id: Record['id']): Promise<Ref[]> => {
  const response = await axios
    .get(`${BASE_URL}/subject/${id}/refs`)
    .catch((err: Error) => {
      throw new Error(`Erro ao buscar referências do registro: ${err.message}`)
    })

  return response.data
}

const createRecordWithRefs = async ({ name, description, category_id, refs }: RecordForCreationWithRefs): Promise<Record> => {
  const record = await createRecord({ name, description, category_id })
  await Promise.all(refs.map(async ref =>
    await createRef({ subject_id: record.id, content: ref.content })
  ))

  return record
}

const updateRecordWithRefs = async ({ id, name, description, category_id, refs, originalRefs }: RecordForUpdateWithRefs): Promise<Record> => {
  const record = await updateRecord({ id, name, description, category_id })

  const refsToUpdate = originalRefs.filter(originalRef => refs.find(ref => ref.id === originalRef.id))
  await Promise.all(refsToUpdate.map(async ref =>
    await updateRef({
      id: ref.id,
      subject_id: id,
      content: ref.content,
    })
  ))

  const refsToRemove = originalRefs.filter(originalRef => refs.find(ref => ref.id === originalRef.id) === undefined)
  await Promise.all(refsToRemove.map(async ref =>
    await removeRef({
      id: ref.id,
    })
  ))

  const refsToAdd = refs.filter(ref => originalRefs.find(originalRef => originalRef.id === ref.id) === undefined)
  await Promise.all(refsToAdd.map(async ref =>
    await createRef({
      content: ref.content,
      subject_id: id,
    })
  ))

  return record
}

export {
  getRecords,
  getRecordById,
  createRecord,
  updateRecord,
  removeRecord,
  createRecordWithRefs,
  getRefsByRecordId,
  updateRecordWithRefs,
}
