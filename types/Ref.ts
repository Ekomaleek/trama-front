import { RefFromSchema } from 'helpers/input-validation/schemas/ref'

type Ref = RefFromSchema

type RefForCreation = Pick<Ref, 'content' | 'record_id'>

type RefForUpdate = Ref

type RefForUserUpdate = Pick<Ref, 'content'>

type RefForDeletion = Pick<Ref, 'id'>

type RefId = Pick<Ref, 'id'>

export type {
  Ref,
  RefForCreation,
  RefForUpdate,
  RefForUserUpdate,
  RefForDeletion,
  RefId,
}
