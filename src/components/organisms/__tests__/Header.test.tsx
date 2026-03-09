import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Header } from '../Header'
import { Button } from '@/components/atoms/Button'

describe('Header', () => {
  it('renders brand content', () => {
    render(
      <Header>
        <Header.Brand>My App</Header.Brand>
      </Header>
    )
    expect(screen.getByText('My App')).toBeInTheDocument()
  })

  it('renders nav items', () => {
    render(
      <Header>
        <Header.Nav>
          <Header.NavItem href="#">Home</Header.NavItem>
          <Header.NavItem href="#">About</Header.NavItem>
        </Header.Nav>
      </Header>
    )
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('active nav item has correct data attribute', () => {
    render(
      <Header>
        <Header.Nav>
          <Header.NavItem href="#" active>Dashboard</Header.NavItem>
        </Header.Nav>
      </Header>
    )
    expect(screen.getByText('Dashboard').closest('a')).toHaveClass('bg-accent')
  })

  it('renders actions', () => {
    render(
      <Header>
        <Header.Actions>
          <Button>Sign in</Button>
        </Header.Actions>
      </Header>
    )
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument()
  })

  it('renders as <header> element', () => {
    render(<Header data-testid="hdr"><Header.Brand>X</Header.Brand></Header>)
    expect(screen.getByTestId('hdr').tagName).toBe('HEADER')
  })
})
