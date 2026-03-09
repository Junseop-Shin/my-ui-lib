import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/molecules/Tabs'

const meta: Meta<typeof Tabs> = {
  title: 'Molecules/Tabs',
  component: Tabs,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <Tabs.List>
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Trigger value="password">Password</Tabs.Trigger>
        <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="account">
        <p className="text-sm text-muted-foreground">Make changes to your account here.</p>
      </Tabs.Content>
      <Tabs.Content value="password">
        <p className="text-sm text-muted-foreground">Change your password here.</p>
      </Tabs.Content>
      <Tabs.Content value="settings">
        <p className="text-sm text-muted-foreground">Manage your settings here.</p>
      </Tabs.Content>
    </Tabs>
  ),
}

export const WithDisabled: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[400px]">
      <Tabs.List>
        <Tabs.Trigger value="tab1">Active</Tabs.Trigger>
        <Tabs.Trigger value="tab2" disabled>Disabled</Tabs.Trigger>
        <Tabs.Trigger value="tab3">Other</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">
        <p className="text-sm text-muted-foreground">Active tab content.</p>
      </Tabs.Content>
      <Tabs.Content value="tab3">
        <p className="text-sm text-muted-foreground">Other tab content.</p>
      </Tabs.Content>
    </Tabs>
  ),
}
