import type { Meta, StoryObj } from '@storybook/react'
import {
  LayoutDashboard, TrendingUp, Layers, Settings, Activity, LogOut
} from 'lucide-react'
import { Sidebar } from '@/components/organisms/Sidebar'
import { Button } from '@/components/atoms/Button'
import { Avatar } from '@/components/atoms/Avatar'

const meta: Meta<typeof Sidebar> = {
  title: 'Organisms/Sidebar',
  component: Sidebar,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Sidebar>

export const Default: Story = {
  render: () => (
    <div className="relative h-[600px]">
      <Sidebar>
        <Sidebar.Header>
          <TrendingUp className="h-5 w-5 text-primary" />
          <span className="font-semibold">KIS Trader</span>
        </Sidebar.Header>
        <Sidebar.Nav>
          <Sidebar.NavItem icon={LayoutDashboard} label="Dashboard" href="#" active />
          <Sidebar.NavItem icon={Layers} label="Strategy Builder" href="#" />
          <Sidebar.NavItem icon={TrendingUp} label="My Strategies" href="#" />
          <Sidebar.NavItem icon={Activity} label="System Status" href="#" />
          <Sidebar.NavItem icon={Settings} label="Settings" href="#" />
        </Sidebar.Nav>
        <Sidebar.Footer>
          <div className="flex items-center gap-3">
            <Avatar size="sm"><Avatar.Fallback>JS</Avatar.Fallback></Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Junseop Shin</p>
              <p className="text-xs text-muted-foreground truncate">Admin</p>
            </div>
            <Button variant="ghost" size="icon-sm">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </Sidebar.Footer>
      </Sidebar>
    </div>
  ),
}

export const Collapsed: Story = {
  render: () => (
    <div className="relative h-[600px]">
      <Sidebar defaultCollapsed>
        <Sidebar.Header>
          <TrendingUp className="h-5 w-5 text-primary" />
        </Sidebar.Header>
        <Sidebar.Nav>
          <Sidebar.NavItem icon={LayoutDashboard} label="Dashboard" href="#" active />
          <Sidebar.NavItem icon={Layers} label="Strategy Builder" href="#" />
          <Sidebar.NavItem icon={Settings} label="Settings" href="#" />
        </Sidebar.Nav>
      </Sidebar>
    </div>
  ),
}
