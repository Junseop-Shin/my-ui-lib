import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/atoms/Tooltip';
import { Button } from '@/components/atoms/Button';
import { Info } from 'lucide-react';

const meta = {
    title: 'Atoms/Tooltip',
    component: Tooltip,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <div className="p-12 text-center">
                <TooltipProvider>
                    <Story />
                </TooltipProvider>
            </div>
        ),
    ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>Add to library</p>
            </TooltipContent>
        </Tooltip>
    ),
};

export const WithIcon: Story = {
    render: () => (
        <Tooltip>
            <TooltipTrigger asChild>
                <button className="text-slate-400 hover:text-white transition-colors">
                    <Info size={16} />
                </button>
            </TooltipTrigger>
            <TooltipContent side="right">
                <p>Additional information</p>
            </TooltipContent>
        </Tooltip>
    ),
};
