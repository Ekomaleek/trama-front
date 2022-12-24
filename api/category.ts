import axios from 'axios'

import {
  Category,
  CategoryForCreation,
  CategoryForUpdate,
  CategoryForDeletion,
} from 'types/Category'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

const getCategories = async (): Promise<Category[]> => {
  const response = await axios
    .get(`${BASE_URL}/category`)
    .catch((err: Error) => {
      throw new Error(`Erro ao buscar categorias: ${err.message}`)
    })

  return response.data
}

const getCategoryById = async (id: Category['id']): Promise<Category[]> => {
  const response = await axios
    .get(`${BASE_URL}/category/${id}`)
    .catch((err: Error) => {
      throw new Error(`Erro ao buscar a categoria: ${err.message}`)
    })

  return response.data
}

const createCategory = async ({ name, description }: CategoryForCreation): Promise<Category[]> => {
  const response = await axios
    .post(`${BASE_URL}/category/create`, {
      name,
      description,
    })
    .catch((err: Error) => {
      throw new Error(`Erro ao criar a categoria: ${err.message}`)
    })

  return response.data
}

const updateCategory = async ({ id, name, description }: CategoryForUpdate): Promise<Category[]> => {
  const response = await axios
    .patch(`${BASE_URL}/category/update/${id}`, {
      name,
      description,
    })
    .catch((err: Error) => {
      throw new Error(`Erro ao atualizar a categoria: ${err.message}`)
    })

  return response.data
}

const removeCategory = async ({ id }: CategoryForDeletion): Promise<Category[]> => {
  const response = await axios
    .delete(`${BASE_URL}/category/remove/${id}`)
    .catch((err: Error) => {
      throw new Error(`Erro ao remover a categoria: ${err.message}`)
    })

  return response.data
}

export {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  removeCategory,
}
