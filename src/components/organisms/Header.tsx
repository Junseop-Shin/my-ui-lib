import { useEffect, useState } from 'react';
import { Bell, User, Search } from 'lucide-react';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';

export function Header() {
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        // Basic browser check
        if (typeof window !== 'undefined') {
            setRole(localStorage.getItem('userRole'));
        }
    }, []);

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center gap-x-4 border-b border-slate-800 bg-slate-950/80 backdrop-blur px-6 shadow-sm">
            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                <div className="relative flex flex-1 items-center">
                    <Icon icon={Search} className="absolute left-2 h-4 w-4 text-slate-500 z-10" />
                    <Input
                        type="text"
                        placeholder="Search markets or strategies..."
                        className="w-64 pl-8 bg-slate-900 border-slate-800 text-white placeholder:text-slate-500"
                    />
                </div>
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                    <Button variant="ghost" size="icon" className="-m-2.5 p-2.5 text-slate-400 hover:text-white">
                        <span className="sr-only">View notifications</span>
                        <Icon icon={Bell} className="h-5 w-5" aria-hidden="true" />
                    </Button>

                    <div className="h-6 w-px bg-slate-800" aria-hidden="true" />

                    <div className="flex items-center gap-x-3">
                        <div className="flex flex-col items-end hidden md:flex">
                            <span className="text-sm font-semibold text-white">Dev User</span>
                            <span className="text-xs text-slate-500">{role || 'Guest'}</span>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                            <Icon icon={User} className="h-4 w-4 text-slate-400" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
