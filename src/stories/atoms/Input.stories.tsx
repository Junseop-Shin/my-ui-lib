import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '@/components/atoms/Input'
import { Label } from '@/components/atoms/Label'

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: { placeholder: 'Search…' },
}

export const WithLabel: Story = {
  render: () => (
    <div className="grid gap-1.5 w-72">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  ),
}

export const Disabled: Story = {
  args: { placeholder: 'Disabled input', disabled: true },
}

export const Invalid: Story = {
  render: () => (
    <div className="grid gap-1.5 w-72">
      <Label htmlFor="bad">Username</Label>
      <Input id="bad" defaultValue="taken_name" aria-invalid="true" />
      <p className="text-xs text-destructive">This username is already taken.</p>
    </div>
  ),
}
