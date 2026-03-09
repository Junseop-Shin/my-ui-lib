import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card } from '../Card'

describe('Card', () => {
  it('renders as a compound component', () => {
    render(
      <Card>
        <Card.Header>
          <Card.Title>Title</Card.Title>
          <Card.Description>Description</Card.Description>
        </Card.Header>
        <Card.Content>Content</Card.Content>
        <Card.Footer>Footer</Card.Footer>
      </Card>
    )
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })

  it('Card.Title renders as h3', () => {
    render(<Card><Card.Header><Card.Title>Hello</Card.Title></Card.Header></Card>)
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Hello')
  })

  it('merges custom className on root', () => {
    render(<Card className="custom"><Card.Content>x</Card.Content></Card>)
    const card = screen.getByText('x').closest('.rounded-2xl')
    expect(card).toHaveClass('custom')
  })
})
