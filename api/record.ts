import { customAxios as axios, NextRequest } from './'
import { createRef, removeRef, updateRef } from './ref'

import { Ref } from 'types/Ref'
import {
  Record,
  RecordForCreation,
  RecordForCreationWithRefs,
  RecordForUpdate,
  RecordForUpdateWithRefs,
  RecordForDeletion,
  RecordId,
} from 'types/Record'

import { getErrorMessage } from 'helpers'

const getRecordById = async (data: RecordId, req?: NextRequest): Promise<Record> => {
  const { id } = data

  try {
    const response = await axios.get(
      `/subject/${id}`,
      { headers: { Cookie: req?.headers.cookie } }
    )
    return response.data
  } catch (err) {
    throw new Error(`Erro ao buscar o registro: ${getErrorMessage(err)}`)
  }
}

const getRecords = async (req?: NextRequest): Promise<Record[]> => {
  try {
    const response = await axios.get(
      '/subject',
      { headers: { Cookie: req?.headers.cookie } }
    )
    return response.data
  } catch (err) {
    throw new Error(`Erro ao buscar registros: ${getErrorMessage(err)}`)
  }
}

const createRecord = async (data: RecordForCreation, req?: NextRequest): Promise<Record> => {
  const { name, description, category_id } = data

  try {
    const response = await axios.post(
      '/subject/create',
      { name, description, category_id },
      { headers: { Cookie: req?.headers.cookie } }
    )
    return response.data
  } catch (err) {
    throw new Error(`Erro ao criar o registro: ${getErrorMessage(err)}`)
  }
}

const updateRecord = async (data: RecordForUpdate, req?: NextRequest): Promise<Record> => {
  const {
    id,
    name,
    description,
    category_id,
  } = data

  try {
    const response = await axios.patch(
      `/subject/update/${id}`,
      { name, description, category_id },
      { headers: { Cookie: req?.headers.cookie } }
    )
    return response.data
  } catch (err) {
    throw new Error(`Erro ao atualizar o registro: ${getErrorMessage(err)}`)
  }
}

const removeRecord = async (data: RecordForDeletion, req?: NextRequest): Promise<Record> => {
  const { id } = data

  try {
    const response = await axios.delete(
      `/subject/remove/${id}`,
      { headers: { Cookie: req?.headers.cookie } }
    )
    return response.data
  } catch (err) {
    throw new Error(`Erro ao remover o registro: ${getErrorMessage(err)}`)
  }
}

const getRefsByRecordId = async (data: RecordId, req?: NextRequest): Promise<Ref[]> => {
  const { id } = data

  try {
    const response = await axios.get(
      `/subject/${id}/refs`,
      { headers: { Cookie: req?.headers.cookie } }
    )
    return response.data
  } catch (err) {
    throw new Error(`Erro ao buscar referências do registro: ${getErrorMessage(err)}`)
  }
}

const createRecordWithRefs = async (data: RecordForCreationWithRefs, req?: NextRequest): Promise<Record> => {
  const {
    name,
    description,
    category_id,
    refs,
  } = data

  try {
    const record = await createRecord(
      { name, description, category_id },
      req
    )

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

const updateRecordWithRefs = async (data: RecordForUpdateWithRefs, req?: NextRequest): Promise<Record> => {
  const {
    id,
    name,
    description,
    category_id,
    refs,
    originalRefs,
  } = data

  try {
    const record = await updateRecord(
      {
        id,
        name,
        description,
        category_id,
      },
      req
    )

    const refsToUpdate = originalRefs
      .filter(originalRef =>
        refs.find(ref => ref.id === originalRef.id)
      )
    await Promise.all(
      refsToUpdate.map(async ref =>
        await updateRef(
          {
            id: ref.id,
            subject_id: id,
            content: ref.content,
          },
          req
        )
      )
    )

    const refsToRemove = originalRefs
      .filter(originalRef =>
        refs.find(ref => ref.id === originalRef.id) === undefined
      )
    await Promise.all(
      refsToRemove.map(async ref =>
        await removeRef(
          {
            id: ref.id,
          },
          req
        )
      )
    )

    const refsToAdd = refs
      .filter(ref =>
        originalRefs.find(originalRef => originalRef.id === ref.id) === undefined
      )
    await Promise.all(
      refsToAdd.map(async ref =>
        await createRef(
          {
            content: ref.content,
            subject_id: id,
          },
          req
        )
      )
    )

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
