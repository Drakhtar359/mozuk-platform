'use client';

import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Users, FolderKanban, FileText, LogOut } from 'lucide-react';

const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Clients', href: '/dashboard/clients', icon: Users },
    { name: 'Projects', href: '/dashboard/projects', icon: FolderKanban },
    { name: 'Documents', href: '/dashboard/documents', icon: FileText },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await fetch('/api/logout', { method: 'POST' });
            router.push('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <div className="flex h-screen bg-[#0a0a0a]">
            {/* Sidebar */}
            <aside className="w-64 bg-[rgba(20,20,20,0.6)] border-r border-[rgba(255,255,255,0.08)] backdrop-blur-xl flex flex-col">
                {/* Logo */}
                <div className="p-6 border-b border-[rgba(255,255,255,0.08)]">
                    <h1 className="text-2xl font-bold text-white">
                        MOZ<span className="text-[#14b8a6]">UK</span>
                    </h1>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <a
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                        ? 'bg-[#14b8a6] text-white'
                                        : 'text-gray-400 hover:bg-[rgba(255,255,255,0.05)] hover:text-white'
                                    }`}
                            >
                                <Icon size={20} />
                                <span className="font-medium">{item.name}</span>
                            </a>
                        );
                    })}
                </nav>

                {/* Sign Out */}
                <div className="p-4 border-t border-[rgba(255,255,255,0.08)]">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-[rgba(255,255,255,0.05)] hover:text-white transition-all w-full"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
}
