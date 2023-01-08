import Head from 'next/head'

import { NextPage } from 'next'

import NextLink from 'next/link'
import {
  Container,
  Heading,
  Text,
  Flex,
  Button,
} from '@chakra-ui/react'

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Trama</title>
        <meta name='description' content='Planeje, registre, evolua' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Container maxW='100%'>
        <Heading size='2xl' textAlign='center'>
          Trama
        </Heading>

        <Heading size='md' textAlign='center' pt='2'>
          Planeje, registre, evolua
        </Heading>

        <Text textAlign='center' pt='8'>
          Trama é uma plataforma para você catalogar e consultar seus estudos.<br />
          Comece criando categorias e, então, adicione registros à elas.
        </Text>

        <Flex
          justifyContent='center'
          pt='8'
        >
          <NextLink href='/signup'>
            <Button mr='4'>
              Criar conta
            </Button>
          </NextLink>

          <NextLink href='/login'>
            <Button>
              Fazer login
            </Button>
          </NextLink>
        </Flex>
      </Container>
    </>
  )
}

export default HomePage
