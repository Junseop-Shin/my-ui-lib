import type { Meta, StoryObj } from '@storybook/react-vite'
import { Slider } from '@/components/atoms/Slider'
import { Label } from '@/components/atoms/Label'

const meta: Meta<typeof Slider> = {
  title: 'Atoms/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Slider>

export const Default: Story = {
  render: () => (
    <div className="w-80">
      <Slider defaultValue={40}>
        <Slider.Control>
          <Slider.Track>
            <Slider.Indicator />
            <Slider.Thumb />
          </Slider.Track>
        </Slider.Control>
      </Slider>
    </div>
  ),
}

export const WithValue: Story = {
  render: () => (
    <div className="w-80">
      <Slider defaultValue={30}>
        <div className="flex items-center justify-between">
          <Label>포트폴리오 비중</Label>
          <Slider.Value />
        </div>
        <Slider.Control>
          <Slider.Track>
            <Slider.Indicator />
            <Slider.Thumb />
          </Slider.Track>
        </Slider.Control>
      </Slider>
    </div>
  ),
}

export const Range: Story = {
  render: () => (
    <div className="w-80">
      <Slider defaultValue={[20, 70]}>
        <div className="flex items-center justify-between">
          <Label>가격 범위</Label>
          <Slider.Value />
        </div>
        <Slider.Control>
          <Slider.Track>
            <Slider.Indicator />
            <Slider.Thumb />
            <Slider.Thumb />
          </Slider.Track>
        </Slider.Control>
      </Slider>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="w-80">
      <Slider defaultValue={55} disabled>
        <Slider.Control>
          <Slider.Track>
            <Slider.Indicator />
            <Slider.Thumb />
          </Slider.Track>
        </Slider.Control>
      </Slider>
    </div>
  ),
}
