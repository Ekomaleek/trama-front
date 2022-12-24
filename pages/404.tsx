import Head from 'next/head'

import { NextPage } from 'next'

import Link from 'components/_core/Link'
import { Container, Heading, Text } from '@chakra-ui/react'

const Page404: NextPage = () => {
  return (
    <>
      <Head>
        <title>Trama - 404</title>
        <meta name="description" content="Trama - 404" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxW='100%'>
        <Heading size='2xl' textAlign='center'>
          404 - Página não encontrada
        </Heading>

        <Text textAlign='center' pt='8'>
          Essa página não existe.<br />
          Volte para a <Link href='/'>página inicial</Link>.
        </Text>
      </Container>
    </>
  )
}

export default Page404
