import { Record } from './Record'

type Ref = {
  id: number
  content: string
  subject_id: Record['id']
}

type RefForCreation = Pick<Ref, 'content' | 'subject_id'>

type RefForUpdate = Ref

type RefForUserUpdate = Pick<Ref, 'content'>

type RefForDeletion = Pick<Ref, 'id'>

export type {
  Ref,
  RefForCreation,
  RefForUpdate,
  RefForUserUpdate,
  RefForDeletion,
}
