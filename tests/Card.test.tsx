import { screen, render } from '@testing-library/react'
import CategoryCard from 'components/Card/Category'

describe('Card component test', () => {
  test('Category card', () => {
    const category = {
      id: 1,
      name: 'Category name',
      description: 'Jansen',
    }

    render(
      <CategoryCard category={category} />
    )

    const name = screen.getByRole('heading', { name: category.name })
    expect(name).toBeInTheDocument()

    const description = screen.getByText(category.description)
    expect(description).toBeInTheDocument()

    const displayButton = screen.getByRole('button', { name: 'Ver categoria' })
    expect(displayButton).toBeInTheDocument()

    const categoryLink = screen.getByRole('link')
    expect(categoryLink).toHaveAttribute('href', `categories/${category.id}`)
  })
})
