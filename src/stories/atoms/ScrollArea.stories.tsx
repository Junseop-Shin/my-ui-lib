import type { Meta, StoryObj } from '@storybook/react'
import { ScrollArea } from '@/components/atoms/ScrollArea'
import { Separator } from '@/components/atoms/Separator'

const meta: Meta<typeof ScrollArea> = {
  title: 'Atoms/ScrollArea',
  component: ScrollArea,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof ScrollArea>

const tags = Array.from({ length: 40 }, (_, i) => `Item ${i + 1}`)

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-64 w-56 rounded-2xl border border-border">
      <div className="p-4">
        <h4 className="mb-3 text-sm font-semibold">Items</h4>
        {tags.map((tag) => (
          <div key={tag}>
            <p className="py-1 text-sm text-muted-foreground">{tag}</p>
            <Separator />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="w-72 rounded-2xl border border-border">
      <div className="flex gap-3 p-4">
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            className="shrink-0 w-20 h-20 rounded-xl bg-muted flex items-center justify-center text-xs text-muted-foreground"
          >
            {i + 1}
          </div>
        ))}
      </div>
      <ScrollArea.ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
}
