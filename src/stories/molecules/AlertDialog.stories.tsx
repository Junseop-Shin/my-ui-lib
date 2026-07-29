import type { Meta, StoryObj } from '@storybook/react-vite'
import { AlertDialog } from '@/components/molecules/AlertDialog'
import { Drawer } from '@/components/molecules/Drawer'
import { Button } from '@/components/atoms/Button'

const meta: Meta<typeof AlertDialog> = {
  title: 'Molecules/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof AlertDialog>

export const Default: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialog.Trigger render={<Button variant="destructive">주문 취소</Button>} />
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>주문을 취소할까요?</AlertDialog.Title>
          <AlertDialog.Description>
            취소한 주문은 되돌릴 수 없습니다. 체결 대기 중인 수량 전량이 취소됩니다.
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Close render={<Button variant="outline">돌아가기</Button>} />
          <AlertDialog.Close render={<Button variant="destructive">주문 취소</Button>} />
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  ),
}

export const DrawerExample: Story = {
  name: 'Drawer — 모바일 시트',
  render: () => (
    <Drawer>
      <Drawer.Trigger render={<Button variant="outline">필터 열기</Button>} />
      <Drawer.Content>
        <Drawer.Title>필터</Drawer.Title>
        <Drawer.Description>
          조건을 선택하면 목록에 즉시 반영됩니다.
        </Drawer.Description>
        <div className="mt-6 flex justify-end">
          <Drawer.Close render={<Button>적용</Button>} />
        </div>
      </Drawer.Content>
    </Drawer>
  ),
}
