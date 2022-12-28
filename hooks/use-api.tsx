import { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'

type UseApi<Resource, Data> = {
  data: Resource | Resource[]
  error: string
  isLoading: boolean
  makeRequest: (options: {
    apiMethod: (data: Data) => Promise<Resource | Resource[]>
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

  const [data, setData] = useState<UseApi<Resource, Data>['data']>([])
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
    setIsLoading(true)

    apiMethod(apiMethodArgs)
      .then(res => {
        toast({
          title: 'Tudo certo!',
          description: successMessage,
          status: 'success',
        })
        setData(res)

        withRedirect !== undefined && router.push(withRedirect)
        successCallback?.()
      })
      .catch((err: Error) => {
        toast({
          title: 'Ops! Algo deu errado.',
          description: err.message,
          status: 'error',
        })
        setError(err.message)

        errorCallback?.()
      })
      .finally(() => {
        setIsLoading(false)
        finallyCallback?.()
      })
  }

  return { data, isLoading, error, makeRequest }
}

export { useApi }
