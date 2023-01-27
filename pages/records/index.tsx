import Head from 'next/head'

import { NextPage, GetServerSideProps } from 'next'
import { Record } from 'types/Record'

import { getRecords } from 'api/record'
import { getErrorMessage } from 'helpers'

import NextLink from 'next/link'
import RecordCard from 'components/Card/Record'
import {
  Container,
  Heading,
  Text,
  Box,
  Button,
  SimpleGrid,
} from '@chakra-ui/react'

type RecordsPageProps = {
  records: Record[]
  error?: string
}

const RecordsPage: NextPage<RecordsPageProps> = ({ records, error }) => {
  return (
    <>
      <Head>
        <title>Trama - Registros</title>
        <meta name='description' content='Trama - Registros de usuário' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Container maxW='100%'>
        <Heading size='2xl' textAlign='center'>
          Registros
        </Heading>

        <Text textAlign='center' pt='4'>
          Catalogue seus registros.
        </Text>

        <Box textAlign='center' py='8'>
          <NextLink href='records/create'>
            <Button size='lg'>
              Criar registro
            </Button>
          </NextLink>
        </Box>

        {
          error !== undefined &&
          <Text textAlign='center' fontSize='xl' fontWeight='bold' color='red.500'>
            Ocorreu um erro ao buscar seus registros:<br />
            {error}
          </Text>
        }

        {
          records.length === 0 &&
          error === undefined &&
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
            />
          )}
        </SimpleGrid>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const records = await getRecords(req)
    return {
      props: {
        records,
      },
    }
  } catch (err) {
    return {
      props: {
        records: [],
        error: getErrorMessage(err),
      },
    }
  }
}

export default RecordsPage
