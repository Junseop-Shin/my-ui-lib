import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Tag } from '@/components/atoms/Tag'

const meta: Meta<typeof Tag> = {
  title: 'Atoms/Tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'outline', 'destructive', 'success'],
    },
    size: { control: 'select', options: ['sm', 'md'] },
  },
}
export default meta
type Story = StoryObj<typeof Tag>

export const All: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag variant="default">React</Tag>
      <Tag variant="primary">TypeScript</Tag>
      <Tag variant="outline">Next.js</Tag>
      <Tag variant="success">Live</Tag>
      <Tag variant="destructive">Deprecated</Tag>
    </div>
  ),
}

export const Dismissible: Story = {
  render: () => {
    const [tags, setTags] = React.useState(['React', 'TypeScript', 'Tailwind', 'Vite'])
    return (
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <Tag key={t} variant="primary" onDismiss={() => setTags((prev) => prev.filter((x) => x !== t))}>
            {t}
          </Tag>
        ))}
      </div>
    )
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Tag size="sm">Small</Tag>
      <Tag size="md">Medium</Tag>
    </div>
  ),
}
