import type { Meta, StoryObj } from '@storybook/react-vite'
import { Accordion } from '@/components/molecules/Accordion'
import { Collapsible } from '@/components/molecules/Collapsible'
import { ChevronDown } from 'lucide-react'

const meta: Meta<typeof Accordion> = {
  title: 'Molecules/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof Accordion>

export const Default: Story = {
  render: () => (
    <div className="max-w-lg">
      <Accordion defaultValue={['0']}>
        <Accordion.Item value="0">
          <Accordion.Trigger>주문 체결 내역</Accordion.Trigger>
          <Accordion.Panel>
            체결된 주문의 수량, 단가, 수수료를 확인할 수 있습니다.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="1">
          <Accordion.Trigger>배당 일정</Accordion.Trigger>
          <Accordion.Panel>
            보유 종목의 배당 기준일과 지급 예정일을 안내합니다.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="2">
          <Accordion.Trigger>세금 안내</Accordion.Trigger>
          <Accordion.Panel>
            양도소득세와 배당소득세 계산 기준을 설명합니다.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
}

export const Multiple: Story = {
  name: '여러 개 동시에 열기',
  render: () => (
    <div className="max-w-lg">
      <Accordion openMultiple defaultValue={['0', '1']}>
        <Accordion.Item value="0">
          <Accordion.Trigger>첫 번째</Accordion.Trigger>
          <Accordion.Panel>동시에 열려 있습니다.</Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="1">
          <Accordion.Trigger>두 번째</Accordion.Trigger>
          <Accordion.Panel>이것도 열려 있습니다.</Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
}

export const CollapsibleExample: Story = {
  name: 'Collapsible — 항목 하나만',
  render: () => (
    <div className="max-w-lg">
      <Collapsible>
        <Collapsible.Trigger>
          상세 조건 보기
          <ChevronDown className="h-4 w-4" />
        </Collapsible.Trigger>
        <Collapsible.Panel>
          <div className="mt-2 rounded-xl border border-border p-4">
            최소 주문 수량 1주, 호가 단위 1원, 거래 시간 09:00–15:30
          </div>
        </Collapsible.Panel>
      </Collapsible>
    </div>
  ),
}
