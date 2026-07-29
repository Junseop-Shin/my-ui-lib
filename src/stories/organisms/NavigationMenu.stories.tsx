import type { Meta, StoryObj } from '@storybook/react-vite'
import { NavigationMenu } from '@/components/organisms/NavigationMenu'
import { Menubar } from '@/components/organisms/Menubar'
import { DropdownMenu } from '@/components/molecules/DropdownMenu'

const meta: Meta<typeof NavigationMenu> = {
  title: 'Organisms/NavigationMenu',
  component: NavigationMenu,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof NavigationMenu>

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>투자</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.Link href="#stocks">국내 주식</NavigationMenu.Link>
            <NavigationMenu.Link href="#overseas">해외 주식</NavigationMenu.Link>
            <NavigationMenu.Link href="#etf">ETF</NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>분석</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.Link href="#portfolio">포트폴리오</NavigationMenu.Link>
            <NavigationMenu.Link href="#backtest">백테스트</NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu>
  ),
}

export const MenubarExample: Story = {
  name: 'Menubar — 데스크톱 앱 스타일',
  render: () => (
    <Menubar>
      <DropdownMenu>
        <DropdownMenu.Trigger className="rounded-lg px-3 py-1.5 text-sm font-medium hover:bg-accent">
          파일
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item>새 전략</DropdownMenu.Item>
          <DropdownMenu.Item>불러오기</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>내보내기</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenu.Trigger className="rounded-lg px-3 py-1.5 text-sm font-medium hover:bg-accent">
          보기
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item>차트</DropdownMenu.Item>
          <DropdownMenu.Item>호가창</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    </Menubar>
  ),
}
