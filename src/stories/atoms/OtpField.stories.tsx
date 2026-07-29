import type { Meta, StoryObj } from '@storybook/react-vite'
import { OtpField } from '@/components/atoms/OtpField'
import { CheckboxGroup } from '@/components/atoms/CheckboxGroup'
import { Checkbox } from '@/components/atoms/Checkbox'
import { Fieldset } from '@/components/atoms/Fieldset'
import { Label } from '@/components/atoms/Label'

const meta: Meta<typeof OtpField> = {
  title: 'Atoms/OtpField',
  component: OtpField,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof OtpField>

export const Default: Story = {
  render: () => (
    <div>
      <Label className="mb-2 block">인증코드 6자리</Label>
      <OtpField>
        <OtpField.Input index={0} />
        <OtpField.Input index={1} />
        <OtpField.Input index={2} />
        <OtpField.Separator />
        <OtpField.Input index={3} />
        <OtpField.Input index={4} />
        <OtpField.Input index={5} />
      </OtpField>
    </div>
  ),
}

export const CheckboxGroupExample: Story = {
  name: 'CheckboxGroup + Fieldset',
  render: () => (
    <Fieldset render={<CheckboxGroup defaultValue={['kospi']} />}>
      <Fieldset.Legend>거래소 선택</Fieldset.Legend>
      <Label className="flex items-center gap-2">
        <Checkbox value="kospi" />
        KOSPI
      </Label>
      <Label className="flex items-center gap-2">
        <Checkbox value="kosdaq" />
        KOSDAQ
      </Label>
      <Label className="flex items-center gap-2">
        <Checkbox value="nasdaq" />
        NASDAQ
      </Label>
    </Fieldset>
  ),
}
