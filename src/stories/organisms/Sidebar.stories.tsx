import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from '@/components/organisms/Sidebar';

const meta = {
    title: 'Organisms/Sidebar',
    component: Sidebar,
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        (Story) => (
            <div className="min-h-screen bg-slate-950">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

import { LayoutDashboard, TrendingUp, Layers, Settings, Activity } from 'lucide-react';

const exampleMenuItems = [
    { name: '대시보드', icon: LayoutDashboard, href: '/dashboard' },
    { name: '전략 빌더', icon: Layers, href: '/strategies/builder' },
    { name: '내 전략', icon: TrendingUp, href: '/strategies' },
    { name: '시스템 상태', icon: Activity, href: '/status' },
    { name: '설정', icon: Settings, href: '/settings' },
];

export const Default: Story = {
    args: {
        menuItems: exampleMenuItems,
        title: "KIS 트레이더",
    },
};
