import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Dialog from 'components/Dialog'

const headerText = 'A text for the header text'
const bodyText = 'A text for the dialog body'
const actionBtnText = 'The text for the action button'
const cancelBtnText = 'Cancel'

describe('Dialog open', () => {
  const user = userEvent.setup()
  const dialogCallback = jest.fn()
  const dialogOnClose = jest.fn()

  beforeEach(() => render(
    <Dialog
      isOpen={true}
      onClose={dialogOnClose}
      isLoading={false}
      callback={dialogCallback}
      headerText={headerText}
      bodyText={bodyText}
      actionBtnText={actionBtnText}
      cancelBtnText={cancelBtnText}
    />
  ))

  test('Should have its text elements displayed', () => {
    const dialog = screen.getByRole('alertdialog')
    expect(dialog).toHaveTextContent(headerText)
    expect(dialog).toHaveTextContent(bodyText)
    expect(dialog).toHaveTextContent(actionBtnText)
  })

  test(
    'Should execute callback when actionButton is clicked',
    async () => {
      const actionButton = screen.getByRole('button', { name: actionBtnText })
      await user.click(actionButton)
      expect(dialogCallback).toHaveBeenCalledTimes(1)
    })

  test(
    'Should execute onClose when cancelButton is clicked',
    async () => {
      const cancelButton = screen.getByRole('button', { name: cancelBtnText })
      await user.click(cancelButton)
      expect(dialogOnClose).toHaveBeenCalledTimes(1)
    })
})

describe('Dialog open, isLoading true', () => {
  test('Action button should be disabled', () => {
    render(
      <Dialog
        isOpen={true}
        onClose={() => {}}
        isLoading={true}
        callback={() => {}}
        headerText={headerText}
        bodyText={bodyText}
        actionBtnText={actionBtnText}
        cancelBtnText={cancelBtnText}
      />
    )

    // Loading message from chakraui
    const loadingBtnText = `Loading... ${actionBtnText}`

    const actionButton = screen.getByRole('button', { name: loadingBtnText })
    expect(actionButton).toHaveAttribute('disabled')
  })
})
