import type { Meta, StoryObj } from '@storybook/react-vite'
import { Combobox } from '@/components/molecules/Combobox'
import { Autocomplete } from '@/components/molecules/Autocomplete'
import { Label } from '@/components/atoms/Label'

const stocks = [
  '삼성전자',
  'SK하이닉스',
  'LG에너지솔루션',
  '삼성바이오로직스',
  '현대차',
  'NAVER',
  '카카오',
]

const meta: Meta<typeof Combobox> = {
  title: 'Molecules/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Combobox>

export const Default: Story = {
  render: () => (
    <div className="w-72">
      <Label className="mb-1.5 block">종목 검색</Label>
      <Combobox items={stocks}>
        <Combobox.InputGroup>
          <Combobox.Input placeholder="종목명을 입력하세요" />
          <Combobox.Clear />
          <Combobox.Trigger />
        </Combobox.InputGroup>
        <Combobox.Content>
          <Combobox.Empty>결과가 없습니다.</Combobox.Empty>
          <Combobox.List>
            {(item: string) => (
              <Combobox.Item key={item} value={item}>
                {item}
              </Combobox.Item>
            )}
          </Combobox.List>
        </Combobox.Content>
      </Combobox>
    </div>
  ),
}

export const AutocompleteExample: Story = {
  name: 'Autocomplete — 자유 입력 + 제안',
  render: () => (
    <div className="w-72">
      <Label className="mb-1.5 block">검색어</Label>
      <Autocomplete items={stocks}>
        <Autocomplete.InputGroup>
          <Autocomplete.Input placeholder="검색어를 입력하세요" />
          <Autocomplete.Clear />
        </Autocomplete.InputGroup>
        <Autocomplete.Content>
          <Autocomplete.Empty>제안이 없습니다.</Autocomplete.Empty>
          <Autocomplete.List>
            {(item: string) => (
              <Autocomplete.Item key={item} value={item}>
                {item}
              </Autocomplete.Item>
            )}
          </Autocomplete.List>
        </Autocomplete.Content>
      </Autocomplete>
    </div>
  ),
}
