interface Category {
  id: number
  name: string
  description: string
}

type CategoryForCreation = Pick<Category, 'name' | 'description'>

type CategoryForUpdate = Category

type CategoryForUserUpdate = Pick<Category, 'name' | 'description'>

type CategoryForDeletion = Pick<Category, 'id'>

export type {
  Category,
  CategoryForCreation,
  CategoryForUpdate,
  CategoryForUserUpdate,
  CategoryForDeletion,
}
