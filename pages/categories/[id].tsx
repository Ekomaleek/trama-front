import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { NextPage, GetServerSideProps } from 'next'
import { Category, CategoryForDeletion } from 'types/Category'
import { Record } from 'types/Record'

import { useApi } from 'hooks/use-api'
import { getCategoryById, getRecordsByCategoryId, removeCategory } from 'api/category'

import NextLink from 'next/link'
import RecordCard from 'components/Card/Record'
import Dialog from 'components/Dialog'
import {
  Container,
  Heading,
  Text,
  Box,
  Button,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react'

type CategoryPageProps = {
  category: Category
  records: Record[]
}

const CategoryPage: NextPage<CategoryPageProps> = ({ category, records }) => {
  const { isLoading, makeRequest } = useApi<Category, CategoryForDeletion>()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleDelete = async (): Promise<void> => {
    await makeRequest({
      apiMethod: removeCategory,
      apiMethodArgs: { id: category.id },
      successMessage: `A categoria ${category.name} foi removida com sucesso.`,
      finallyCallback: () => onClose(),
      withRedirect: '/categories',
    })
  }

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
        <title>Trama - Categoria</title>
        <meta name="description" content="Trama - Categoria de usuário" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxW='100%'>
        <Heading size='2xl' textAlign='center'>
          {category.name}
        </Heading>

        <Text textAlign='center' pt='4'>
          {category.description}
        </Text>

        <Box textAlign='center' py='8'>
          <NextLink href={`/records/create?category_id=${category.id}`}>
            <Button mr='4'>
              Criar registro
            </Button>
          </NextLink>

          <NextLink href={`/categories/update/${category.id}`}>
            <Button mr='4'>
              Editar
            </Button>
          </NextLink>
          <Button colorScheme='red' onClick={onOpen}>
              Remover
          </Button>
        </Box>

        {
          records.length === 0 &&
          <Text textAlign='center' fontSize='xl' fontWeight='500'>
            Você ainda não tem nenhum registro cadastrado.
          </Text>
        }

        <SimpleGrid
          gridTemplateColumns='repeat(auto-fit, 300px)'
          gap='4'
          justifyContent='center'
        >
          {records.map((record) =>
            <RecordCard
              key={record.id}
              record={record}
              setShouldUpdate={setShouldUpdate}
            />
          )}
        </SimpleGrid>

        <Dialog
          isOpen={isOpen}
          onClose={onClose}
          isLoading={isLoading}
          callback={handleDelete}
          headerText='Remover registro'
          bodyText={`Tem certeza que deseja remover a categoria ${category.name}?`}
          actionBtnText='Remover'
        />
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id ?? null
  if (id === null || Array.isArray(id)) throw new Error('404')

  try {
    const category = await getCategoryById(parseInt(id))
    const records = await getRecordsByCategoryId(parseInt(id))
    return {
      props: {
        category,
        records,
      },
    }
  } catch (err) {
    return {
      notFound: true,
    }
  }
}

export default CategoryPage
