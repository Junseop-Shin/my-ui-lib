import { render, screen } from '@testing-library/react'
import { Label } from './Label'
import { describe, it, expect } from 'vitest'

describe('Label', () => {
  it('renders correctly', () => {
    render(<Label>Test Label</Label>)
    const label = screen.getByText('Test Label')
    expect(label).toBeInTheDocument()
    expect(label.tagName).toBe('LABEL')
  })

  it('applies custom class', () => {
    render(<Label className="text-red-500">Red Label</Label>)
    const label = screen.getByText('Red Label')
    expect(label).toHaveClass('text-red-500')
  })
})
