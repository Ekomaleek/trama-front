import React from 'react'
import Head from 'next/head'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { GetServerSideProps, NextPage } from 'next'
import {
  Category,
  CategoryForUpdate,
  CategoryForUserUpdate,
} from 'types/Category'

import { useApi } from 'hooks/use-api'
import { updateCategory, getCategoryById } from 'api/category'
import { categoryForUserUpdateSchema } from 'helpers/input-validation/schemas/category'

import {
  Container,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
} from '@chakra-ui/react'

type UpdateCategoryPageProps = {
  category: Category
}

const UpdateCategoryPage: NextPage<UpdateCategoryPageProps> = ({ category }) => {
  const { isLoading, makeRequest } = useApi<Category, CategoryForUpdate>()
  const { register, handleSubmit, formState: { errors } } = useForm<CategoryForUserUpdate>({
    resolver: yupResolver(categoryForUserUpdateSchema),
  })

  const onSubmit: SubmitHandler<CategoryForUserUpdate> = async (data) => {
    await makeRequest({
      apiMethod: updateCategory,
      apiMethodArgs: { id: category.id, ...data },
      successMessage: `A categoria ${category.name} foi editada com sucesso.`,
      withRedirect: 'back',
    })
  }

  return (
    <>
      <Head>
        <title>Trama - Editar categoria</title>
        <meta name='description' content='Editar categoria' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Container>
        <Heading size='2xl' textAlign='center' pb='8'>
          Editar categoria
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isRequired isInvalid={errors.name !== undefined}>
            <FormLabel>Nome</FormLabel>
            <Input
              type='text'
              placeholder='Nome da categoria'
              {...register('name')}
              defaultValue={category.name}
            />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>

          <FormControl pt='4'>
            <FormLabel>Descrição</FormLabel>
            <Input
              type='text'
              placeholder='Descrição da categoria'
              {...register('description')}
              defaultValue={category.description}
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
  try {
    const id = context.params?.id ?? null
    if (id === null || Array.isArray(id)) throw new Error('404')

    const category = await getCategoryById(
      { id: parseInt(id) },
      context.req
    )
    return { props: { category } }
  } catch (err) {
    return { notFound: true }
  }
}

export default UpdateCategoryPage
