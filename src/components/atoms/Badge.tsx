import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function Badge({ children, variant = 'default' }: { children: React.ReactNode, variant?: 'default' | 'success' | 'destructive' | 'outline' }) {
    const variants = {
        default: "bg-blue-900/20 text-blue-400 border-blue-900/50",
        success: "bg-emerald-900/20 text-emerald-400 border-emerald-900/50",
        destructive: "bg-red-900/20 text-red-400 border-red-900/50",
        outline: "text-slate-400 border-slate-800"
    };

    return (
        <span className={cn("inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", variants[variant])}>
            {children}
        </span>
    );
}
