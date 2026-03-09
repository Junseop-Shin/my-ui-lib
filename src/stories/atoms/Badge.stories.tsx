import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '@/components/atoms/Badge'

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'outline', 'destructive', 'success', 'warning'],
    },
  },
}
export default meta
type Story = StoryObj<typeof Badge>

export const All: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">New</Badge>
      <Badge variant="secondary">Beta</Badge>
      <Badge variant="outline">Draft</Badge>
      <Badge variant="success">Live</Badge>
      <Badge variant="destructive">Error</Badge>
      <Badge variant="warning">Review</Badge>
    </div>
  ),
}

export const Default: Story = { args: { children: 'New', variant: 'default' } }
export const Success: Story = { args: { children: 'Live', variant: 'success' } }
export const Destructive: Story = { args: { children: 'Error', variant: 'destructive' } }
export const Outline: Story = { args: { children: 'Draft', variant: 'outline' } }
