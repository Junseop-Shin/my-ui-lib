import { render, screen } from '@testing-library/react'
import { ScrollArea } from './ScrollArea'
import { describe, it, expect } from 'vitest'

describe('ScrollArea', () => {
  it('renders correctly', () => {
    render(
        <ScrollArea className="h-20 w-20">
            <div>Content</div>
        </ScrollArea>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })
})
