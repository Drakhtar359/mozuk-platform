import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import StatCard from '@/components/StatCard';

export default async function DashboardPage() {
    const session = await auth();

    if (!session) {
        redirect('/login');
    }

    const [totalClients, activeProjects, completedProjects, totalRevenue] = await Promise.all([
        prisma.client.count(),
        prisma.project.count({ where: { status: 'active' } }),
        prisma.project.count({ where: { status: 'completed' } }),
        prisma.project.aggregate({
            _sum: {
                budget: true,
            },
        }),
    ]);

    const recentClients = await prisma.client.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
            projects: true,
        },
    });

    return (
        <DashboardLayout>
            <div>
                <div style={{ marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '8px' }}>
                        Welcome back, {session.user?.name || 'User'}
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Here's what's happening with your business
                    </p>
                </div>

                <div className="grid grid-2" style={{ marginBottom: '48px' }}>
                    <StatCard
                        title="Total Clients"
                        value={totalClients}
                        icon="👥"
                        trend="+12%"
                        color="#6366f1"
                    />
                    <StatCard
                        title="Active Projects"
                        value={activeProjects}
                        icon="📊"
                        trend="+5%"
                        color="#10b981"
                    />
                    <StatCard
                        title="Completed Projects"
                        value={completedProjects}
                        icon="✅"
                        color="#8b5cf6"
                    />
                    <StatCard
                        title="Total Revenue"
                        value={totalRevenue._sum.budget || 0}
                        icon="💰"
                        trend="+23%"
                        color="#f59e0b"
                        prefix="$"
                    />
                </div>

                <div className="card">
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '24px' }}>
                        Recent Clients
                    </h2>
                    {recentClients.length === 0 ? (
                        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '40px 0' }}>
                            No clients yet. Create your first client to get started!
                        </p>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {recentClients.map((client) => (
                                <div
                                    key={client.id}
                                    style={{
                                        padding: '16px',
                                        background: 'var(--bg-tertiary)',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <div>
                                        <h3 style={{ fontSize: '1.125rem', fontWeight: 500, marginBottom: '4px' }}>
                                            {client.name}
                                        </h3>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                            {client.projects.length} project{client.projects.length !== 1 ? 's' : ''}
                                        </p>
                                    </div>
                                    <span className={`badge badge-${client.status}`}>
                                        {client.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
