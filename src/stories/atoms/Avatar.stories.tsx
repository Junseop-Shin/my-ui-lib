import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from '@/components/atoms/Avatar'

const meta: Meta = {
  title: 'Atoms/Avatar',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Avatar>
      <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
      <Avatar.Fallback>SC</Avatar.Fallback>
    </Avatar>
  ),
}

export const Fallback: Story = {
  render: () => (
    <Avatar>
      <Avatar.Image src="/broken-image.png" alt="broken" />
      <Avatar.Fallback>JS</Avatar.Fallback>
    </Avatar>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Avatar key={size} size={size}>
          <Avatar.Fallback>{size.toUpperCase()}</Avatar.Fallback>
        </Avatar>
      ))}
    </div>
  ),
}
