import { object, string, number, InferType } from 'yup'

const categorySchema = object({
  id: number()
    .required(),
  name: string()
    .required('O nome da categoria é obrigatório.'),
  description: string()
    .optional(),
})

const categoryForCreationSchema = categorySchema.pick(['name', 'description'])

const categoryForUserUpdateSchema = categorySchema.pick(['name', 'description'])

type CategoryFromSchema = InferType<typeof categorySchema>

export type { CategoryFromSchema }
export {
  categorySchema,
  categoryForCreationSchema,
  categoryForUserUpdateSchema,
}
