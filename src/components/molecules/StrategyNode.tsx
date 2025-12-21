import { Handle, Position, NodeProps } from '@xyflow/react';
import { Target, Clock, Zap, TrendingUp, TrendingDown } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Icon } from '@/components/atoms/Icon';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const icons: Record<string, any> = {
    input: Clock,
    condition: Target,
    action: Zap,
    buy: TrendingUp,
    sell: TrendingDown
};

export function StrategyNode({ data, type, selected }: NodeProps) {
    const IconComponent = icons[type || 'default'] || Zap;

    return (
        <div className={cn(
            "min-w-[150px] rounded-lg border bg-slate-900/90 backdrop-blur shadow-xl transition-all",
            selected ? "border-blue-500 ring-2 ring-blue-500/20" : "border-slate-700",
        )}>
            <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-950/50 p-2 text-xs font-semibold text-slate-300">
                <Icon icon={IconComponent} size={14} className={cn(
                    type === 'buy' ? 'text-emerald-400' :
                        type === 'sell' ? 'text-red-400' : 'text-blue-400'
                )} />
                <span className="uppercase">{type || 'Node'}</span>
            </div>

            <div className="p-3">
                <div className="text-sm font-medium text-white">{typeof data.label === 'string' ? data.label : 'Node'}</div>
                {typeof data.subLabel === 'string' && <div className="text-xs text-slate-500 mt-1">{data.subLabel}</div>}
            </div>
            <Handle type="target" position={Position.Top} className="!bg-slate-500 !w-3 !h-3 hover:!bg-blue-400 transition" />
            <Handle type="source" position={Position.Bottom} className="!bg-slate-500 !w-3 !h-3 hover:!bg-blue-400 transition" />
        </div>
    );
}
