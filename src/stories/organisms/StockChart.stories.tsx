import type { Meta, StoryObj } from '@storybook/react';
import { StockChart } from '@/components/organisms/StockChart';

// Mock Data
const generateData = (count: number) => {
    const data = [];
    let price = 100;
    for (let i = 0; i < count; i++) {
        price = price + Math.random() * 10 - 5;
        data.push({
            date: `2023-01-${String(i + 1).padStart(2, '0')}`,
            close: price,
            volume: Math.floor(Math.random() * 10000) + 1000,
        });
    }
    return data;
};

const data = generateData(50);

const meta: Meta<typeof StockChart> = {
    title: 'Organisms/StockChart',
    component: StockChart,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StockChart>;

export const Default: Story = {
    args: {
        data,
        height: 500,
    },
};

export const WithReferenceLine: Story = {
    args: {
        data,
        height: 500,
        referenceLine: {
            y: 100,
            label: 'Buy Price',
            color: 'green',
        },
    },
};
