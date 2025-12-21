import type { Meta, StoryObj } from '@storybook/react';
import { ScrollArea } from '@/components/atoms/ScrollArea';

const meta = {
    title: 'Atoms/ScrollArea',
    component: ScrollArea,
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
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        className: 'h-[200px] w-[350px] rounded-md border border-slate-800 p-4',
        children: (
            <div className="space-y-4">
                <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
                {Array.from({ length: 50 }).map((_, i, a) => (
                    <div key={i} className="text-sm">
                        Tag {a.length - i}
                    </div>
                ))}
            </div>
        ),
    },
};
