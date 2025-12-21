import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from '@/components/organisms/DataTable';
import { ColumnDef } from '@tanstack/react-table';

// Mock Data
type Payment = {
    id: string;
    amount: number;
    status: 'pending' | 'processing' | 'success' | 'failed';
    email: string;
};

const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: 'status',
        header: 'Status',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'amount',
        header: 'Amount',
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)
            return <div className="font-medium">{formatted}</div>
        },
    },
];

const data: Payment[] = Array.from({ length: 20 }, (_, i) => ({
    id: `id-${i}`,
    amount: Math.floor(Math.random() * 500),
    status: ['pending', 'processing', 'success', 'failed'][Math.floor(Math.random() * 4)] as any,
    email: `user${i}@example.com`,
}));

const meta: Meta<typeof DataTable> = {
    title: 'Organisms/DataTable',
    component: DataTable,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const Default: Story = {
    args: {
        columns: columns as any,
        data,
    },
};
