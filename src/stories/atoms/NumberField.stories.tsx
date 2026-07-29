import type { Meta, StoryObj } from '@storybook/react-vite'
import { NumberField } from '@/components/atoms/NumberField'
import { Label } from '@/components/atoms/Label'

const meta: Meta<typeof NumberField> = {
  title: 'Atoms/NumberField',
  component: NumberField,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof NumberField>

export const Default: Story = {
  render: () => (
    <NumberField defaultValue={10}>
      <NumberField.Group>
        <NumberField.Decrement />
        <NumberField.Input />
        <NumberField.Increment />
      </NumberField.Group>
    </NumberField>
  ),
}

export const WithLabel: Story = {
  render: () => (
    <NumberField id="qty" defaultValue={100} min={0} step={10}>
      <Label htmlFor="qty">주문 수량</Label>
      <NumberField.Group>
        <NumberField.Decrement />
        <NumberField.Input />
        <NumberField.Increment />
      </NumberField.Group>
    </NumberField>
  ),
}

export const Currency: Story = {
  name: '통화 포맷',
  render: () => (
    <NumberField
      id="amount"
      defaultValue={50000}
      step={1000}
      min={0}
      format={{ style: 'currency', currency: 'KRW' }}
    >
      <Label htmlFor="amount">투자 금액</Label>
      <NumberField.Group>
        <NumberField.Decrement />
        <NumberField.Input className="w-36" />
        <NumberField.Increment />
      </NumberField.Group>
    </NumberField>
  ),
}

export const Disabled: Story = {
  render: () => (
    <NumberField defaultValue={5} disabled>
      <NumberField.Group>
        <NumberField.Decrement />
        <NumberField.Input />
        <NumberField.Increment />
      </NumberField.Group>
    </NumberField>
  ),
}
