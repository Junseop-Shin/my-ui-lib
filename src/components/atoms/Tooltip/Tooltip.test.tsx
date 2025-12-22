import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './Tooltip'
import { describe, it, expect } from 'vitest'

describe('Tooltip', () => {
  it('renders correctly', () => {
    render(
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>Hover me</TooltipTrigger>
                <TooltipContent>Tooltip content</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
    expect(screen.getByText('Hover me')).toBeInTheDocument()
  })

  it('shows content on hover', async () => {
    const user = userEvent.setup()
    render(
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger>Hover me</TooltipTrigger>
                <TooltipContent>Tooltip content</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )

    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()

    await user.hover(screen.getByText('Hover me'))

    await waitFor(() => {
        // Radix renders a hidden copy for accessibility, so we might find multiple.
        // We look for the visible one or check by role.
        const tooltip = screen.getByRole('tooltip', { hidden: true })
        // Note: initial render might be hidden, waitFor handles visibility check.
        // But getByRole 'tooltip' targets the content element specifically.
        expect(tooltip).toBeVisible()
        expect(tooltip).toHaveTextContent('Tooltip content')
    })
  })
})
