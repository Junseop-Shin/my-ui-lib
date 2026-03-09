import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup, RadioGroupItem } from '@/components/atoms/RadioGroup'
import { Label } from '@/components/atoms/Label'

const meta: Meta<typeof RadioGroup> = {
  title: 'Atoms/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option-1" className="gap-3">
      {['Option One', 'Option Two', 'Option Three'].map((label, i) => (
        <div key={i} className="flex items-center gap-2">
          <RadioGroupItem value={`option-${i + 1}`} id={`r${i + 1}`} />
          <Label htmlFor={`r${i + 1}`}>{label}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
}

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option-1" className="gap-3">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-1" id="rd1" />
        <Label htmlFor="rd1">Available</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-2" id="rd2" disabled />
        <Label htmlFor="rd2" className="opacity-50">Unavailable</Label>
      </div>
    </RadioGroup>
  ),
}
