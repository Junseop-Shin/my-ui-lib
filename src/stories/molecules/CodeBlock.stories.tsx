import type { Meta, StoryObj } from '@storybook/react';
import { CodeBlock } from '@/components/molecules/CodeBlock';

const meta = {
    title: 'Molecules/CodeBlock',
    component: CodeBlock,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <div className="bg-slate-950 p-8 w-[600px]">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof CodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: `[INFO] Strategy initialized
[INFO] Connecting to exchange...
[SUCCESS] Connected to Binance
[INFO] Subscribing to BTC/USDT ticker...
[WARN] Connection unstable, retrying...
[SUCCESS] Resubscribed
[INFO] Strategy running...`,
    },
};
