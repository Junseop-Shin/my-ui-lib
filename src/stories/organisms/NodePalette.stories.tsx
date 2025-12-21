import type { Meta, StoryObj } from '@storybook/react';
import { NodePalette } from '@/components/organisms/NodePalette';

const meta = {
    title: 'Organisms/NodePalette',
    component: NodePalette,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <div className="bg-slate-950 p-8 h-[600px] flex">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof NodePalette>;

export default meta;
type Story = StoryObj<typeof meta>;

const exampleNodeTypes = [
    { type: 'input', label: '시간 트리거', description: '실행 예약' },
    { type: 'condition', label: '조건', description: 'If/Else 로직' },
    { type: 'action', label: '매수 주문', description: '매수 실행' },
    { type: 'action', label: '매도 주문', description: '매도 실행' },
];

export const Default: Story = {
    args: {
        nodeTypes: exampleNodeTypes,
        title: "노드 라이브러리",
        description: "노드를 캔버스로 드래그하세요",
    }
};
