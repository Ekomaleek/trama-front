import Head from 'next/head'
import { useForm, SubmitHandler } from 'react-hook-form'

import { NextPage } from 'next'
import { UserForLogin, UserFromLogin } from 'types/User'

import { useApi } from 'hooks/use-api'
import { useUser } from 'context/user'
import { loginUser } from 'api/auth'

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
  Box,
} from '@chakra-ui/react'

const LoginPage: NextPage = () => {
  const { isLoading, makeRequest } = useApi<UserFromLogin, UserForLogin>()
  const { register, handleSubmit, formState: { errors } } = useForm<UserForLogin>()
  const { setUser } = useUser()

  const loginSucessCallback = (response: UserFromLogin): void => {
    const { id, username, email } = response
    setUser({ id, username, email })
  }

  const onSubmit: SubmitHandler<UserForLogin> = async (data) => {
    await makeRequest({
      apiMethod: loginUser,
      apiMethodArgs: data,
      successMessage: `Usuário ${data.username} logado com sucesso.`,
      withRedirect: '/',
      successCallback: loginSucessCallback,
    })
  }

  return (
    <>
      <Head>
        <title>Trama - Login</title>
        <meta name='description' content='Trama - Página de login' />
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

        <Box pt='4' textAlign='center'>
          <Link href='/forgot-password'>
            Esqueci minha senha
          </Link>
        </Box>
      </Container>
    </>
  )
}

export default LoginPage
