import { GripVertical } from 'lucide-react';
import React from 'react';
import { Icon } from '@/components/atoms/Icon';

export interface NodeType {
    type: string;
    label: string;
    description: string;
}

export interface NodePaletteProps {
    nodeTypes: NodeType[];
    title?: string;
    description?: string;
}

export function NodePalette({
    nodeTypes,
    title = "노드 라이브러리",
    description = "노드를 캔버스로 드래그하세요"
}: NodePaletteProps) {
    const onDragStart = (event: React.DragEvent, nodeType: string, nodeLabel: string) => {
        event.dataTransfer.setData('application/reactflow/type', nodeType);
        event.dataTransfer.setData('application/reactflow/label', nodeLabel);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div className="w-64 border-r border-slate-800 bg-slate-900/50 p-4 flex flex-col gap-4">
            <div>
                <h3 className="text-sm font-medium text-slate-300 mb-1">{title}</h3>
                <p className="text-xs text-slate-500">{description}</p>
            </div>

            <div className="space-y-3">
                {nodeTypes.map((node) => (
                    <div
                        key={node.label}
                        className="flex items-center gap-3 p-3 rounded-lg border border-slate-700 bg-slate-800 cursor-grab hover:border-blue-500 hover:bg-slate-700 transition active:cursor-grabbing"
                        onDragStart={(event) => onDragStart(event, node.type, node.label)}
                        draggable
                    >
                        <div className="mt-1 text-slate-400">
                            <Icon icon={GripVertical} size={16} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-200">{node.label}</p>
                            <p className="text-xs text-slate-500">{node.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
