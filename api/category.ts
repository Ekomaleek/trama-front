import axios from 'axios'

import { Record } from 'types/Record'
import {
  Category,
  CategoryForCreation,
  CategoryForUpdate,
  CategoryForDeletion,
} from 'types/Category'

import { getErrorMessage } from 'helpers'

import { BASE_URL } from './'

const getCategoryById = async (id: Category['id']): Promise<Category> => {
  try {
    const response = await axios.get(`${BASE_URL}/category/${id}`)
    return response.data
  } catch (err) {
    throw new Error(`Erro ao buscar a categoria: ${getErrorMessage(err)}`)
  }
}

const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/category`)
    return response.data
  } catch (err) {
    throw new Error(`Erro ao buscar categorias: ${getErrorMessage(err)}`)
  }
}

const createCategory = async ({ name, description }: CategoryForCreation): Promise<Category> => {
  try {
    const response = await axios.post(`${BASE_URL}/category/create`, { name, description })
    return response.data
  } catch (err) {
    throw new Error(`Erro ao criar a categoria: ${getErrorMessage(err)}`)
  }
}

const updateCategory = async ({ id, name, description }: CategoryForUpdate): Promise<Category> => {
  try {
    const response = await axios.patch(`${BASE_URL}/category/update/${id}`, { name, description })
    return response.data
  } catch (err) {
    throw new Error(`Erro ao atualizar a categoria: ${getErrorMessage(err)}`)
  }
}

const removeCategory = async ({ id }: CategoryForDeletion): Promise<Category> => {
  try {
    const response = await axios.delete(`${BASE_URL}/category/remove/${id}`)
    return response.data
  } catch (err) {
    throw new Error(`Erro ao remover a categoria: ${getErrorMessage(err)}`)
  }
}

const getRecordsByCategoryId = async (id: Category['id']): Promise<Record[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/category/${id}/subject`)
    return response.data
  } catch (err) {
    throw new Error(`Erro ao buscar os registros da categoria: ${getErrorMessage(err)}`)
  }
}

export {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  removeCategory,
  getRecordsByCategoryId,
}
