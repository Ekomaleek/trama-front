import Head from 'next/head'
import { NextPage } from 'next'

import { useUser } from 'context/user'

import {
  Container,
  Heading,
  Text,
  Box,
} from '@chakra-ui/react'

const ProfilePage: NextPage = () => {
  const { user } = useUser()

  return (
    <>
      <Head>
        <title>Trama - Perfil</title>
        <meta name='description' content='Trama - página de perfil de usuário' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Container maxW='100%'>
        <Heading size='2xl' textAlign='center'>
          Perfil
        </Heading>

        <Box textAlign='center' pt='8'>
          <Text>
            <strong>Nome de usuário:</strong><br />
            {user?.username}
          </Text>

          <Text pt='4'>
            <strong>E-mail:</strong><br />
            {user?.email}
          </Text>
        </Box>
      </Container>
    </>
  )
}

export default ProfilePage
