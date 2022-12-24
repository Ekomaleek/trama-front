import React from 'react'
import NextLink from 'next/link'

import { Category, CategoryForDeletion } from 'types/Category'

import { useApi } from 'hooks/use-api'
import { removeCategory } from 'api/category'

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

interface CategoryCardProps {
  category: Category
  setShouldUpdate: React.Dispatch<React.SetStateAction<boolean>>
}

const CategoryCard = ({ category, setShouldUpdate }: CategoryCardProps): JSX.Element => {
  const { isLoading, makeRequest } = useApi<Category, CategoryForDeletion>()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleDelete = async (): Promise<void> => {
    await makeRequest({
      apiMethod: removeCategory,
      apiMethodArgs: { id: category.id },
      successMessage: `A categoria ${category.name} foi removida com sucesso.`,
      successCallback: () => setShouldUpdate(true),
      finallyCallback: () => onClose(),
    })
  }

  return (
    <Card width='300px' height='250px'>
      <CardHeader display='flex' alignItems='center'>
        <Heading
          size='md'
          flex='1'
          variant='overflowEllipsis'
          sx={{ '--n-lines': '1' }}
        >
          {category.name}
        </Heading>
      </CardHeader>

      <CardBody>
        <Text
          fontSize='sm'
          variant='overflowEllipsis'
          sx={{ '--n-lines': '3' }}
        >
          {category.description}
        </Text>
      </CardBody>

      <CardFooter justifyContent='space-between'>
        <Button>
          Ver registros
        </Button>

        <Menu>
          <MenuButton
            as={IconButton}
            icon={<SettingsIcon />}
            aria-label='Opções de categoria'
          />

          <MenuList>
            <NextLink href={`categories/update/${category.id}`}>
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
        headerText='Remover categoria'
        bodyText={`Tem certeza que deseja remover a categoria ${category.name}?`}
        actionBtnText='Remover'
      />
    </Card>
  )
}

export default CategoryCard
