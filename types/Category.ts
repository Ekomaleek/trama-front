import { CategoryFromSchema } from 'helpers/input-validation/schemas/category'

type Category = CategoryFromSchema

type CategoryForCreation = Pick<Category, 'name' | 'description'>

type CategoryForUpdate = Category

type CategoryForUserUpdate = Pick<Category, 'name' | 'description'>

type CategoryForDeletion = Pick<Category, 'id'>

type CategoryId = Pick<Category, 'id'>

export type {
  Category,
  CategoryForCreation,
  CategoryForUpdate,
  CategoryForUserUpdate,
  CategoryForDeletion,
  CategoryId,
}
