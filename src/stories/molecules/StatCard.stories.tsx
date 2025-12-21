import type { Meta, StoryObj } from '@storybook/react';
import { StatCard } from '@/components/molecules/StatCard';
import { DollarSign, Activity, Users } from 'lucide-react';

const meta = {
    title: 'Molecules/StatCard',
    component: StatCard,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <div className="bg-slate-950 p-8">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PositiveTrend: Story = {
    args: {
        title: 'Total Revenue',
        value: '$45,231.89',
        trend: '20.1% from last month',
        trendUp: true,
        icon: DollarSign,
    },
};

export const NegativeTrend: Story = {
    args: {
        title: 'Active Users',
        value: '2,350',
        trend: '4.5% from last month',
        trendUp: false,
        icon: Users,
    },
};

export const NoTrend: Story = {
    args: {
        title: 'System Status',
        value: 'Operational',
        icon: Activity,
    },
};
