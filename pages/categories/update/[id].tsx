import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'

import { GetServerSideProps, NextPage } from 'next'
import { Category, CategoryForUserUpdate } from 'types/Category'

import { updateCategory, getCategoryById } from 'api/category'

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

interface UpdateCategoryPageProps {
  category: Category
}

const UpdateCategoryPage: NextPage<UpdateCategoryPageProps> = ({ category }) => {
  const toast = useToast()
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<CategoryForUserUpdate>()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSubmit: SubmitHandler<CategoryForUserUpdate> = (data) => {
    setIsLoading(true)

    updateCategory({ id: category.id, ...data })
      .then(category => {
        toast({
          title: `A categoria ${category.name} foi editada com sucesso.`,
          status: 'success',
        })
        void router.push('/categories')
      })
      .catch(err => {
        toast({
          title: 'Ocorreu um erro na edição da categoria.',
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
        <title>Trama - Editar categoria</title>
        <meta name="description" content="Editar categoria" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxW='800px'>
        <Heading size='2xl' textAlign='center' pb='8'>
          Editar categoria
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isRequired isInvalid={errors.name !== undefined}>
            <FormLabel>Nome</FormLabel>
            <Input
              type='text'
              placeholder='Nome da categoria'
              {...register('name', { required: 'O campo nome é obrigatório.' })}
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
  const id = context.params?.id ?? null
  let category: Category

  if (id === null || Array.isArray(id)) return { notFound: true }

  try {
    category = await getCategoryById(parseInt(id))
  } catch (err) {
    return { notFound: true }
  }

  return {
    props: { category },
  }
}

export default UpdateCategoryPage
