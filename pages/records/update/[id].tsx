import React from 'react'
import Head from 'next/head'
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'

import { GetServerSideProps, NextPage } from 'next'
import { Category } from 'types/Category'
import { Ref } from 'types/Ref'
import {
  Record,
  RecordForUpdateWithRefs,
  RecordForUserUpdateWithRefs,
} from 'types/Record'

import { useApi } from 'hooks/use-api'
import { getCategories } from 'api/category'
import { getRecordById, getRefsByRecordId, updateRecordWithRefs } from 'api/record'

import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import {
  Container,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Select,
  Box,
  IconButton,
} from '@chakra-ui/react'

interface UpdateRecordPageProps {
  categories: Category[]
  record: Record
  refs: Ref[]
  error: string
}

const UpdateRecordPage: NextPage<UpdateRecordPageProps> = ({ categories, record, refs, error }) => {
  const { isLoading, makeRequest } = useApi<Record, RecordForUpdateWithRefs>()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RecordForUserUpdateWithRefs>({
    defaultValues: {
      name: record.name,
      description: record.description,
      category_id: record.category_id,
      refs,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'refs',
  })

  const onSubmit: SubmitHandler<RecordForUserUpdateWithRefs> = async (data) => {
    await makeRequest({
      apiMethod: updateRecordWithRefs,
      apiMethodArgs: {
        id: record.id,
        name: data.name,
        description: data.description,
        category_id: data.category_id,
        refs: data.refs,
        originalRefs: refs,
      },
      withRedirect: '/records',
      successMessage: `O registro ${record.name} foi editado com sucesso.`,
    })
  }

  return (
    <>
      <Head>
        <title>Trama - Editar registro</title>
        <meta name="description" content="Editar registro" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <Heading size='2xl' textAlign='center' pb='8'>
          Editar registro
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            isRequired
            isInvalid={errors.name !== undefined}
          >
            <FormLabel>Nome</FormLabel>
            <Input
              type='text'
              placeholder='Nome do registro'
              {...register(
                'name',
                { required: 'O campo nome é obrigatório.' }
              )}
            />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>

          <FormControl
            isRequired
            isInvalid={errors.category_id !== undefined}
            pt='4'
          >
            <FormLabel>Categoria</FormLabel>
            <Select
              placeholder='Escolha uma categoria'
              {...register(
                'category_id',
                { required: 'O campo categoria é obrigatório.' }
              )}
            >
              {categories.map(category =>
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              )}
            </Select>
            <FormErrorMessage>{errors.category_id?.message}</FormErrorMessage>
          </FormControl>

          <FormControl pt='4'>
            <Box display='flex'>
              <FormLabel>Referência(s)</FormLabel>
              <IconButton
                icon={<AddIcon />}
                aria-label='Adicionar referência'
                size='xs'
                onClick={() => append({
                  id: 0,
                  content: '',
                  subject_id: record.id,
                })}
              />
            </Box>
            {fields.map((field, index) =>
              <Box
                key={field.id}
                display='flex'
                alignItems='flex-end'
              >
                <Input
                  key={field.id}
                  type='text'
                  placeholder='Referência (artigo, documentação, material de estudo...)'
                  {...register(`refs.${index}.content`)}
                  mt={index !== 0 ? '4' : '0'}
                />
                <IconButton
                  icon={<DeleteIcon />}
                  aria-label='Remover referência'
                  onClick={() => remove(index)}
                  ml='4'
                  size='sm'
                />
              </Box>
            )}
          </FormControl>

          <FormControl pt='4'>
            <FormLabel>Descrição</FormLabel>
            <Input
              type='text'
              placeholder='Descrição do registro'
              {...register('description')}
            />
          </FormControl>

          <Button
            type='submit'
            w='100%'
            mt='8'
            isLoading={isLoading}
          >
            Editar categoria
          </Button>
        </form>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Categories
  let error = ''
  const categories = await getCategories()
    .catch(err => {
      error = err.message
      return []
    })

  // Record
  const id = context.params?.id ?? null
  let record: Record

  if (id === null || Array.isArray(id)) return { notFound: true }

  try {
    record = await getRecordById(parseInt(id))
  } catch (err) {
    return { notFound: true }
  }

  // Refs
  let refs: Ref[]
  try {
    refs = await getRefsByRecordId(parseInt(id))
  } catch (err) {
    return { notFound: true }
  }

  return {
    props: { categories, record, refs, error },
  }
}

export default UpdateRecordPage
