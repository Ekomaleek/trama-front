import React from 'react'
import Head from 'next/head'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'

import { Category } from 'types/Category'
import { NextPage, GetServerSideProps } from 'next'
import { Record, RecordForCreationWithRefs } from 'types/Record'

import { useApi } from 'hooks/use-api'
import { getCategories } from 'api/category'
import { createRecordWithRefs } from 'api/record'
import { recordForCreationWithRefsSchema } from 'helpers/input-validation/schemas/record'

import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import {
  Container,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  Button,
  Box,
  IconButton,
  Textarea,
} from '@chakra-ui/react'

type CreateRecordPageProps = {
  category_id: Category['id']
  categories: Category[]
}

const CreateRecordPage: NextPage<CreateRecordPageProps> = ({ category_id, categories }) => {
  const { isLoading, makeRequest } = useApi<Record, RecordForCreationWithRefs>()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RecordForCreationWithRefs>({
    resolver: yupResolver(recordForCreationWithRefsSchema),
    defaultValues: {
      category_id,
      refs: [{ content: '', subject_id: 0 }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'refs',
  })

  const onSubmit: SubmitHandler<RecordForCreationWithRefs> = async (data) => {
    await makeRequest({
      apiMethod: createRecordWithRefs,
      apiMethodArgs: { ...data },
      successMessage: `O registro ${data.name} foi criado com sucesso.`,
      withRedirect: 'back',
    })
  }

  return (
    <>
      <Head>
        <title>Trama - Criar registro</title>
        <meta name='description' content='Criar registro' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Container>
        <Heading size='2xl' textAlign='center' pb='8'>
          Criar registro
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
            pt='4'
            isRequired
            isInvalid={errors.category_id !== undefined}
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
                  subject_id: 0,
                  content: '',
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
            Criar registro
          </Button>
        </form>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const category_id = context.query?.category_id ?? null

  try {
    const categories = await getCategories(context.req)
    return {
      props: {
        category_id,
        categories,
      },
    }
  } catch (err) {
    return {
      props: {
        category_id,
        categories: [],
      },
    }
  }
}

export default CreateRecordPage
