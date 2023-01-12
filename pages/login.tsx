import Head from 'next/head'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'

import { NextPage } from 'next'
import { UserForLogin } from 'types/User'
import { AuthenticateUserParams, authenticateUser } from 'auth'

import { useApi } from 'hooks/use-api'

import Link from 'components/_core/Link'
import {
  Container,
  Heading,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
} from '@chakra-ui/react'

const LoginPage: NextPage = () => {
  const router = useRouter()
  const { isLoading, makeRequest } = useApi<string, AuthenticateUserParams>()
  const { register, handleSubmit, formState: { errors } } = useForm<UserForLogin>()

  const onSubmit: SubmitHandler<UserForLogin> = async (data) => {
    await makeRequest({
      apiMethod: authenticateUser,
      apiMethodArgs: {
        ...data,
        router,
      },
      successMessage: `Usuário ${data.username} logado com sucesso.`,
      withRedirect: '/',
    })
  }

  return (
    <>
      <Head>
        <title>Trama - Login</title>
        <meta name='description' content='Trama - Página de login' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Container>
        <Heading size='2xl' textAlign='center'>
          Login
        </Heading>

        <Text textAlign='center' pt='4' pb='8'>
          Conecte com sua conta ou <Link href='/signup'>crie uma nova</Link>.
        </Text>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            isRequired
            isInvalid={errors.username !== undefined}
          >
            <FormLabel>Nome de usuário</FormLabel>
            <Input
              type='text'
              placeholder='Nome de usuário'
              {...register('username', { required: 'O campo nome de usuário é obrigatório.' })}
            />
            <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
          </FormControl>

          <FormControl
            isRequired
            isInvalid={errors.password !== undefined}
            pt='4'
          >
            <FormLabel>Senha</FormLabel>
            <Input
              type='password'
              placeholder='Senha de usuário'
              {...register('password')}
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>

          <Button
            type='submit'
            w='100%'
            mt='8'
            isLoading={isLoading}
          >
            Conectar
          </Button>
        </form>
      </Container>
    </>
  )
}

export default LoginPage
