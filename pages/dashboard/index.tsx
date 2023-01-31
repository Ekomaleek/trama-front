import Head from 'next/head'
import { GetServerSideProps, NextPage } from 'next'

import { Record } from 'types/Record'
import { Category } from 'types/Category'

import { getRecords } from 'api/record'
import { getCategoriesByRecords } from 'api/category'
import { getErrorMessage } from 'helpers'
import { useUser } from 'context/user'

import Link from 'components/_core/Link'
import RecordCard from 'components/Card/Record'
import {
  Container,
  Heading,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'

type DashboardPageProps = {
  records: Record[]
  categories: Category[]
  error?: string
}

const DashboardPage: NextPage<DashboardPageProps> = ({ records, categories, error }) => {
  const { user } = useUser()

  return (
    <>
      <Head>
        <title>Trama - Dashboard</title>
        <meta name='description' content='Trama - Dashboard de usuário' />
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
            Você ainda não tem nenhum registro cadastrado. <br />
            Comece <Link href='/categories/create'>criando uma categoria</Link>. <br />
            Se já tiver uma categoria cadastrada, <Link href='/records/create'>crie um registro</Link>.
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
              category={categories.find(category =>
                category.id === record.category_id
              )}
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
    const categories = await getCategoriesByRecords({ records }, req)

    return {
      props: {
        records,
        categories,
      },
    }
  } catch (err) {
    return {
      props: {
        records: [],
        categories: [],
        error: getErrorMessage(err),
      },
    }
  }
}

export default DashboardPage
