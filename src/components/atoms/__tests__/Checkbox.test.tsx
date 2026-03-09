import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Checkbox } from '../Checkbox'

describe('Checkbox', () => {
  it('renders unchecked by default', () => {
    render(<Checkbox aria-label="Check" />)
    expect(screen.getByRole('checkbox')).toHaveAttribute('data-state', 'unchecked')
  })

  it('renders checked when defaultChecked', () => {
    render(<Checkbox defaultChecked aria-label="Check" />)
    expect(screen.getByRole('checkbox')).toHaveAttribute('data-state', 'checked')
  })

  it('toggles on click', async () => {
    render(<Checkbox aria-label="Check" />)
    const cb = screen.getByRole('checkbox')
    await userEvent.click(cb)
    expect(cb).toHaveAttribute('data-state', 'checked')
  })

  it('calls onCheckedChange', async () => {
    const onCheckedChange = vi.fn()
    render(<Checkbox aria-label="Check" onCheckedChange={onCheckedChange} />)
    await userEvent.click(screen.getByRole('checkbox'))
    expect(onCheckedChange).toHaveBeenCalledWith(true)
  })

  it('does not toggle when disabled', async () => {
    const onCheckedChange = vi.fn()
    render(<Checkbox disabled aria-label="Check" onCheckedChange={onCheckedChange} />)
    await userEvent.click(screen.getByRole('checkbox'))
    expect(onCheckedChange).not.toHaveBeenCalled()
  })
})
