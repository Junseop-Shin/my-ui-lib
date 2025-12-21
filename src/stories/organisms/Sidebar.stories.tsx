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

export const Default: Story = {};
