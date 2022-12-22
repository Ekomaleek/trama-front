import React, { useState } from 'react'
import Head from 'next/head'
import { useForm, SubmitHandler } from 'react-hook-form'

import { NextPage } from 'next'
import { CategoryForCreation } from 'types/Category'

import { createCategory } from 'api/category'
import { useRouter } from 'next/router'

import {
  Container,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  useToast,
} from '@chakra-ui/react'

const CategoriesPage: NextPage = () => {
  const toast = useToast()
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<CategoryForCreation>()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSubmit: SubmitHandler<CategoryForCreation> = (data) => {
    setIsLoading(true)

    createCategory(data)
      .then(category => {
        toast({
          title: `A categoria ${category.name} foi criada com sucesso.`,
          status: 'success',
        })
        void router.push('/categories')
      })
      .catch(err => {
        toast({
          title: 'Ocorreu um erro na criação da categoria.',
          description: err.message,
          status: 'error',
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <>
      <Head>
        <title>Trama - Criar categoria</title>
        <meta name="description" content="Criar categoria" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxW='800px'>
        <Heading size='2xl' textAlign='center' pb='8'>
          Criar categoria
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isRequired isInvalid={errors.name !== undefined}>
            <FormLabel>Nome</FormLabel>
            <Input
              type='text'
              placeholder='Nome da categoria'
              {...register('name', { required: 'O campo nome é obrigatório.' })}
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

export default CategoriesPage
