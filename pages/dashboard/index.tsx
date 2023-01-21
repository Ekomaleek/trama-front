import Head from 'next/head'

import { NextPage } from 'next'

import { Container, Heading } from '@chakra-ui/react'

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Trama - Dashboard</title>
        <meta name='description' content='Trama - Dashboard de usuário' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Container maxW='100%'>
        <Heading size='2xl' textAlign='center'>
          Bem vindo, usuário
        </Heading>
      </Container>
    </>
  )
}

export default HomePage
