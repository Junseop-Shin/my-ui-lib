import type { Meta, StoryObj } from '@storybook/react';
import { StrategyNode } from '@/components/molecules/StrategyNode';
import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const nodeTypes = {
    strategy: StrategyNode,
};

const meta = {
    title: 'Molecules/StrategyNode',
    component: StrategyNode,
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        (StoryComponent) => (
            <div className="h-[500px] w-full bg-slate-950">
                <ReactFlow
                    nodeTypes={nodeTypes}
                    defaultNodes={[
                        {
                            id: '1',
                            type: 'strategy',
                            position: { x: 100, y: 100 },
                            data: { label: 'Time Trigger', subLabel: 'Every 1m', type: 'input' },
                        },
                        {
                            id: '2',
                            type: 'strategy',
                            position: { x: 300, y: 100 },
                            data: { label: 'RSI Condition', subLabel: 'RSI < 30', type: 'condition' },
                        },
                        {
                            id: '3',
                            type: 'strategy',
                            position: { x: 100, y: 250 },
                            data: { label: 'Buy BTC', subLabel: 'Limit Order', type: 'buy' },
                            selected: true,
                        },
                        {
                            id: '4',
                            type: 'strategy',
                            position: { x: 300, y: 250 },
                            data: { label: 'Sell ETH', subLabel: 'Market Order', type: 'sell' },
                        },
                    ]}
                    fitView
                >
                    <Background color="#334155" gap={16} />
                    <Controls />
                    <div style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}>
                        <StoryComponent />
                    </div>
                </ReactFlow>
            </div>
        ),
    ],
} satisfies Meta<typeof StrategyNode>;

export default meta;
type Story = StoryObj<typeof meta>;

// The component is rendered inside ReactFlow in the decorator
export const Default: Story = {
    args: {
        id: 'demo',
        data: { label: 'Demo Node', type: 'action' },
        type: 'strategy',
        selected: false,
        positionAbsoluteX: 0,
        positionAbsoluteY: 0,
        zIndex: 0,
        isConnectable: true,
        dragging: false,
        dragHandle: undefined,
        width: 150,
        height: 100,
        sourcePosition: undefined,
        targetPosition: undefined,
        selectable: true,
        draggable: true,
        deletable: true,
    },
};
