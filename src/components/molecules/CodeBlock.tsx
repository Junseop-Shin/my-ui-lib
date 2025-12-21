import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

import { Check, Copy } from 'lucide-react';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';

export function CodeBlock({ className, children }: { className?: string, children: React.ReactNode }) {
    const { isCopied, copyToClipboard } = useCopyToClipboard();
    const textToCopy = typeof children === 'string' ? children : '';

    return (
        <div className="relative group">
            <pre className={cn("font-mono text-xs text-emerald-400 bg-black/50 p-4 rounded-md overflow-x-auto", className)}>
                <code>{children}</code>
            </pre>
            {textToCopy && (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(textToCopy)}
                    className="absolute top-2 right-2 h-8 w-8 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-white hover:bg-slate-800"
                    title="Copy code"
                >
                    {isCopied ? <Icon icon={Check} size={14} className="text-emerald-500" /> : <Icon icon={Copy} size={14} />}
                </Button>
            )}
        </div>
    );
}
