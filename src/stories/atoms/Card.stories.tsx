import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '@/components/atoms/Card';

const meta = {
    title: 'Atoms/Card',
    component: Card,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <div className="bg-slate-950 p-8 text-white">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        className: 'p-6 w-[350px]',
        children: (
            <div className="space-y-2">
                <h3 className="font-semibold leading-none tracking-tight">Notification</h3>
                <p className="text-sm text-slate-400">You have a new message.</p>
            </div>
        ),
    },
};
