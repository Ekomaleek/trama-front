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
        <meta name='description' content='Trama - página inicial' />
      </Head>

      <Container maxW='100%'>
        <Heading size='2xl' textAlign='center'>
          Trama
        </Heading>

        <Text textAlign='center' py='8'>
          Trama é uma plataforma para você catalogar e consultar seus estudos.<br />
          Crie uma nova conta ou entre com uma já existente:
        </Text>

        <Flex justifyContent='center'>
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
