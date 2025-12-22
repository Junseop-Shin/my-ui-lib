import type { Meta, StoryObj } from '@storybook/react'
import { ScrollArea } from './ScrollArea'
import { Typography } from '@/components/atoms/Typography/Typography'

const meta = {
  title: 'Atoms/ScrollArea',
  component: ScrollArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
        <Typography variant="h4" className="mb-4">Tags</Typography>
        {Array.from({ length: 50 }).map((_, i, a) => (
            <div key={i} className="text-sm">
                v1.2.0-beta.{a.length - i}
                <div className="my-2 h-px bg-muted" />
            </div>
        ))}
    </ScrollArea>
  ),
}
