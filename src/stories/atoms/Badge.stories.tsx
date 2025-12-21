import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@/components/atoms/Badge';

const meta = {
    title: 'Atoms/Badge',
    component: Badge,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <div className="bg-slate-950 p-8 flex gap-4">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: 'Badge',
        variant: 'default',
    },
};

export const Success: Story = {
    args: {
        children: 'Success',
        variant: 'success',
    },
};

export const Destructive: Story = {
    args: {
        children: 'Destructive',
        variant: 'destructive',
    },
};

export const Outline: Story = {
    args: {
        children: 'Outline',
        variant: 'outline',
    },
};
