import type { Meta, StoryObj } from '@storybook/react';
import { NodePalette } from '@/components/organisms/NodePalette';

const meta = {
    title: 'Organisms/NodePalette',
    component: NodePalette,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <div className="bg-slate-950 p-8 h-[600px] flex">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof NodePalette>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
