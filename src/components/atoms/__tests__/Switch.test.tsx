import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Switch } from '../Switch'

describe('Switch', () => {
  it('renders unchecked by default', () => {
    render(<Switch aria-label="Toggle" />)
    expect(screen.getByRole('switch')).toHaveAttribute('data-state', 'unchecked')
  })

  it('renders checked when defaultChecked', () => {
    render(<Switch defaultChecked aria-label="Toggle" />)
    expect(screen.getByRole('switch')).toHaveAttribute('data-state', 'checked')
  })

  it('toggles on click', async () => {
    render(<Switch aria-label="Toggle" />)
    const sw = screen.getByRole('switch')
    expect(sw).toHaveAttribute('data-state', 'unchecked')
    await userEvent.click(sw)
    expect(sw).toHaveAttribute('data-state', 'checked')
  })

  it('calls onCheckedChange', async () => {
    const onCheckedChange = vi.fn()
    render(<Switch aria-label="Toggle" onCheckedChange={onCheckedChange} />)
    await userEvent.click(screen.getByRole('switch'))
    expect(onCheckedChange).toHaveBeenCalledWith(true)
  })

  it('is disabled when disabled prop is set', async () => {
    const onCheckedChange = vi.fn()
    render(<Switch disabled aria-label="Toggle" onCheckedChange={onCheckedChange} />)
    const sw = screen.getByRole('switch')
    expect(sw).toBeDisabled()
    await userEvent.click(sw)
    expect(onCheckedChange).not.toHaveBeenCalled()
  })
})
