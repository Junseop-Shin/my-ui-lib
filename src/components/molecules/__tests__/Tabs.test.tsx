import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../Tabs'

function renderTabs() {
  return render(
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3" disabled>Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content 1</TabsContent>
      <TabsContent value="tab2">Content 2</TabsContent>
      <TabsContent value="tab3">Content 3</TabsContent>
    </Tabs>
  )
}

describe('Tabs', () => {
  it('renders default active tab content', () => {
    renderTabs()
    expect(screen.getByText('Content 1')).toBeInTheDocument()
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument()
  })

  it('switches content on trigger click', async () => {
    renderTabs()
    await userEvent.click(screen.getByRole('tab', { name: 'Tab 2' }))
    expect(screen.getByText('Content 2')).toBeInTheDocument()
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
  })

  it('disabled tab cannot be clicked', async () => {
    renderTabs()
    const disabledTab = screen.getByRole('tab', { name: 'Tab 3' })
    expect(disabledTab).toBeDisabled()
  })

  it('active trigger has correct aria-selected', () => {
    renderTabs()
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('data-state', 'active')
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('data-state', 'inactive')
  })

  it('supports compound dot notation', () => {
    render(
      <Tabs defaultValue="a">
        <Tabs.List><Tabs.Trigger value="a">A</Tabs.Trigger></Tabs.List>
        <Tabs.Content value="a">Alpha</Tabs.Content>
      </Tabs>
    )
    expect(screen.getByText('Alpha')).toBeInTheDocument()
  })
})
