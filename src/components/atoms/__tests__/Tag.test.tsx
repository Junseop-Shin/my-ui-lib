import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tag } from '../Tag'

describe('Tag', () => {
  it('renders children', () => {
    render(<Tag>React</Tag>)
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('does not show dismiss button when onDismiss is not provided', () => {
    render(<Tag>TypeScript</Tag>)
    expect(screen.queryByRole('button', { name: 'Remove tag' })).not.toBeInTheDocument()
  })

  it('shows dismiss button when onDismiss is provided', () => {
    render(<Tag onDismiss={vi.fn()}>Tailwind</Tag>)
    expect(screen.getByRole('button', { name: 'Remove tag' })).toBeInTheDocument()
  })

  it('calls onDismiss when dismiss button is clicked', async () => {
    const onDismiss = vi.fn()
    render(<Tag onDismiss={onDismiss}>Vue</Tag>)
    await userEvent.click(screen.getByRole('button', { name: 'Remove tag' }))
    expect(onDismiss).toHaveBeenCalledTimes(1)
  })

  it('applies primary variant', () => {
    render(<Tag variant="primary">Next.js</Tag>)
    expect(screen.getByText('Next.js')).toHaveClass('bg-primary/10')
  })
})
