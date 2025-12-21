import { Bell, User, Search } from 'lucide-react';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';

export interface HeaderProps {
    user?: {
        name: string;
        role?: string;
        avatarUrl?: string; // Optional: meant for future use if we add avatar image support
    };
    onSearch?: (query: string) => void;
    searchPlaceholder?: string;
    onNotificationClick?: () => void;
}

export function Header({
    user = { name: '게스트', role: 'Guest' },
    onSearch,
    searchPlaceholder = "검색...",
    onNotificationClick
}: HeaderProps) {
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center gap-x-4 border-b border-slate-800 bg-slate-950/80 backdrop-blur px-6 shadow-sm">
            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                <div className="relative flex flex-1 items-center">
                    <Icon icon={Search} className="absolute left-2 h-4 w-4 text-slate-500 z-10" />
                    <Input
                        type="text"
                        placeholder={searchPlaceholder}
                        className="w-64 pl-8 bg-slate-900 border-slate-800 text-white placeholder:text-slate-500"
                        onChange={(e) => onSearch?.(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="-m-2.5 p-2.5 text-slate-400 hover:text-white"
                        onClick={onNotificationClick}
                    >
                        <span className="sr-only">알림 보기</span>
                        <Icon icon={Bell} className="h-5 w-5" aria-hidden="true" />
                    </Button>

                    <div className="h-6 w-px bg-slate-800" aria-hidden="true" />

                    <div className="flex items-center gap-x-3">
                        <div className="flex flex-col items-end hidden md:flex">
                            <span className="text-sm font-semibold text-white">{user.name}</span>
                            <span className="text-xs text-slate-500">{user.role}</span>
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
