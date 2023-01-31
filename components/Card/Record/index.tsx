import React from 'react'
import NextLink from 'next/link'

import { Record, RecordForDeletion } from 'types/Record'
import { Category } from 'types/Category'

import { useApi } from 'hooks/use-api'
import { removeRecord } from 'api/record'

import Dialog from 'components/Dialog'
import Link from 'components/_core/Link'
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
  category?: Category
  redirectOnRemoval?: string
}

const RecordCard = ({ record, category, redirectOnRemoval }: RecordCardProps): JSX.Element => {
  const { isLoading, makeRequest } = useApi<Record, RecordForDeletion>()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleDelete = async (): Promise<void> => {
    const redirectUrl = redirectOnRemoval ?? '/records'
    await makeRequest({
      apiMethod: removeRecord,
      apiMethodArgs: { id: record.id },
      successMessage: `O registro ${record.name} foi removido com sucesso.`,
      finallyCallback: () => onClose(),
      withRedirect: redirectUrl,
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

        {
          category !== undefined &&
          <Link
            href={`/categories/${record.category_id}`}
            fontSize='xs'
          >
            {category.name}
          </Link>
        }
      </CardHeader>

      <CardBody>
        <Text
          fontSize='sm'
          variant='overflowEllipsis'
          sx={{ '--n-lines': '2' }}
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
            <NextLink href={`/records/update/${record.id}`}>
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
