import React, { useState } from 'react'
import Head from 'next/head'

import { GetServerSideProps, NextPage } from 'next'
import { Category } from 'types/Category'

import { editCategory, getCategoryById } from 'api/category'

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

interface EditCategoryProps {
  category: Category
}

const EditCategoryPage: NextPage<EditCategoryProps> = ({ category }) => {
  const toast = useToast()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [name, setName] = useState<Category['name']>(category.name)
  const [description, setDescription] = useState<Category['name']>(category.description)

  const handleNameChange = (event: React.FormEvent<HTMLInputElement>): void => {
    setName(event.currentTarget.value)
  }

  const handleDescriptionChange = (event: React.FormEvent<HTMLInputElement>): void => {
    setDescription(event.currentTarget.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setIsLoading(true)

    editCategory({ id: category.id, name, description })
      .then(category => toast({
        title: `A categoria ${category.name} foi editada com sucesso.`,
        status: 'success',
      }))
      .catch(err => toast({
        title: 'Ocorreu um erro na edição da categoria.',
        description: err.message,
        status: 'error',
      }))
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

        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel>Nome</FormLabel>
            <Input
              type='text'
              placeholder='Nome da categoria'
              value={name}
              onChange={handleNameChange}
            />
          </FormControl>

          <FormControl pt='4'>
            <FormLabel>Descrição</FormLabel>
            <Input
              type='text'
              placeholder='Descrição da categoria'
              value={description}
              onChange={handleDescriptionChange}
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

export default EditCategoryPage
