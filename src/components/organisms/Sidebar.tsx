import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, TrendingUp, Layers, Settings, LogOut, Activity } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Strategy Builder', icon: Layers, href: '/strategies/builder' },
    { name: 'My Strategies', icon: TrendingUp, href: '/strategies' },
    { name: 'System Status', icon: Activity, href: '/status' },
    { name: 'Settings', icon: Settings, href: '/settings' },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-800 bg-slate-950 text-slate-300">
            <div className="flex h-16 items-center px-6 border-b border-slate-800">
                <Icon icon={TrendingUp} className="h-6 w-6 text-blue-500 mr-2" />
                <span className="text-lg font-bold text-white tracking-tight">KIS Trader</span>
            </div>
            <div className="flex flex-col h-[calc(100vh-4rem)] justify-between py-4">
                <nav className="space-y-1 px-3">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-blue-600/10 text-blue-400"
                                        : "hover:bg-slate-900 text-slate-400 hover:text-white"
                                )}
                            >
                                <Icon icon={item.icon} className={cn("mr-3 h-5 w-5", isActive ? "text-blue-500" : "text-slate-500")} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
                <div className="px-3 border-t border-slate-800 pt-4">
                    <Button
                        variant="ghost"
                        onClick={() => window.location.href = '/login'}
                        className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                        <Icon icon={LogOut} className="mr-3 h-5 w-5" />
                        Sign Out
                    </Button>
                </div>
            </div>
        </aside>
    );
}
