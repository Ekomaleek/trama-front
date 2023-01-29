import React, { useEffect } from 'react'
import Head from 'next/head'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, SubmitHandler } from 'react-hook-form'

import { GetServerSideProps, NextPage } from 'next'
import {
  User,
  UserForSignupConfirmation,
  UserForResendCode,
} from 'types/User'

import { useApi } from 'hooks/use-api'
import { confirmAccount, resendConfirmationCode } from 'api/auth'
import { CODE_LENGTH, confirmationCodeSchema } from 'helpers/input-validation/schemas/user'

import { RepeatIcon } from '@chakra-ui/icons'
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
  Box,
} from '@chakra-ui/react'

type AccountConfirmationCode = {
  code: UserForSignupConfirmation['code']
}

type AccountConfirmationPageProps = {
  username: User['username']
  email: User['email']
}

const AccountConfirmationPage: NextPage<AccountConfirmationPageProps> = ({ username, email }) => {
  const {
    isLoading: isConfirmationLoading,
    makeRequest: makeConfirmationRequest,
  } = useApi<string, UserForSignupConfirmation>()
  const {
    isLoading: isResendLoading,
    makeRequest: makeResendRequest,
  } = useApi<string, UserForResendCode>()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AccountConfirmationCode>({
    resolver: yupResolver(confirmationCodeSchema),
  })

  const onSubmit: SubmitHandler<AccountConfirmationCode> = async (data) => {
    await makeConfirmationRequest({
      apiMethod: confirmAccount,
      apiMethodArgs: { ...data, username },
      successMessage: `O usuário ${username} foi confirmado com sucesso.`,
      withRedirect: '/login',
    })
  }

  const handlePinChange = (value: string): void => {
    setValue('code', value)
  }

  const handleResendCode = async (): Promise<void> => {
    await makeResendRequest({
      apiMethod: resendConfirmationCode,
      apiMethodArgs: { username },
      successMessage: 'O código foi enviado com sucesso.',
    })
  }

  useEffect(() => {
    register('code')
  }, [register])

  return (
    <>
      <Head>
        <title>Trama - Confirmação de nvoa conta</title>
        <meta name='description' content='Trama - Página de confirmação de nova conta' />
      </Head>

      <Container>
        <Heading size='2xl' textAlign='center'>
          Confirmação de nova conta
        </Heading>

        <Text textAlign='center' pt='4' pb='8'>
          Enviamos um e-mail para {email === '' ? 'você' : <strong>{email}</strong>} com um código de confirmação.<br />
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
            isLoading={isConfirmationLoading}
          >
            Confirmar
          </Button>
        </form>

        <Box textAlign='center' mt='4'>
          <Button
            leftIcon={<RepeatIcon />}
            isLoading={isResendLoading}
            onClick={handleResendCode}
          >
            Reenviar Código
          </Button>
        </Box>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const username = context.query?.username
  const email = context.query?.email ?? ''
  if (username === undefined) return { notFound: true }

  return {
    props: { username, email },
  }
}

export default AccountConfirmationPage
