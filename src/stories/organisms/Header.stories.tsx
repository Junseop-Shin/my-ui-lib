import type { Meta, StoryObj } from '@storybook/react'
import { Bell, Search, Moon } from 'lucide-react'
import { Header } from '@/components/organisms/Header'
import { Button } from '@/components/atoms/Button'
import { Avatar } from '@/components/atoms/Avatar'
import { Input } from '@/components/atoms/Input'

const meta: Meta<typeof Header> = {
  title: 'Organisms/Header',
  component: Header,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Header>

export const Default: Story = {
  render: () => (
    <Header>
      <Header.Brand>
        <span className="text-lg font-semibold tracking-tight">Acme</span>
      </Header.Brand>
      <Header.Nav className="ml-8">
        <Header.NavItem href="#" active>Overview</Header.NavItem>
        <Header.NavItem href="#">Analytics</Header.NavItem>
        <Header.NavItem href="#">Projects</Header.NavItem>
      </Header.Nav>
      <Header.Actions>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input placeholder="Search…" className="w-52 h-8 pl-8 text-xs" />
        </div>
        <Button variant="ghost" size="icon-sm">
          <Bell className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon-sm">
          <Moon className="h-4 w-4" />
        </Button>
        <Avatar size="sm">
          <Avatar.Fallback>JS</Avatar.Fallback>
        </Avatar>
      </Header.Actions>
    </Header>
  ),
}

export const Minimal: Story = {
  render: () => (
    <Header>
      <Header.Brand>
        <span className="font-bold">My App</span>
      </Header.Brand>
      <Header.Actions>
        <Button size="sm">Sign in</Button>
      </Header.Actions>
    </Header>
  ),
}
