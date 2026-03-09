import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LayoutDashboard, Settings } from 'lucide-react'
import { Sidebar, useSidebar } from '../Sidebar'

function SampleSidebar({ defaultCollapsed = false }: { defaultCollapsed?: boolean }) {
  return (
    <Sidebar defaultCollapsed={defaultCollapsed}>
      <Sidebar.Header>
        <span>My App</span>
      </Sidebar.Header>
      <Sidebar.Nav>
        <Sidebar.NavItem icon={LayoutDashboard} label="Dashboard" href="#" active />
        <Sidebar.NavItem icon={Settings} label="Settings" href="#" />
      </Sidebar.Nav>
      <Sidebar.Footer>Footer</Sidebar.Footer>
    </Sidebar>
  )
}

describe('Sidebar', () => {
  it('renders nav items with labels', () => {
    render(<SampleSidebar />)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('active item has primary styling', () => {
    render(<SampleSidebar />)
    expect(screen.getByText('Dashboard').closest('a')).toHaveClass('bg-primary/10')
  })

  it('hides labels when collapsed', () => {
    render(<SampleSidebar defaultCollapsed />)
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument()
    expect(screen.queryByText('Settings')).not.toBeInTheDocument()
  })

  it('renders header and footer', () => {
    render(<SampleSidebar />)
    expect(screen.getByText('My App')).toBeInTheDocument()
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })

  it('useSidebar provides toggle function', () => {
    function Toggler() {
      const { collapsed, toggle } = useSidebar()
      return <button onClick={toggle}>{collapsed ? 'collapsed' : 'expanded'}</button>
    }
    render(
      <Sidebar>
        <Toggler />
      </Sidebar>
    )
    expect(screen.getByRole('button')).toHaveTextContent('expanded')
  })
})
