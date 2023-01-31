import { RecordFromSchema } from 'helpers/input-validation/schemas/record'
import { Ref, RefForCreation, RefForUpdate } from './Ref'

type Record = RecordFromSchema

type RecordForCreation = Pick<Record, 'name' | 'description' | 'category_id'>

type RecordForCreationWithRefs = RecordForCreation & { refs: RefForCreation[] }

type RecordForUpdate = Record

type RecordForUpdateWithRefs = Record & { refs: RefForUpdate[], originalRefs: Ref[] }

type RecordForUserUpdate = Pick<Record, 'name' | 'description' | 'category_id'>

type RecordForUserUpdateWithRefs = RecordForUserUpdate & { refs: Ref[] }

type RecordForDeletion = Pick<Record, 'id'>

type RecordId = Pick<Record, 'id'>

type RecordForCategoriesByRecords = { records: Record[] }

export type {
  Record,
  RecordForCreation,
  RecordForCreationWithRefs,
  RecordForUpdate,
  RecordForUpdateWithRefs,
  RecordForUserUpdate,
  RecordForUserUpdateWithRefs,
  RecordForDeletion,
  RecordId,
  RecordForCategoriesByRecords,
}
