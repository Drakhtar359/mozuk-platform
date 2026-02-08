'use client';

import { useEffect, useState } from 'react';

export default function DashboardPage() {
    const [user, setUser] = useState<{ email: string; name: string } | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await fetch('/api/session');
                const data = await response.json();

                if (data.authenticated) {
                    setUser(data.user);
                }
            } catch (error) {
                console.error('Session fetch error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSession();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-2">
                    Welcome back, {user?.name || 'User'}
                </h1>
                <p className="text-gray-400 mb-8">
                    Here's what's happening with your projects today.
                </p>

                {/* Dashboard Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Stats Card 1 */}
                    <div className="bg-[rgba(20,20,20,0.6)] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 backdrop-blur-xl">
                        <h3 className="text-gray-400 text-sm font-medium mb-2">Total Clients</h3>
                        <p className="text-3xl font-bold text-white">12</p>
                        <p className="text-[#14b8a6] text-sm mt-2">+2 this month</p>
                    </div>

                    {/* Stats Card 2 */}
                    <div className="bg-[rgba(20,20,20,0.6)] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 backdrop-blur-xl">
                        <h3 className="text-gray-400 text-sm font-medium mb-2">Active Projects</h3>
                        <p className="text-3xl font-bold text-white">8</p>
                        <p className="text-[#14b8a6] text-sm mt-2">3 in progress</p>
                    </div>

                    {/* Stats Card 3 */}
                    <div className="bg-[rgba(20,20,20,0.6)] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 backdrop-blur-xl">
                        <h3 className="text-gray-400 text-sm font-medium mb-2">Documents</h3>
                        <p className="text-3xl font-bold text-white">47</p>
                        <p className="text-[#14b8a6] text-sm mt-2">5 updated today</p>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="mt-8 bg-[rgba(20,20,20,0.6)] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 backdrop-blur-xl">
                    <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 text-gray-400">
                            <div className="w-2 h-2 bg-[#14b8a6] rounded-full"></div>
                            <p>New project created: <span className="text-white">Website Redesign</span></p>
                        </div>
                        <div className="flex items-center gap-4 text-gray-400">
                            <div className="w-2 h-2 bg-[#14b8a6] rounded-full"></div>
                            <p>Document uploaded: <span className="text-white">Q1 Report.pdf</span></p>
                        </div>
                        <div className="flex items-center gap-4 text-gray-400">
                            <div className="w-2 h-2 bg-[#14b8a6] rounded-full"></div>
                            <p>Client added: <span className="text-white">Acme Corp</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
