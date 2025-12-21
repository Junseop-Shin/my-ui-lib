import { X, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Icon } from '@/components/atoms/Icon';

interface PropertyPanelProps {
    selectedNode: any | null;
    onClose: () => void;
    onSave: (nodeId: string, data: any) => void;
}

export function PropertyPanel({ selectedNode, onClose, onSave }: PropertyPanelProps) {
    const [label, setLabel] = useState('');

    useEffect(() => {
        if (selectedNode) {
            setLabel(selectedNode.data.label || '');
        }
    }, [selectedNode]);

    if (!selectedNode) return null;

    return (
        <div className="w-80 border-l border-slate-800 bg-slate-900/90 backdrop-blur p-4 flex flex-col h-full absolute right-0 top-0 z-10 transition-transform shadow-2xl">
            <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
                <h3 className="text-sm font-medium text-white">Properties</h3>
                <Button variant="ghost" size="icon" onClick={onClose} className="text-slate-400 hover:text-white">
                    <Icon icon={X} size={16} />
                </Button>
            </div>
            <div className="space-y-4 flex-1">
                <div>
                    <label className="text-xs font-medium text-slate-400 block mb-1.5">Label</label>
                    <Input
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 text-white"
                    />
                </div>

                {/* Placeholder for dynamic fields based on node type */}
                <div className="p-3 rounded bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300">
                    config params for <strong>{selectedNode.type}</strong>
                </div>
            </div>
            <div className="pt-4 border-t border-slate-800">
                <Button
                    onClick={() => onSave(selectedNode.id, { ...selectedNode.data, label })}
                    className="w-full gap-2"
                >
                    <Icon icon={Save} size={14} />
                    Apply Changes
                </Button>
            </div>
        </div>
    );
}
