'use client';

export default function ProjectsPage() {
    const projects = [
        { id: 1, name: 'Website Redesign', client: 'Acme Corporation', status: 'In Progress', progress: 65 },
        { id: 2, name: 'Mobile App Development', client: 'TechStart Inc', status: 'In Progress', progress: 40 },
        { id: 3, name: 'Brand Identity', client: 'Global Solutions', status: 'Planning', progress: 15 },
        { id: 4, name: 'E-commerce Platform', client: 'Acme Corporation', status: 'Completed', progress: 100 },
        { id: 5, name: 'Marketing Campaign', client: 'Innovation Labs', status: 'On Hold', progress: 30 },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'In Progress':
                return 'bg-blue-500/20 text-blue-400';
            case 'Planning':
                return 'bg-yellow-500/20 text-yellow-400';
            case 'Completed':
                return 'bg-[#14b8a6]/20 text-[#14b8a6]';
            case 'On Hold':
                return 'bg-gray-500/20 text-gray-400';
            default:
                return 'bg-gray-500/20 text-gray-400';
        }
    };

    return (
        <div className="p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Projects</h1>
                        <p className="text-gray-400">Track and manage your projects</p>
                    </div>
                    <button className="px-6 py-3 bg-[#14b8a6] text-white rounded-lg hover:bg-[#0f9b8e] transition-colors font-medium">
                        New Project
                    </button>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-[rgba(20,20,20,0.6)] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 backdrop-blur-xl hover:border-[rgba(20,184,166,0.3)] transition-all cursor-pointer"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">{project.name}</h3>
                                    <p className="text-gray-400 text-sm">{project.client}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(project.status)}`}>
                                    {project.status}
                                </span>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-2">
                                <div className="flex items-center justify-between text-sm mb-2">
                                    <span className="text-gray-400">Progress</span>
                                    <span className="text-white font-medium">{project.progress}%</span>
                                </div>
                                <div className="w-full bg-[rgba(255,255,255,0.05)] rounded-full h-2">
                                    <div
                                        className="bg-[#14b8a6] h-2 rounded-full transition-all"
                                        style={{ width: `${project.progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
