import { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { getErrorMessage } from 'helpers'

type UseApi<Resource, Data> = {
  data?: Resource
  error: string
  isLoading: boolean
  makeRequest: (options: {
    apiMethod: (data: Data) => Promise<Resource>
    apiMethodArgs: Data
    successMessage: string
    withRedirect?: string
    successCallback?: () => any
    errorCallback?: () => any
    finallyCallback?: () => any
  }) => Promise<void>
}

const useApi = <Resource, Data>(): UseApi<Resource, Data> => {
  const toast = useToast()
  const router = useRouter()

  const [data, setData] = useState<UseApi<Resource, Data>['data']>()
  const [isLoading, setIsLoading] = useState<UseApi<Resource, Data>['isLoading']>(false)
  const [error, setError] = useState<UseApi<Resource, Data>['error']>('')

  const makeRequest: UseApi<Resource, Data>['makeRequest'] = async ({
    apiMethod,
    apiMethodArgs,
    successMessage,
    withRedirect,
    successCallback,
    errorCallback,
    finallyCallback,
  }) => {
    try {
      setIsLoading(true)

      const response = await apiMethod(apiMethodArgs)
      setData(response)

      withRedirect !== undefined && await router.push(withRedirect)
      successCallback?.()

      toast({
        title: 'Tudo certo!',
        description: successMessage,
        status: 'success',
        isClosable: true,
      })
    } catch (err) {
      setError(getErrorMessage(err))
      errorCallback?.()

      toast({
        title: 'Ops! Algo deu errado.',
        description: getErrorMessage(err),
        status: 'error',
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
      finallyCallback?.()
    }
  }

  return { data, isLoading, error, makeRequest }
}

export { useApi }
