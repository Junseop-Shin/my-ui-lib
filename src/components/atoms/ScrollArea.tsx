import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function ScrollArea({ className, children }: { className?: string, children: React.ReactNode }) {
    return (
        <div className={cn("overflow-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900", className)}>
            {children}
        </div>
    );
}
