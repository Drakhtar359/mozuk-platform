'use client';

import { FileText, Download } from 'lucide-react';

export default function DocumentsPage() {
    const documents = [
        { id: 1, name: 'Q1 Financial Report.pdf', size: '2.4 MB', date: '2026-02-05', category: 'Reports' },
        { id: 2, name: 'Project Proposal.docx', size: '856 KB', date: '2026-02-03', category: 'Proposals' },
        { id: 3, name: 'Brand Guidelines.pdf', size: '5.1 MB', date: '2026-01-28', category: 'Design' },
        { id: 4, name: 'Contract Agreement.pdf', size: '1.2 MB', date: '2026-01-25', category: 'Legal' },
        { id: 5, name: 'Meeting Notes.txt', size: '45 KB', date: '2026-01-20', category: 'Notes' },
        { id: 6, name: 'Marketing Strategy.pptx', size: '3.8 MB', date: '2026-01-15', category: 'Marketing' },
    ];

    return (
        <div className="p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Documents</h1>
                        <p className="text-gray-400">Access and manage your files</p>
                    </div>
                    <button className="px-6 py-3 bg-[#14b8a6] text-white rounded-lg hover:bg-[#0f9b8e] transition-colors font-medium">
                        Upload Document
                    </button>
                </div>

                {/* Documents List */}
                <div className="bg-[rgba(20,20,20,0.6)] border border-[rgba(255,255,255,0.08)] rounded-xl backdrop-blur-xl overflow-hidden">
                    <div className="divide-y divide-[rgba(255,255,255,0.08)]">
                        {documents.map((doc) => (
                            <div
                                key={doc.id}
                                className="p-4 hover:bg-[rgba(255,255,255,0.02)] transition-colors flex items-center justify-between"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-[#14b8a6]/20 rounded-lg flex items-center justify-center">
                                        <FileText size={20} className="text-[#14b8a6]" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-medium">{doc.name}</h3>
                                        <p className="text-gray-400 text-sm">
                                            {doc.size} • {doc.date} • {doc.category}
                                        </p>
                                    </div>
                                </div>
                                <button className="p-2 hover:bg-[rgba(255,255,255,0.05)] rounded-lg transition-colors">
                                    <Download size={20} className="text-gray-400 hover:text-white" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
