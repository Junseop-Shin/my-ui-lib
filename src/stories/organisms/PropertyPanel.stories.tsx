import type { Meta, StoryObj } from '@storybook/react';
import { PropertyPanel } from '@/components/organisms/PropertyPanel';
import { fn } from '@storybook/test';

const meta = {
    title: 'Organisms/PropertyPanel',
    component: PropertyPanel,
    parameters: {
        layout: 'fullscreen',
    },
    args: {
        onClose: fn(),
        onSave: fn(),
    },
    decorators: [
        (Story) => (
            <div className="h-screen w-full bg-slate-950 relative">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof PropertyPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        selectedNode: {
            id: '1',
            type: 'input',
            data: { label: 'Time Trigger' },
        },
    },
};

export const NoSelection: Story = {
    args: {
        selectedNode: null,
    },
};
