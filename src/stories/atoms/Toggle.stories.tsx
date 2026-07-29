import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bold, Italic, Underline } from 'lucide-react'
import { Toggle } from '@/components/atoms/Toggle'
import { ToggleGroup } from '@/components/atoms/ToggleGroup'

const meta: Meta<typeof Toggle> = {
  title: 'Atoms/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Toggle>

export const Default: Story = {
  render: () => <Toggle>Bookmark</Toggle>,
}

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Toggle variant="default" defaultPressed>Default</Toggle>
      <Toggle variant="outline">Outline</Toggle>
      <Toggle variant="ghost">Ghost</Toggle>
    </div>
  ),
}

export const IconOnly: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Toggle size="icon" variant="outline" aria-label="Bold" defaultPressed>
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle size="icon" variant="outline" aria-label="Italic">
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle size="icon" variant="outline" aria-label="Underline" disabled>
        <Underline className="h-4 w-4" />
      </Toggle>
    </div>
  ),
}

export const Group: Story = {
  name: 'ToggleGroup — 단일 선택',
  render: () => (
    <ToggleGroup defaultValue={['week']}>
      <Toggle value="day" size="sm" variant="ghost">1D</Toggle>
      <Toggle value="week" size="sm" variant="ghost">1W</Toggle>
      <Toggle value="month" size="sm" variant="ghost">1M</Toggle>
      <Toggle value="year" size="sm" variant="ghost">1Y</Toggle>
    </ToggleGroup>
  ),
}

export const GroupMultiple: Story = {
  name: 'ToggleGroup — 다중 선택',
  render: () => (
    <ToggleGroup multiple defaultValue={['bold', 'italic']}>
      <Toggle value="bold" size="icon-sm" variant="ghost" aria-label="Bold">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle value="italic" size="icon-sm" variant="ghost" aria-label="Italic">
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle value="underline" size="icon-sm" variant="ghost" aria-label="Underline">
        <Underline className="h-4 w-4" />
      </Toggle>
    </ToggleGroup>
  ),
}
