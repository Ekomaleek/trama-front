import { screen, render } from '@testing-library/react'
import CategoryCard from 'components/Card/Category'
import RecordCard from 'components/Card/Record'

describe('Card component test', () => {
  const category = {
    id: 1,
    name: 'Category name',
    description: 'Jansen',
  }

  test('Category card', () => {
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
    expect(categoryLink).toHaveAttribute('href', `/categories/${category.id}`)
  })

  const record = {
    id: 2,
    name: 'Record name',
    description: 'Jansen',
    category_id: 1,
  }

  test('Record card without category', () => {
    render(
      <RecordCard record={record} />
    )

    const name = screen.getByRole('heading', { name: record.name })
    expect(name).toBeInTheDocument()

    const description = screen.getByText(record.description)
    expect(description).toBeInTheDocument()

    const displayButton = screen.getByRole('button', { name: 'Ver registro' })
    expect(displayButton).toBeInTheDocument()

    const recordLink = screen.getByRole('link')
    expect(recordLink).toHaveAttribute('href', `/records/${record.id}`)
  })

  test('Record card with category', () => {
    render(
      <RecordCard
        record={record}
        category={category}
      />
    )

    const name = screen.getByRole('heading', { name: record.name })
    expect(name).toBeInTheDocument()

    const description = screen.getByText(record.description)
    expect(description).toBeInTheDocument()

    const displayButton = screen.getByRole('button', { name: 'Ver registro' })
    expect(displayButton).toBeInTheDocument()

    const cardLinks = screen.getAllByRole('link')
    const categoryLink = cardLinks[0]
    expect(categoryLink).toHaveAttribute('href', `/categories/${category.id}`)
    expect(categoryLink).toHaveTextContent(category.name)
    const recordLink = cardLinks[1]
    expect(recordLink).toHaveAttribute('href', `/records/${record.id}`)
  })
})
