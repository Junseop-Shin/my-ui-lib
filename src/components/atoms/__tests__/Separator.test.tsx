import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Separator } from '../Separator'

describe('Separator', () => {
  it('is hidden from the accessibility tree by default', () => {
    const { container } = render(<Separator />)
    expect(container.firstChild).toHaveAttribute('role', 'none')
  })

  it('exposes a separator role when not decorative', () => {
    render(<Separator decorative={false} />)
    expect(screen.getByRole('separator')).toBeInTheDocument()
  })

  it('applies horizontal sizing by default', () => {
    const { container } = render(<Separator />)
    expect(container.firstChild).toHaveClass('h-px', 'w-full')
  })

  it('applies vertical sizing', () => {
    const { container } = render(<Separator orientation="vertical" />)
    expect(container.firstChild).toHaveClass('h-full', 'w-px')
  })

  it('merges custom className', () => {
    const { container } = render(<Separator className="my-4" />)
    expect(container.firstChild).toHaveClass('my-4', 'bg-border')
  })
})
