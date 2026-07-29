import type { Meta, StoryObj } from '@storybook/react-vite'
import { Popover } from '@/components/molecules/Popover'
import { PreviewCard } from '@/components/molecules/PreviewCard'
import { Button } from '@/components/atoms/Button'
import { Avatar } from '@/components/atoms/Avatar'

const meta: Meta<typeof Popover> = {
  title: 'Molecules/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Popover>

export const Default: Story = {
  render: () => (
    <Popover>
      <Popover.Trigger render={<Button variant="outline">지표 설명</Button>} />
      <Popover.Content>
        <Popover.Close />
        <Popover.Title>샤프 지수</Popover.Title>
        <Popover.Description>
          위험 대비 초과수익을 나타내는 지표입니다. 값이 높을수록 같은 위험에서 더 많은
          수익을 냈다는 뜻입니다.
        </Popover.Description>
      </Popover.Content>
    </Popover>
  ),
}

export const Sides: Story = {
  name: '위치 지정',
  render: () => (
    <div className="flex items-center gap-3">
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <Popover key={side}>
          <Popover.Trigger render={<Button variant="outline" size="sm">{side}</Button>} />
          <Popover.Content side={side} className="w-40">
            <Popover.Description>{side}에 열립니다.</Popover.Description>
          </Popover.Content>
        </Popover>
      ))}
    </div>
  ),
}

export const PreviewCardExample: Story = {
  name: 'PreviewCard — 호버 미리보기',
  render: () => (
    <PreviewCard>
      <PreviewCard.Trigger
        render={<a href="#preview" className="text-primary underline underline-offset-4">삼성전자</a>}
      />
      <PreviewCard.Content>
        <div className="flex items-center gap-3">
          <Avatar size="sm">
            <Avatar.Fallback>SE</Avatar.Fallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold text-foreground">삼성전자</p>
            <p className="text-xs text-muted-foreground">005930 · KOSPI</p>
          </div>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          반도체·디스플레이·모바일 사업을 영위하는 종합 전자기업입니다.
        </p>
      </PreviewCard.Content>
    </PreviewCard>
  ),
}
