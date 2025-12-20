import type { Meta, StoryObj } from '@storybook/react';
import { Label } from '@/components/Label';

const meta: Meta<typeof Label> = {
    title: 'Atomic/Label',
    component: Label,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
    args: {
        children: 'This is a label',
    },
};
