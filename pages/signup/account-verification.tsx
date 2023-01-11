import React, { useEffect } from 'react'
import Head from 'next/head'
import { useForm, SubmitHandler } from 'react-hook-form'

import { GetServerSideProps, NextPage } from 'next'
import { User, UserForSignupConfirmation } from 'types/User'

import { useApi } from 'hooks/use-api'
import { confirmUserAccount } from 'auth'

import {
  Container,
  Heading,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  PinInput,
  PinInputField,
} from '@chakra-ui/react'

type AccountVerificationCode = {
  code: UserForSignupConfirmation['code']
}

type AccountVerificationPageProps = {
  username: User['username']
  email: User['email']
}

const AccountVerificationPage: NextPage<AccountVerificationPageProps> = ({ username, email }) => {
  const { isLoading, makeRequest } = useApi<string, UserForSignupConfirmation>()
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<AccountVerificationCode>()
  const CODE_LENGTH = 6

  const onSubmit: SubmitHandler<AccountVerificationCode> = async (data) => {
    await makeRequest({
      apiMethod: confirmUserAccount,
      apiMethodArgs: { ...data, username },
      successMessage: `O usuário ${username} foi confirmado com sucesso.`,
      withRedirect: '/',
    })
  }

  const handlePinChange = (value: string): void => {
    setValue('code', value)
  }

  useEffect(() => {
    const errorMessage = 'Código inválido.'

    register('code', {
      required: errorMessage,
      minLength: {
        value: CODE_LENGTH,
        message: errorMessage,
      },
      maxLength: {
        value: CODE_LENGTH,
        message: errorMessage,
      },
    })
  }, [register])

  return (
    <>
      <Head>
        <title>Trama - Confirmação de nvoa conta</title>
        <meta name='description' content='Trama - Página de confirmação de nova conta' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Container>
        <Heading size='2xl' textAlign='center'>
          Confirmação de nova conta
        </Heading>

        <Text textAlign='center' pt='4' pb='8'>
          Enviamos um e-mail para <strong>{email}</strong> com um código de confirmação.<br />
          Por favor, insira-o abaixo para verificar sua conta.
        </Text>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            textAlign='center'
            isInvalid={errors.code !== undefined}
          >
            <FormLabel textAlign='center' mb='4'>
              Código de confirmação
            </FormLabel>
            <PinInput onChange={handlePinChange}>
              {
                Array
                  .from({ length: CODE_LENGTH })
                  .map((_, index) =>
                    <PinInputField key={index} mr='2' />
                  )
              }
            </PinInput>
            <FormErrorMessage justifyContent='center'>
              {errors.code?.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            type='submit'
            w='100%'
            mt='8'
            isLoading={isLoading}
          >
            Confirmar
          </Button>
        </form>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const username = context.query?.username
  const email = context.query?.email
  if (username === undefined || email === undefined) return { notFound: true }

  return {
    props: { username, email },
  }
}

export default AccountVerificationPage
