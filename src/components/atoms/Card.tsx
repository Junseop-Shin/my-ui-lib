import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function Card({ className, children }: { className?: string, children: React.ReactNode }) {
    return (
        <div className={cn("rounded-lg border border-slate-800 bg-slate-900/50 text-slate-200 shadow-sm", className)}>
            {children}
        </div>
    );
}
