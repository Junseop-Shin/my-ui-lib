import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from '../Input'

describe('Input', () => {
  it('renders with placeholder', () => {
    render(<Input placeholder="Search…" />)
    expect(screen.getByPlaceholderText('Search…')).toBeInTheDocument()
  })

  it('accepts user input', async () => {
    render(<Input placeholder="Type here" />)
    const input = screen.getByPlaceholderText('Type here')
    await userEvent.type(input, 'hello')
    expect(input).toHaveValue('hello')
  })

  it('is disabled when disabled prop is set', () => {
    render(<Input disabled placeholder="Disabled" />)
    expect(screen.getByPlaceholderText('Disabled')).toBeDisabled()
  })

  it('calls onChange', async () => {
    const onChange = vi.fn()
    render(<Input placeholder="x" onChange={onChange} />)
    await userEvent.type(screen.getByPlaceholderText('x'), 'a')
    expect(onChange).toHaveBeenCalled()
  })

  it('applies aria-invalid for invalid state', () => {
    render(<Input aria-invalid="true" placeholder="bad" />)
    expect(screen.getByPlaceholderText('bad')).toHaveAttribute('aria-invalid', 'true')
  })
})
