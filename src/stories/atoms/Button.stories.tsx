import type { Meta, StoryObj } from '@storybook/react'
import { Search, Plus, ArrowRight } from 'lucide-react'
import { Button } from '@/components/atoms/Button'

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'outline', 'ghost', 'destructive', 'link'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'icon', 'icon-sm', 'icon-lg'],
    },
  },
}
export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: { variant: 'default', children: 'Get started' },
}

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Learn more' },
}

export const Outline: Story = {
  args: { variant: 'outline', children: 'Add to Cart' },
}

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Cancel' },
}

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Delete account' },
}

export const Link: Story = {
  args: { variant: 'link', children: 'View all →' },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button><Plus className="h-4 w-4" />New item</Button>
      <Button variant="secondary"><Search className="h-4 w-4" />Search</Button>
      <Button size="icon"><ArrowRight className="h-4 w-4" /></Button>
    </div>
  ),
}

export const Disabled: Story = {
  args: { disabled: true, children: 'Unavailable' },
}
