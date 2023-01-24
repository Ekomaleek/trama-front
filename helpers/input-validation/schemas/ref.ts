import { object, string, number, InferType } from 'yup'

const refSchema = object({
  id: number()
    .required(),
  content: string()
    .required('O conteúdo da referência é obrigatório.'),
  record_id: number()
    .required(),
})

const refForCreationSchema = refSchema.pick([
  'content',
  'record_id',
])

const refForUserUpdateSchema = refSchema.pick(['content'])

type RefFromSchema = InferType<typeof refSchema>

export type { RefFromSchema }
export {
  refSchema,
  refForCreationSchema,
  refForUserUpdateSchema,
}
