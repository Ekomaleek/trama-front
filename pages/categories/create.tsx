import React, { useState } from 'react'
import Head from 'next/head'

import { NextPage } from 'next'
import { Category } from 'types/Category'

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

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [name, setName] = useState<Category['name']>('')
  const [description, setDescription] = useState<Category['description']>('')

  const handleNameChange = (event: React.FormEvent<HTMLInputElement>): void => {
    setName(event.currentTarget.value)
  }

  const handleDescriptionChange = (event: React.FormEvent<HTMLInputElement>): void => {
    setDescription(event.currentTarget.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setIsLoading(true)

    createCategory({ name, description })
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
            Criar categoria
          </Button>
        </form>
      </Container>
    </>
  )
}

export default CategoriesPage
