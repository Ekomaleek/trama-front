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

const getRecordById = async (data: RecordId, req?: NextRequest): Promise<Record> => {
  const { id } = data

  const response = await axios.get(
    `/record/${id}`,
    { headers: { Cookie: req?.headers.cookie } }
  )
  return response.data
}

const getRecords = async (req?: NextRequest): Promise<Record[]> => {
  const response = await axios.get(
    '/record',
    { headers: { Cookie: req?.headers.cookie } }
  )
  return response.data
}

const createRecord = async (data: RecordForCreation, req?: NextRequest): Promise<Record> => {
  const { name, description, category_id } = data

  const response = await axios.post(
    '/record/create',
    { name, description, category_id },
    { headers: { Cookie: req?.headers.cookie } }
  )
  return response.data
}

const updateRecord = async (data: RecordForUpdate, req?: NextRequest): Promise<Record> => {
  const {
    id,
    name,
    description,
    category_id,
  } = data

  const response = await axios.patch(
    `/record/update/${id}`,
    { name, description, category_id },
    { headers: { Cookie: req?.headers.cookie } }
  )
  return response.data
}

const removeRecord = async (data: RecordForDeletion, req?: NextRequest): Promise<Record> => {
  const { id } = data

  const response = await axios.delete(
    `/record/remove/${id}`,
    { headers: { Cookie: req?.headers.cookie } }
  )
  return response.data
}

const getRefsByRecordId = async (data: RecordId, req?: NextRequest): Promise<Ref[]> => {
  const { id } = data

  const response = await axios.get(
    `/record/${id}/refs`,
    { headers: { Cookie: req?.headers.cookie } }
  )
  return response.data
}

const createRecordWithRefs = async (data: RecordForCreationWithRefs, req?: NextRequest): Promise<Record> => {
  const {
    name,
    description,
    category_id,
    refs,
  } = data

  const record = await createRecord(
    { name, description, category_id },
    req
  )

  await Promise.all(refs.map(async ref =>
    await createRef({
      record_id: record.id,
      content: ref.content,
    })
  ))

  return record
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
          record_id: id,
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
          record_id: id,
        },
        req
      )
    )
  )

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
