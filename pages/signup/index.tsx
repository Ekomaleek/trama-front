import Head from 'next/head'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { NextPage } from 'next'
import { UserForSignup, UserFromSignup } from 'types/User'

import { useApi } from 'hooks/use-api'
import { signupUser } from 'api/auth'
import { userForSignupSchema } from 'helpers/input-validation/schemas/user'

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

const SignupPage: NextPage = () => {
  const { isLoading, makeRequest } = useApi<UserFromSignup, UserForSignup>()
  const { register, handleSubmit, formState: { errors } } = useForm<UserForSignup>({
    resolver: yupResolver(userForSignupSchema),
  })

  const onSubmit: SubmitHandler<UserForSignup> = async (data) => {
    await makeRequest({
      apiMethod: signupUser,
      apiMethodArgs: data,
      successMessage: `O usuário ${data.username} foi criado com sucesso.`,
      withRedirect: `/signup/account-confirmation?username=${data.username}&email=${data.email}`,
    })
  }

  return (
    <>
      <Head>
        <title>Trama - Signup</title>
        <meta name='description' content='Trama - Página de criação de usuário' />
      </Head>

      <Container>
        <Heading size='2xl' textAlign='center'>
          Cadastro
        </Heading>

        <Text textAlign='center' pt='4' pb='8'>
          Cria sua conta ou <Link href='/login'>conecte-se com uma já existente</Link>.
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
              {...register('username')}
            />
            <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
          </FormControl>

          <FormControl
            isRequired
            isInvalid={errors.email !== undefined}
            pt='4'
          >
            <FormLabel>E-mail</FormLabel>
            <Input
              type='text'
              placeholder='Seu e-mail'
              {...register('email')}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
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

          <FormControl
            isRequired
            isInvalid={errors.confirmPassword !== undefined}
            pt='4'
          >
            <FormLabel>Confirme sua senha</FormLabel>
            <Input
              type='password'
              placeholder='Confirme sua senha'
              {...register('confirmPassword')}
            />
            <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
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

export default SignupPage
