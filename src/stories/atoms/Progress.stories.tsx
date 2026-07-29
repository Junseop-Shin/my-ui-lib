import type { Meta, StoryObj } from '@storybook/react-vite'
import { Progress } from '@/components/atoms/Progress'
import { Meter } from '@/components/atoms/Meter'

const meta: Meta<typeof Progress> = {
  title: 'Atoms/Progress',
  component: Progress,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Progress>

export const Default: Story = {
  render: () => (
    <div className="w-80">
      <Progress value={60}>
        <Progress.Track>
          <Progress.Indicator />
        </Progress.Track>
      </Progress>
    </div>
  ),
}

export const WithLabel: Story = {
  render: () => (
    <div className="w-80">
      <Progress value={72}>
        <div className="flex items-center justify-between">
          <Progress.Label>동기화 중</Progress.Label>
          <Progress.Value />
        </div>
        <Progress.Track>
          <Progress.Indicator />
        </Progress.Track>
      </Progress>
    </div>
  ),
}

export const Indeterminate: Story = {
  name: '값을 모를 때',
  render: () => (
    <div className="w-80">
      <Progress value={null}>
        <Progress.Label>불러오는 중</Progress.Label>
        <Progress.Track>
          <Progress.Indicator />
        </Progress.Track>
      </Progress>
    </div>
  ),
}

export const MeterExample: Story = {
  name: 'Meter — 범위 내 현재값',
  render: () => (
    <div className="w-80">
      <Meter value={0.68}>
        <div className="flex items-center justify-between">
          <Meter.Label>계좌 사용률</Meter.Label>
          <Meter.Value />
        </div>
        <Meter.Track>
          <Meter.Indicator />
        </Meter.Track>
      </Meter>
    </div>
  ),
}
