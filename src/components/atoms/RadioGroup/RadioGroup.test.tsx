import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RadioGroup, RadioGroupItem } from './RadioGroup'
import { describe, it, expect } from 'vitest'

describe('RadioGroup', () => {
  it('renders correctly', () => {
    render(
        <RadioGroup defaultValue="option-one">
            <RadioGroupItem value="option-one" id="option-one" />
            <RadioGroupItem value="option-two" id="option-two" />
        </RadioGroup>
    )
    const radios = screen.getAllByRole('radio')
    expect(radios).toHaveLength(2)
    expect(radios[0]).toBeInTheDocument()
  })

  it('switches value on click', async () => {
    const user = userEvent.setup()
    render(
        <RadioGroup defaultValue="1">
            <RadioGroupItem value="1" aria-label="One" />
            <RadioGroupItem value="2" aria-label="Two" />
        </RadioGroup>
    )

    const radio1 = screen.getByRole('radio', { name: 'One' })
    const radio2 = screen.getByRole('radio', { name: 'Two' })

    expect(radio1).toBeChecked()
    expect(radio2).not.toBeChecked()

    await user.click(radio2)

    await waitFor(() => expect(radio2).toBeChecked())
    expect(radio1).not.toBeChecked()
  })
})
