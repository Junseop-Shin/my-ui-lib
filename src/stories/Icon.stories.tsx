import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '@/components/Icon';
import { Bell, Heart, Home } from 'lucide-react';

const meta: Meta<typeof Icon> = {
    title: 'Atomic/Icon',
    component: Icon,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
    args: {
        icon: Home,
    },
};

export const CustomColor: Story = {
    args: {
        icon: Heart,
        className: 'text-red-500',
    },
};

export const CustomSize: Story = {
    args: {
        icon: Bell,
        className: 'h-8 w-8',
    },
};
