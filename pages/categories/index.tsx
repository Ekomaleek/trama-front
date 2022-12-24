import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { NextPage, GetServerSideProps } from 'next'
import { Category } from 'types/Category'

import { getCategories } from 'api/category'

import NextLink from 'next/link'
import CategoryCard from 'components/Card/Category'
import {
  Container,
  Heading,
  Text,
  Box,
  Button,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'

interface CategoriesPageProps {
  categories: Category[]
  error: string
}

const CategoriesPage: NextPage<CategoriesPageProps> = ({ categories, error }) => {
  const router = useRouter()
  const [shouldUpdate, setShouldUpdate] = useState<boolean>(false)

  // Reload page props if a category gets removed
  useEffect(() => {
    if (shouldUpdate) {
      void router.replace(router.asPath)
      setShouldUpdate(false)
    }
  }, [shouldUpdate, router])

  return (
    <>
      <Head>
        <title>Trama - Categorias</title>
        <meta name="description" content="Trama - Categorias de usuário" />
        <link rel="icon" href="/favicon.ico" />
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
            Ocorreu um erro ao buscar suas categorias:<br/>
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

        <Wrap justify='center' spacing='4'>
          {categories.map((category) =>
            <WrapItem key={category.id}>
              <CategoryCard category={category} setShouldUpdate={setShouldUpdate} />
            </WrapItem>
          )}
        </Wrap>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  let error = ''
  const categories = await getCategories()
    .catch(err => {
      error = err.message
      return []
    })

  return {
    props: { categories, error },
  }
}

export default CategoriesPage
