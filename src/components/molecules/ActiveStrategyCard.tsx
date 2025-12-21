import { PlayCircle, StopCircle } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { Card } from '@/components/atoms/Card';
import { Icon } from '@/components/atoms/Icon';

interface ActiveStrategyCardProps {
    name: string;
    roi: string;
    status: 'running' | 'stopped';
    onToggle: () => void;
}

export function ActiveStrategyCard({ name, roi, status, onToggle }: ActiveStrategyCardProps) {
    const isRunning = status === 'running';

    return (
        <Card className="flex items-center justify-between p-4 mb-2 hover:bg-slate-900/80 transition-colors border-slate-800 bg-slate-900/50">
            <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-emerald-500 animate-pulse' : 'bg-slate-600'}`} />
                <div>
                    <h4 className="text-sm font-medium text-white">{name}</h4>
                    <p className={`text-xs ${parseFloat(roi) >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        ROI: {roi}%
                    </p>
                </div>
            </div>

            <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                className={`transition-colors ${isRunning ? 'text-red-400 hover:bg-red-400/10 hover:text-red-300' : 'text-emerald-400 hover:bg-emerald-400/10 hover:text-emerald-300'}`}
            >
                {isRunning ? <Icon icon={StopCircle} size={20} /> : <Icon icon={PlayCircle} size={20} />}
            </Button>
        </Card>
    );
}
