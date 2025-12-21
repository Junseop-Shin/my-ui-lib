import type { Meta, StoryObj } from '@storybook/react';
import { ActiveStrategyCard } from '@/components/molecules/ActiveStrategyCard';
import { fn } from '@storybook/test';

const meta = {
    title: 'Molecules/ActiveStrategyCard',
    component: ActiveStrategyCard,
    parameters: {
        layout: 'centered',
    },
    args: {
        onToggle: fn(),
    },
    decorators: [
        (Story) => (
            <div className="bg-slate-950 p-8 w-[400px]">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof ActiveStrategyCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Running: Story = {
    args: {
        name: 'BTC Momentum',
        roi: '12.5',
        status: 'running',
    },
};

export const Stopped: Story = {
    args: {
        name: 'ETH Scalping',
        roi: '-2.1',
        status: 'stopped',
    },
};
