import React from 'react'
import Head from 'next/head'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { NextPage } from 'next'
import { Category, CategoryForCreation } from 'types/Category'

import { useApi } from 'hooks/use-api'
import { createCategory } from 'api/category'
import { categoryForCreationSchema } from 'helpers/input-validation/schemas/category'

import {
  Container,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
} from '@chakra-ui/react'

const CreateCategoryPage: NextPage = () => {
  const { isLoading, makeRequest } = useApi<Category, CategoryForCreation>()
  const { register, handleSubmit, formState: { errors } } = useForm<CategoryForCreation>({
    resolver: yupResolver(categoryForCreationSchema),
  })

  const onSubmit: SubmitHandler<CategoryForCreation> = async (data) => {
    await makeRequest({
      apiMethod: createCategory,
      apiMethodArgs: data,
      successMessage: `A categoria ${data.name} foi criada com sucesso.`,
      withRedirect: '/categories',
    })
  }

  return (
    <>
      <Head>
        <title>Trama - Criar categoria</title>
        <meta name='description' content='Criar categoria' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Container>
        <Heading size='2xl' textAlign='center' pb='8'>
          Criar categoria
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isRequired isInvalid={errors.name !== undefined}>
            <FormLabel>Nome</FormLabel>
            <Input
              type='text'
              placeholder='Nome da categoria'
              {...register('name')}
            />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>

          <FormControl pt='4'>
            <FormLabel>Descrição</FormLabel>
            <Input
              type='text'
              placeholder='Descrição da categoria'
              {...register('description')}
            />
          </FormControl>

          <Button
            type='submit'
            w='100%'
            mt='8'
            isLoading={isLoading}
          >
            Criar categoria
          </Button>
        </form>
      </Container>
    </>
  )
}

export default CreateCategoryPage
