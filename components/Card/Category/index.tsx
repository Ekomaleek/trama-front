import React, { useState } from 'react'
import NextLink from 'next/link'

import { Category } from 'types/Category'

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
  useToast,
  useDisclosure,
} from '@chakra-ui/react'

interface CategoryCardProps {
  category: Category
  setShouldUpdate: React.Dispatch<React.SetStateAction<boolean>>
}

const CategoryCard = ({ category, setShouldUpdate }: CategoryCardProps): JSX.Element => {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleDelete = (): void => {
    setIsLoading(true)

    removeCategory({ id: category.id })
      .then(category => {
        toast({
          title: `A categoria ${category.name} foi removida com sucesso.`,
          status: 'success',
        })
        setShouldUpdate(true)
      })
      .catch(err => toast({
        title: 'Ocorreu um erro ao remover a categoria.',
        description: err.message,
        status: 'error',
      }))
      .finally(() => {
        setIsLoading(false)
        onClose()
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
