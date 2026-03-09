import type { Meta, StoryObj } from '@storybook/react'
import { Select } from '@/components/atoms/Select'
import { Label } from '@/components/atoms/Label'

const meta: Meta = {
  title: 'Atoms/Select',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Select>
      <Select.Trigger className="w-48">
        <Select.Value placeholder="Select a fruit" />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="apple">Apple</Select.Item>
        <Select.Item value="banana">Banana</Select.Item>
        <Select.Item value="cherry">Cherry</Select.Item>
      </Select.Content>
    </Select>
  ),
}

export const WithGroups: Story = {
  render: () => (
    <div className="grid gap-1.5">
      <Label>Region</Label>
      <Select>
        <Select.Trigger className="w-56">
          <Select.Value placeholder="Select a timezone" />
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Label>North America</Select.Label>
            <Select.Item value="est">Eastern Standard Time</Select.Item>
            <Select.Item value="cst">Central Standard Time</Select.Item>
            <Select.Item value="pst">Pacific Standard Time</Select.Item>
          </Select.Group>
          <Select.Separator />
          <Select.Group>
            <Select.Label>Asia Pacific</Select.Label>
            <Select.Item value="kst">Korea Standard Time</Select.Item>
            <Select.Item value="jst">Japan Standard Time</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <Select.Trigger className="w-48">
        <Select.Value placeholder="Disabled" />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="x">Item</Select.Item>
      </Select.Content>
    </Select>
  ),
}
