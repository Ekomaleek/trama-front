import { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'

interface UseApi<Resource, Data> {
  data: Resource[]
  error: string
  isLoading: boolean
  makeRequest: (options: {
    apiMethod: (data: Data) => Promise<Resource[]>
    apiMethodArgs: Data
    successMessage: string
    withRedirect?: string
    successCallback?: () => any
    errorCallback?: () => any
    finallyCallback?: () => any
  }) => Promise<Resource[]>
}

const useApi = <Resource, Data>(): UseApi<Resource, Data> => {
  const toast = useToast()
  const router = useRouter()

  const [data, setData] = useState<Resource[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

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

    const response = apiMethod(apiMethodArgs)
      .then(res => {
        toast({
          title: 'Tudo certo!',
          description: successMessage,
          status: 'success',
        })
        setData(res)

        withRedirect !== undefined && router.push(withRedirect)
        successCallback?.()

        return res
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

    return await response as Resource[]
  }

  return { data, isLoading, error, makeRequest }
}

export { useApi }
