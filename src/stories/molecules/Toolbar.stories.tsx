import type { Meta, StoryObj } from '@storybook/react-vite'
import { BarChart3, CandlestickChart, LineChart, ZoomIn, ZoomOut } from 'lucide-react'
import { Toolbar } from '@/components/molecules/Toolbar'
import { ContextMenu } from '@/components/molecules/ContextMenu'

const meta: Meta<typeof Toolbar> = {
  title: 'Molecules/Toolbar',
  component: Toolbar,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Toolbar>

export const Default: Story = {
  render: () => (
    <Toolbar>
      <Toolbar.Group>
        <Toolbar.Button aria-label="캔들 차트">
          <CandlestickChart className="h-4 w-4" />
        </Toolbar.Button>
        <Toolbar.Button aria-label="선 차트">
          <LineChart className="h-4 w-4" />
        </Toolbar.Button>
        <Toolbar.Button aria-label="막대 차트">
          <BarChart3 className="h-4 w-4" />
        </Toolbar.Button>
      </Toolbar.Group>
      <Toolbar.Separator />
      <Toolbar.Group>
        <Toolbar.Button aria-label="확대">
          <ZoomIn className="h-4 w-4" />
        </Toolbar.Button>
        <Toolbar.Button aria-label="축소">
          <ZoomOut className="h-4 w-4" />
        </Toolbar.Button>
      </Toolbar.Group>
      <Toolbar.Separator />
      <Toolbar.Input placeholder="종목 검색" />
    </Toolbar>
  ),
}

export const ContextMenuExample: Story = {
  name: 'ContextMenu — 우클릭 메뉴',
  render: () => (
    <ContextMenu>
      <ContextMenu.Trigger
        render={
          <div className="flex h-40 w-80 items-center justify-center rounded-2xl border border-dashed border-border text-sm text-muted-foreground">
            여기서 우클릭
          </div>
        }
      />
      <ContextMenu.Content>
        <ContextMenu.Label>차트</ContextMenu.Label>
        <ContextMenu.Item>지표 추가</ContextMenu.Item>
        <ContextMenu.Item>기간 설정</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item>이미지로 저장</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu>
  ),
}
