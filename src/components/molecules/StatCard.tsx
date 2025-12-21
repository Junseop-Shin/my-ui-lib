import { ArrowUpRight, ArrowDownRight, type LucideIcon } from 'lucide-react';

import { Card } from '@/components/atoms/Card';
import { Icon } from '@/components/atoms/Icon';

interface StatCardProps {
    title: string;
    value: string;
    trend?: string;
    trendUp?: boolean;
    icon?: LucideIcon;
}

export function StatCard({ title, value, trend, trendUp, icon: IconComponent }: StatCardProps) {
    return (
        <Card className="p-6 border-slate-800 bg-slate-900/50 backdrop-blur">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-400">{title}</p>
                {IconComponent && <Icon icon={IconComponent} className="h-4 w-4 text-slate-500" />}
            </div>
            <div className="mt-2 flex items-baseline gap-x-2">
                <span className="text-2xl font-semibold tracking-tight text-white">{value}</span>
                {trend && (
                    <span className={`flex items-baseline text-xs font-semibold ${trendUp ? 'text-emerald-400' : 'text-red-400'}`}>
                        {trendUp ? <Icon icon={ArrowUpRight} className="h-3 w-3 mr-0.5" /> : <Icon icon={ArrowDownRight} className="h-3 w-3 mr-0.5" />}
                        {trend}
                    </span>
                )}
            </div>
        </Card>
    );
}
