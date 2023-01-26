import Head from 'next/head'
import { GetServerSideProps, NextPage } from 'next'

import { Record } from 'types/Record'

import { getRecords } from 'api/record'
import { getErrorMessage } from 'helpers'
import { useUser } from 'context/user'

import {
  Container,
  Heading,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import RecordCard from 'components/Card/Record'

type DashboardPageProps = {
  records: Record[]
  error?: string
}

const DashboardPage: NextPage<DashboardPageProps> = ({ records, error }) => {
  const { user } = useUser()

  return (
    <>
      <Head>
        <title>Trama - Dashboard</title>
        <meta name='description' content='Trama - Dashboard de usuário' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Container maxW='100%'>
        <Heading size='2xl' textAlign='center'>
          Bem vindo, {user?.username ?? 'usuário'}
        </Heading>

        <Heading
          size='md'
          textAlign='center'
          pt='8'
        >
          Seus últimos registros:
        </Heading>

        {
          error !== undefined &&
          <Text
            textAlign='center'
            fontSize='xl'
            fontWeight='bold'
            color='red.500'
            pt='4'
          >
            Ocorreu um erro ao buscar seus registros:<br />
            {error}
          </Text>
        }

        {
          records.length === 0 &&
          error === undefined &&
          <Text
            textAlign='center'
            fontSize='xl'
            fontWeight='300'
            pt='4'
          >
            Você ainda não tem nenhum registro cadastrado.
          </Text>
        }

        <SimpleGrid
          gridTemplateColumns='repeat(auto-fit, 300px)'
          gap='4'
          justifyContent='center'
          pt='8'
        >
          {records.map((record) =>
            <RecordCard
              key={record.id}
              record={record}
              redirectOnRemoval='/dashboard'
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

export default DashboardPage
