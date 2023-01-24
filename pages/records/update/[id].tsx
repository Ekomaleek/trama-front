import React from 'react'
import Head from 'next/head'
import { yupResolver } from '@hookform/resolvers/yup'
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
import { recordForUserUpdateWithRefsSchema } from 'helpers/input-validation/schemas/record'

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
  Textarea,
} from '@chakra-ui/react'

type UpdateRecordPageProps = {
  categories: Category[]
  record: Record
  refs: Ref[]
}

const UpdateRecordPage: NextPage<UpdateRecordPageProps> = ({ categories, record, refs }) => {
  const { isLoading, makeRequest } = useApi<Record, RecordForUpdateWithRefs>()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RecordForUserUpdateWithRefs>({
    resolver: yupResolver(recordForUserUpdateWithRefsSchema),
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
      successMessage: `O registro ${record.name} foi editado com sucesso.`,
      withRedirect: 'back',
    })
  }

  return (
    <>
      <Head>
        <title>Trama - Editar registro</title>
        <meta name='description' content='Editar registro' />
        <link rel='icon' href='/favicon.ico' />
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
              {...register('name')}
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
              {...register('category_id')}
            >
              {categories.map(category =>
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              )}
            </Select>
            <FormErrorMessage>{errors.category_id?.message}</FormErrorMessage>
          </FormControl>

          <FormControl
            pt='4'
            isInvalid={errors.refs !== undefined}
          >
            <Box display='flex'>
              <FormLabel>Referência(s)</FormLabel>
              <IconButton
                icon={<AddIcon />}
                aria-label='Adicionar referência'
                size='xs'
                onClick={() => append({
                  id: 0,
                  content: '',
                  record_id: record.id,
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
                  mt={index !== 0 ? '4' : '0'}
                  {...register(`refs.${index}.content`)}
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
            <FormErrorMessage>Preencha referência(s) ou remova-a(s).</FormErrorMessage>
          </FormControl>

          <FormControl pt='4'>
            <FormLabel>Descrição</FormLabel>
            <Textarea
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
            Editar registro
          </Button>
        </form>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const id = context.params?.id ?? null
    if (id === null || Array.isArray(id)) throw new Error('404')

    const record = await getRecordById(
      { id: parseInt(id) },
      context.req,
    )
    const categories = await getCategories(context.req)
    const refs = await getRefsByRecordId(
      { id: parseInt(id) },
      context.req,
    )

    return {
      props: {
        categories,
        record,
        refs,
      },
    }
  } catch (err) {
    return { notFound: true }
  }
}

export default UpdateRecordPage
