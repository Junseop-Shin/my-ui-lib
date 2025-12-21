import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '@/components/organisms/Header';

const meta = {
    title: 'Organisms/Header',
    component: Header,
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        (Story) => (
            <div className="min-h-screen bg-slate-950 text-white">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        user: { name: '개발자', role: '관리자' },
        searchPlaceholder: '시장 또는 전략 검색...',
    }
};
