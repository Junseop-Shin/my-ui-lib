import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Checkbox } from './Checkbox'
import { describe, it, expect } from 'vitest'

describe('Checkbox', () => {
  it('renders correctly', () => {
    render(<Checkbox aria-label="agree" />)
    const checkbox = screen.getByRole('checkbox', { name: 'agree' })
    expect(checkbox).toBeInTheDocument()
  })

  it('toggles state on click', async () => {
    const user = userEvent.setup()
    render(<Checkbox aria-label="agree" />)
    const checkbox = screen.getByRole('checkbox', { name: 'agree' })

    expect(checkbox).not.toBeChecked()

    await user.click(checkbox)
    await waitFor(() => expect(checkbox).toBeChecked()) // Radix updates async or via state attribute

    await user.click(checkbox)
    await waitFor(() => expect(checkbox).not.toBeChecked())
  })
})
