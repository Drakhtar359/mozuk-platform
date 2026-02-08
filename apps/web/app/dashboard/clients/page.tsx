'use client';

export default function ClientsPage() {
    const clients = [
        { id: 1, name: 'Acme Corporation', email: 'contact@acme.com', projects: 3, status: 'Active' },
        { id: 2, name: 'TechStart Inc', email: 'hello@techstart.io', projects: 2, status: 'Active' },
        { id: 3, name: 'Global Solutions', email: 'info@globalsolutions.com', projects: 1, status: 'Active' },
        { id: 4, name: 'Innovation Labs', email: 'team@innovationlabs.com', projects: 2, status: 'Inactive' },
    ];

    return (
        <div className="p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Clients</h1>
                        <p className="text-gray-400">Manage your client relationships</p>
                    </div>
                    <button className="px-6 py-3 bg-[#14b8a6] text-white rounded-lg hover:bg-[#0f9b8e] transition-colors font-medium">
                        Add Client
                    </button>
                </div>

                {/* Clients Table */}
                <div className="bg-[rgba(20,20,20,0.6)] border border-[rgba(255,255,255,0.08)] rounded-xl backdrop-blur-xl overflow-hidden">
                    <table className="w-full">
                        <thead className="border-b border-[rgba(255,255,255,0.08)]">
                            <tr>
                                <th className="text-left p-4 text-gray-400 font-medium">Name</th>
                                <th className="text-left p-4 text-gray-400 font-medium">Email</th>
                                <th className="text-left p-4 text-gray-400 font-medium">Projects</th>
                                <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map((client) => (
                                <tr key={client.id} className="border-b border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                                    <td className="p-4 text-white font-medium">{client.name}</td>
                                    <td className="p-4 text-gray-400">{client.email}</td>
                                    <td className="p-4 text-gray-400">{client.projects}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-sm ${client.status === 'Active'
                                                ? 'bg-[#14b8a6]/20 text-[#14b8a6]'
                                                : 'bg-gray-500/20 text-gray-400'
                                            }`}>
                                            {client.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
