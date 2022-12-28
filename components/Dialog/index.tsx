import { useRef } from 'react'

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Heading,
  Text,
  Button,
} from '@chakra-ui/react'

type DialogProps = {
  isOpen: boolean
  onClose: () => void
  isLoading: boolean
  callback: () => void
  headerText: string
  bodyText: string
  actionBtnText: string
}

const Dialog = (props: DialogProps): JSX.Element => {
  const cancelRef = useRef(null)

  const {
    isOpen,
    onClose,
    isLoading,
    callback,
    headerText,
    bodyText,
    actionBtnText,
  } = props

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      preserveScrollBarGap={true}
    >
      <AlertDialogOverlay>
        <AlertDialogContent
          bg='black'
          border='1px solid'
          borderColor='orange.500'
        >
          <AlertDialogHeader>
            <Heading size='lg'>
              {headerText}
            </Heading>
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text>
              {bodyText}
            </Text>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              colorScheme='whiteAlpha'
              ref={cancelRef}
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              colorScheme='red'
              onClick={callback}
              ml={3}
              isLoading={isLoading}
            >
              {actionBtnText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default Dialog
