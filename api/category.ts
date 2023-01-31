import { customAxios as axios, NextRequest } from './'

import {
  Record,
  RecordForCategoriesByRecords,
} from 'types/Record'
import {
  Category,
  CategoryId,
  CategoryForCreation,
  CategoryForUpdate,
  CategoryForDeletion,
} from 'types/Category'

import { getErrorMessage } from 'helpers'

const getCategoryById = async (data: CategoryId, req?: NextRequest): Promise<Category> => {
  const { id } = data

  try {
    const response = await axios.get(
      `/category/${id}`,
      { headers: { Cookie: req?.headers.cookie } }
    )
    return response.data
  } catch (err) {
    throw new Error(`Erro ao buscar a categoria: ${getErrorMessage(err)}`)
  }
}

const getCategories = async (req?: NextRequest): Promise<Category[]> => {
  try {
    const response = await axios.get(
      '/category',
      { headers: { Cookie: req?.headers.cookie } }
    )
    return response.data
  } catch (err) {
    throw new Error(`Erro ao buscar categorias: ${getErrorMessage(err)}`)
  }
}

const createCategory = async (data: CategoryForCreation, req?: NextRequest): Promise<Category> => {
  const { name, description } = data

  try {
    const response = await axios.post(
      '/category/create',
      { name, description },
      { headers: { Cookie: req?.headers.cookie } }
    )
    return response.data
  } catch (err) {
    throw new Error(`Erro ao criar a categoria: ${getErrorMessage(err)}`)
  }
}

const updateCategory = async (data: CategoryForUpdate, req?: NextRequest): Promise<Category> => {
  const { id, name, description } = data

  try {
    const response = await axios.patch(
      `/category/update/${id}`,
      { name, description },
      { headers: { Cookie: req?.headers.cookie } }
    )
    return response.data
  } catch (err) {
    throw new Error(`Erro ao atualizar a categoria: ${getErrorMessage(err)}`)
  }
}

const removeCategory = async (data: CategoryForDeletion, req?: NextRequest): Promise<Category> => {
  const { id } = data

  try {
    const response = await axios.delete(
      `/category/remove/${id}`,
      { headers: { Cookie: req?.headers.cookie } }
    )
    return response.data
  } catch (err) {
    throw new Error(`Erro ao remover a categoria: ${getErrorMessage(err)}`)
  }
}

const getRecordsByCategoryId = async (data: CategoryId, req?: NextRequest): Promise<Record[]> => {
  const { id } = data

  try {
    const response = await axios.get(
      `/category/${id}/record`,
      { headers: { Cookie: req?.headers.cookie } }
    )
    return response.data
  } catch (err) {
    throw new Error(`Erro ao buscar os registros da categoria: ${getErrorMessage(err)}`)
  }
}

const getCategoriesByRecords = async (data: RecordForCategoriesByRecords, req?: NextRequest): Promise<Category[]> => {
  const { records } = data

  try {
    const categoryIds: Array<Category['id']> = records.map(record => record.category_id)
    const uniqueCategoryIds = Array.from(new Set(categoryIds))

    const categories = []
    for (const categoryId of uniqueCategoryIds) {
      const category = await getCategoryById({ id: categoryId }, req)
      categories.push(category)
    }

    return categories
  } catch (err) {
    throw new Error(`Erro ao buscar categories: ${getErrorMessage(err)}`)
  }
}

export {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  removeCategory,
  getRecordsByCategoryId,
  getCategoriesByRecords,
}
