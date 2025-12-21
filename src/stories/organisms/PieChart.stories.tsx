import type { Meta, StoryObj } from '@storybook/react';
import { PieChart } from '@/components/organisms/PieChart';

const meta = {
    title: 'Organisms/PieChart',
    component: PieChart,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof PieChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];

export const Default: Story = {
    args: {
        data,
        dataKey: 'value',
        nameKey: 'name',
        height: 300,
        className: 'w-[400px]',
    },
};

export const CustomColors: Story = {
    args: {
        data,
        dataKey: 'value',
        nameKey: 'name',
        height: 300,
        colors: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
        className: 'w-[400px]',
    },
};
