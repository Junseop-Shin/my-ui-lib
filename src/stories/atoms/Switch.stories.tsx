import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from '@/components/atoms/Switch'
import { Label } from '@/components/atoms/Label'

const meta: Meta<typeof Switch> = {
  title: 'Atoms/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Switch id="notifications" />
      <Label htmlFor="notifications">Enable notifications</Label>
    </div>
  ),
}

export const Checked: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Switch id="s2" defaultChecked />
      <Label htmlFor="s2">Dark mode</Label>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Switch id="d1" disabled />
        <Label htmlFor="d1" className="opacity-50">Off, disabled</Label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="d2" disabled defaultChecked />
        <Label htmlFor="d2" className="opacity-50">On, disabled</Label>
      </div>
    </div>
  ),
}
