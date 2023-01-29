import Head from 'next/head'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { NextPage } from 'next'
import { UserForForgotPassword } from 'types/User'

import { useApi } from 'hooks/use-api'
import { forgotPassword } from 'api/auth'
import { userForForgotPasswordSchema } from 'helpers/input-validation/schemas/user'

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

const ForgotPasswordPage: NextPage = () => {
  const { isLoading, makeRequest } = useApi<string, UserForForgotPassword>()
  const { register, handleSubmit, formState: { errors } } = useForm<UserForForgotPassword>({
    resolver: yupResolver(userForForgotPasswordSchema),
  })

  const onSubmit: SubmitHandler<UserForForgotPassword> = async (data) => {
    await makeRequest({
      apiMethod: forgotPassword,
      apiMethodArgs: data,
      successMessage: 'Código enviado com sucesso.',
      withRedirect: `/forgot-password/confirm-new-password?username=${data.username}`,
    })
  }

  return (
    <>
      <Head>
        <title>Trama - Recuperação de senha</title>
        <meta name='description' content='Trama - Página de recuperação de senha' />
      </Head>

      <Container>
        <Heading size='2xl' textAlign='center'>
          Recuperar senha
        </Heading>

        <Text textAlign='center' pt='4' pb='8'>
          Insira seu nome de usuário para iniciar o processo de recuperação de senha.
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

          <Button
            type='submit'
            w='100%'
            mt='8'
            isLoading={isLoading}
          >
            Continuar
          </Button>
        </form>
      </Container>
    </>
  )
}

export default ForgotPasswordPage
