import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Switch } from '../Switch'

describe('Switch', () => {
  it('renders unchecked by default', () => {
    render(<Switch aria-label="Toggle" />)
    expect(screen.getByRole('switch')).toHaveAttribute('data-unchecked')
  })

  it('renders checked when defaultChecked', () => {
    render(<Switch defaultChecked aria-label="Toggle" />)
    expect(screen.getByRole('switch')).toHaveAttribute('data-checked')
  })

  it('toggles on click', async () => {
    render(<Switch aria-label="Toggle" />)
    const sw = screen.getByRole('switch')
    expect(sw).toHaveAttribute('data-unchecked')
    await userEvent.click(sw)
    expect(sw).toHaveAttribute('data-checked')
  })

  it('calls onCheckedChange', async () => {
    const onCheckedChange = vi.fn()
    render(<Switch aria-label="Toggle" onCheckedChange={onCheckedChange} />)
    await userEvent.click(screen.getByRole('switch'))
    // Base UI는 (checked, eventDetails) 두 인자로 호출한다
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything())
  })

  it('is disabled when disabled prop is set', async () => {
    const onCheckedChange = vi.fn()
    render(<Switch disabled aria-label="Toggle" onCheckedChange={onCheckedChange} />)
    const sw = screen.getByRole('switch')
    // Base UI Switch는 <span>이라 disabled 속성 대신 aria-disabled/data-disabled로 표현된다.
    // data-disabled는 Tailwind data-[disabled]: 스타일이 걸리는 지점이라 함께 검증한다.
    expect(sw).toHaveAttribute('aria-disabled', 'true')
    expect(sw).toHaveAttribute('data-disabled')
    await userEvent.click(sw)
    expect(onCheckedChange).not.toHaveBeenCalled()
  })
})
