import Head from 'next/head'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { GetServerSideProps, NextPage } from 'next'
import { UserForConfirmNewPassword } from 'types/User'

import { useApi } from 'hooks/use-api'
import { confirmNewPassword } from 'api/auth'
import { userForConfirmNewPasswordSchema } from 'helpers/input-validation/schemas/user'

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

type ConfirmNewPasswordPageProps = {
  username: UserForConfirmNewPassword['username']
}

const ConfirmNewPasswordPage: NextPage<ConfirmNewPasswordPageProps> = ({ username }) => {
  const { isLoading, makeRequest } = useApi<string, UserForConfirmNewPassword>()
  const { register, handleSubmit, formState: { errors } } = useForm<UserForConfirmNewPassword>({
    resolver: yupResolver(userForConfirmNewPasswordSchema),
    defaultValues: {
      username,
    },
  })

  const onSubmit: SubmitHandler<UserForConfirmNewPassword> = async (data) => {
    await makeRequest({
      apiMethod: confirmNewPassword,
      apiMethodArgs: data,
      successMessage: 'Sua senha foi alterada com sucesso.',
      withRedirect: '/login',
    })
  }

  return (
    <>
      <Head>
        <title>Trama - Confirmar nova senha</title>
        <meta name='description' content='Trama - Página de confirmação de nova senha' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Container>
        <Heading size='2xl' textAlign='center'>
          Confirmar nova senha
        </Heading>

        <Text textAlign='center' pt='4' pb='8'>
          Enviamos um código para o e-mail cadastrado em sua conta. Insira-o abaixo para concluir a recuperação de senha.
        </Text>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            isRequired
            isInvalid={errors.code !== undefined}
          >
            <FormLabel>Código</FormLabel>
            <Input
              type='text'
              placeholder='Código enviado por e-mail'
              {...register('code')}
            />
            <FormErrorMessage>{errors.code?.message}</FormErrorMessage>
          </FormControl>

          <FormControl
            isRequired
            isInvalid={errors.newPassword !== undefined}
            pt='4'
          >
            <FormLabel>Nova senha</FormLabel>
            <Input
              type='password'
              placeholder='Nova senha'
              {...register('newPassword')}
            />
            <FormErrorMessage>{errors.newPassword?.message}</FormErrorMessage>
          </FormControl>

          <FormControl
            isRequired
            isInvalid={errors.confirmNewPassword !== undefined}
            pt='4'
          >
            <FormLabel>Confirme a nova senha</FormLabel>
            <Input
              type='password'
              placeholder='Confirme a nova senha'
              {...register('confirmNewPassword')}
            />
            <FormErrorMessage>{errors.confirmNewPassword?.message}</FormErrorMessage>
          </FormControl>

          <Button
            type='submit'
            w='100%'
            mt='8'
            isLoading={isLoading}
          >
            Trocar senha
          </Button>
        </form>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const username = context.query?.username ?? null
  if (username === null || Array.isArray(username)) return { notFound: true }

  return {
    props: { username },
  }
}

export default ConfirmNewPasswordPage
