import { customAxios as axios } from './'
import { createRef, removeRef, updateRef } from './ref'

import { Ref } from 'types/Ref'
import {
  Record,
  RecordForCreation,
  RecordForCreationWithRefs,
  RecordForUpdate,
  RecordForUpdateWithRefs,
  RecordForDeletion,
} from 'types/Record'

import { getErrorMessage } from 'helpers'

const getRecordById = async (id: Record['id']): Promise<Record> => {
  try {
    const response = await axios.get(`/subject/${id}`)
    return response.data
  } catch (err) {
    throw new Error(`Erro ao buscar o registro: ${getErrorMessage(err)}`)
  }
}

const getRecords = async (): Promise<Record[]> => {
  try {
    const response = await axios.get('/subject')
    return response.data
  } catch (err) {
    throw new Error(`Erro ao buscar registros: ${getErrorMessage(err)}`)
  }
}

const createRecord = async ({ name, description, category_id }: RecordForCreation): Promise<Record> => {
  try {
    const response = await axios.post('/subject/create', { name, description, category_id })
    return response.data
  } catch (err) {
    throw new Error(`Erro ao criar o registro: ${getErrorMessage(err)}`)
  }
}

const updateRecord = async ({ id, name, description, category_id }: RecordForUpdate): Promise<Record> => {
  try {
    const response = await axios.patch(`/subject/update/${id}`, { name, description, category_id })
    return response.data
  } catch (err) {
    throw new Error(`Erro ao atualizar o registro: ${getErrorMessage(err)}`)
  }
}

const removeRecord = async ({ id }: RecordForDeletion): Promise<Record> => {
  try {
    const response = await axios.delete(`/subject/remove/${id}`)
    return response.data
  } catch (err) {
    throw new Error(`Erro ao remover o registro: ${getErrorMessage(err)}`)
  }
}

const getRefsByRecordId = async (id: Record['id']): Promise<Ref[]> => {
  try {
    const response = await axios.get(`/subject/${id}/refs`)
    return response.data
  } catch (err) {
    throw new Error(`Erro ao buscar referências do registro: ${getErrorMessage(err)}`)
  }
}

const createRecordWithRefs = async ({ name, description, category_id, refs }: RecordForCreationWithRefs): Promise<Record> => {
  try {
    const record = await createRecord({ name, description, category_id })

    await Promise.all(refs.map(async ref =>
      await createRef({
        subject_id: record.id,
        content: ref.content,
      })
    ))

    return record
  } catch (err) {
    throw new Error(`Erro ao criar o registro: ${getErrorMessage(err)}`)
  }
}

const updateRecordWithRefs = async ({ id, name, description, category_id, refs, originalRefs }: RecordForUpdateWithRefs): Promise<Record> => {
  try {
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
  } catch (err) {
    throw new Error(`Erro ao atualizar o registro: ${getErrorMessage(err)}`)
  }
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
