import React from 'react'
import NextLink from 'next/link'

import { Record, RecordForDeletion } from 'types/Record'

import { useApi } from 'hooks/use-api'
import { removeRecord } from 'api/record'

import Dialog from 'components/Dialog'
import { SettingsIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react'

type RecordCardProps = {
  record: Record
}

const RecordCard = ({ record }: RecordCardProps): JSX.Element => {
  const { isLoading, makeRequest } = useApi<Record, RecordForDeletion>()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleDelete = async (): Promise<void> => {
    await makeRequest({
      apiMethod: removeRecord,
      apiMethodArgs: { id: record.id },
      successMessage: `O registro ${record.name} foi removido com sucesso.`,
      finallyCallback: () => onClose(),
      withRedirect: '/records',
    })
  }

  return (
    <Card width='300px' height='250px'>
      <CardHeader>
        <Heading
          size='md'
          flex='1'
          variant='overflowEllipsis'
          sx={{ '--n-lines': '1' }}
        >
          {record.name}
        </Heading>

        <Heading size='xs' pt='2'>
          Categoria: {record.category_id}
        </Heading>
      </CardHeader>

      <CardBody>
        <Text
          fontSize='sm'
          variant='overflowEllipsis'
          sx={{ '--n-lines': '3' }}
        >
          {record.description}
        </Text>
      </CardBody>

      <CardFooter justifyContent='space-between'>
        <NextLink href={`/records/${record.id}`}>
          <Button>
            Ver registro
          </Button>
        </NextLink>

        <Menu>
          <MenuButton
            as={IconButton}
            icon={<SettingsIcon />}
            aria-label='Opções de registro'
          />

          <MenuList>
            <NextLink href={`records/update/${record.id}`}>
              <MenuItem icon={<EditIcon />}>
                Editar
              </MenuItem>
            </NextLink>
            <MenuItem icon={<DeleteIcon />} onClick={onOpen}>
              Remover
            </MenuItem>
          </MenuList>
        </Menu>
      </CardFooter>

      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        isLoading={isLoading}
        callback={handleDelete}
        headerText='Remover registro'
        bodyText={`Tem certeza que deseja remover o registro ${record.name}?`}
        actionBtnText='Remover'
      />
    </Card>
  )
}

export default RecordCard
