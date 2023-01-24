import { object, string, number, array, InferType } from 'yup'
import { refForCreationSchema, refForUserUpdateSchema } from './ref'

const recordSchema = object({
  id: number()
    .required(),
  name: string()
    .required('O nome da categoria é obrigatório.'),
  description: string()
    .optional(),
  category_id: number()
    .typeError('O registro deve ser associado à uma categoria.')
    .required('O registro deve ser associado à uma categoria.'),
})

const recordForCreationSchema = recordSchema.pick([
  'name',
  'description',
  'category_id',
])

const recordForCreationWithRefsSchema = recordForCreationSchema
  .concat(object({
    refs: array().optional().of(refForCreationSchema),
  }))

const recordForUserUpdateSchema = recordSchema.pick([
  'name',
  'description',
  'category_id',
])

const recordForUserUpdateWithRefsSchema = recordForUserUpdateSchema
  .concat(object({
    refs: array().optional().of(refForUserUpdateSchema),
  }))

type RecordFromSchema = InferType<typeof recordSchema>

export type { RecordFromSchema }
export {
  recordSchema,
  recordForCreationSchema,
  recordForCreationWithRefsSchema,
  recordForUserUpdateSchema,
  recordForUserUpdateWithRefsSchema,
}
