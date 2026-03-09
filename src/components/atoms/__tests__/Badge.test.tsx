import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from '../Badge'

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('applies default variant', () => {
    render(<Badge>Default</Badge>)
    expect(screen.getByText('Default')).toHaveClass('bg-primary/10')
  })

  it('applies success variant', () => {
    render(<Badge variant="success">Live</Badge>)
    expect(screen.getByText('Live')).toHaveClass('bg-success/10')
  })

  it('applies destructive variant', () => {
    render(<Badge variant="destructive">Error</Badge>)
    expect(screen.getByText('Error')).toHaveClass('bg-destructive/10')
  })

  it('applies outline variant', () => {
    render(<Badge variant="outline">Draft</Badge>)
    expect(screen.getByText('Draft')).toHaveClass('border-border')
  })
})
