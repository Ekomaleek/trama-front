import Head from 'next/head'

import { NextPage, GetServerSideProps } from 'next'
import { Category } from 'types/Category'

import { getCategories } from 'api/category'
import { getErrorMessage } from 'helpers'

import NextLink from 'next/link'
import CategoryCard from 'components/Card/Category'
import {
  Container,
  Heading,
  Text,
  Box,
  Button,
  SimpleGrid,
} from '@chakra-ui/react'

type CategoriesPageProps = {
  categories: Category[]
  error: string
}

const CategoriesPage: NextPage<CategoriesPageProps> = ({ categories, error }) => {
  return (
    <>
      <Head>
        <title>Trama - Categorias</title>
        <meta name='description' content='Trama - Categorias de usuário' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Container maxW='100%'>
        <Heading size='2xl' textAlign='center'>
          Categorias
        </Heading>

        <Text textAlign='center' pt='4'>
          Categorias agrupam registros que você criar.
        </Text>

        <Box textAlign='center' py='8'>
          <NextLink href='categories/create'>
            <Button size='lg'>
              Criar categoria
            </Button>
          </NextLink>
        </Box>

        {
          error !== '' &&
          <Text textAlign='center' fontSize='xl' fontWeight='bold' color='red.500'>
            Ocorreu um erro ao buscar suas categorias:
            <br />
            {error}
          </Text>
        }

        {
          categories.length === 0 &&
          error === '' &&
          <Text textAlign='center' fontSize='xl' fontWeight='500'>
            Você ainda não tem nenhuma categoria cadastrada.
          </Text>
        }

        <SimpleGrid
          gridTemplateColumns='repeat(auto-fit, 300px)'
          gap='4'
          justifyContent='center'
        >
          {categories.map((category) =>
            <CategoryCard
              key={category.id}
              category={category}
            />
          )}
        </SimpleGrid>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const categories = await getCategories(req)
    return {
      props: {
        categories,
        error: '',
      },
    }
  } catch (err) {
    return {
      props: {
        categories: [],
        error: getErrorMessage(err),
      },
    }
  }
}

export default CategoriesPage
