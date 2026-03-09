import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@/components/atoms/Button'
import { Badge } from '@/components/atoms/Badge'
import { Card } from '@/components/atoms/Card'

const meta: Meta<typeof Card> = {
  title: 'Atoms/Card',
  component: Card,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => (
    <Card className="w-[360px]">
      <Card.Header>
        <Card.Title>Notification</Card.Title>
        <Card.Description>You have 3 unread messages.</Card.Description>
      </Card.Header>
      <Card.Content>
        <p className="text-sm text-muted-foreground">
          Check your inbox to see the latest updates from your team.
        </p>
      </Card.Content>
      <Card.Footer className="gap-2">
        <Button size="sm">View all</Button>
        <Button size="sm" variant="ghost">Dismiss</Button>
      </Card.Footer>
    </Card>
  ),
}

export const Product: Story = {
  render: () => (
    <Card className="w-[300px] overflow-hidden">
      <div className="aspect-video bg-muted" />
      <Card.Header>
        <div className="flex items-start justify-between">
          <Card.Title className="text-base">MacBook Pro</Card.Title>
          <Badge>New</Badge>
        </div>
        <Card.Description>Supercharged by M4 Pro</Card.Description>
      </Card.Header>
      <Card.Footer className="justify-between">
        <span className="font-semibold">From $1,999</span>
        <Button size="sm">Buy</Button>
      </Card.Footer>
    </Card>
  ),
}

export const Simple: Story = {
  render: () => (
    <Card className="w-[360px]">
      <Card.Content className="pt-6">
        <p className="text-sm">A minimal card with just content.</p>
      </Card.Content>
    </Card>
  ),
}
