import React from 'react'
import Head from 'next/head'

import { NextPage, GetServerSideProps } from 'next'
import { Category } from 'types/Category'
import { Record, RecordForDeletion } from 'types/Record'
import { Ref } from 'types/Ref'

import { getCategoryById } from 'api/category'
import { getRecordById, getRefsByRecordId, removeRecord } from 'api/record'
import { useApi } from 'hooks/use-api'

import NextLink from 'next/link'
import Dialog from 'components/Dialog'
import {
  Container,
  Heading,
  Text,
  Box,
  Flex,
  Button,
  useDisclosure,
} from '@chakra-ui/react'

type RecordPageProps = {
  record: Record
  refs: Ref[]
  category: Category
}

const RecordPage: NextPage<RecordPageProps> = ({ record, refs, category }) => {
  const { isLoading, makeRequest } = useApi<Record, RecordForDeletion>()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleDelete = async (): Promise<void> => {
    await makeRequest({
      apiMethod: removeRecord,
      apiMethodArgs: { id: record.id },
      successMessage: `O registro ${record.name} foi removido com sucesso.`,
      finallyCallback: () => onClose(),
      withRedirect: 'back',
    })
  }

  return (
    <>
      <Head>
        <title>Trama - Visualizar registro</title>
        <meta name='description' content='Visualizar registro' />
      </Head>

      <Container>
        <Heading size='2xl' textAlign='center'>
          {record.name}
        </Heading>

        <Heading size='md' textAlign='center' pt='4'>
          {category.name}
        </Heading>

        <Flex
          pt='8'
          justifyContent='center'
        >
          <NextLink href={`/records/update/${record.id}`}>
            <Button mr='4'>
              Editar
            </Button>
          </NextLink>
          <Button colorScheme='red' onClick={onOpen}>
            Remover
          </Button>
        </Flex>

        <Box pt='8'>
          {refs.map(ref =>
            <Text
              key={ref.id}
              fontSize='sm'
              pb='2'
              textAlign='center'
            >
              {ref.content}
            </Text>
          )}
        </Box>

        <Text textAlign='center' pt='8'>
          {record.description}
        </Text>

        <Dialog
          isOpen={isOpen}
          onClose={onClose}
          isLoading={isLoading}
          callback={handleDelete}
          headerText='Remover registro'
          bodyText={`Tem certeza que deseja remover o registro ${record.name}?`}
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
    const record = await getRecordById(
      { id: parseInt(id) },
      context.req,
    )
    const refs = await getRefsByRecordId(
      { id: parseInt(id) },
      context.req
    )
    const category = await getCategoryById(
      { id: record.category_id },
      context.req
    )

    return {
      props: {
        record,
        refs,
        category,
      },
    }
  } catch (err) {
    return { notFound: true }
  }
}

export default RecordPage
