'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

interface Project {
    id: string;
    name: string;
    description?: string;
    status: string;
    startDate?: string;
    endDate?: string;
    budget?: number;
    client: {
        id: string;
        name: string;
    };
    createdAt: string;
}

interface Client {
    id: string;
    name: string;
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        clientId: '',
        status: 'active',
        startDate: '',
        endDate: '',
        budget: '',
    });

    useEffect(() => {
        fetchProjects();
        fetchClients();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch('/api/projects');
            const data = await res.json();
            setProjects(data);
        } catch (error) {
            console.error('Failed to fetch projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchClients = async () => {
        try {
            const res = await fetch('/api/clients');
            const data = await res.json();
            setClients(data);
        } catch (error) {
            console.error('Failed to fetch clients:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setShowModal(false);
                setFormData({ name: '', description: '', clientId: '', status: 'active', startDate: '', endDate: '', budget: '' });
                fetchProjects();
            }
        } catch (error) {
            console.error('Failed to create project:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this project?')) {
            try {
                await fetch(`/api/projects/${id}`, { method: 'DELETE' });
                fetchProjects();
            } catch (error) {
                console.error('Failed to delete project:', error);
            }
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'badge-active';
            case 'completed': return 'badge-completed';
            case 'on-hold': return 'badge-on-hold';
            default: return 'badge-inactive';
        }
    };

    return (
        <DashboardLayout>
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '8px' }}>Projects</h1>
                        <p style={{ color: 'var(--text-secondary)' }}>Track and manage all your projects</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                        + Add Project
                    </button>
                </div>

                {loading ? (
                    <div className="card loading" style={{ height: '200px' }}></div>
                ) : projects.length === 0 ? (
                    <div className="card" style={{ textAlign: 'center', padding: '60px 24px' }}>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                            No projects yet. Create your first project!
                        </p>
                        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                            + Add First Project
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-2">
                        {projects.map((project) => (
                            <div key={project.id} className="card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{project.name}</h3>
                                    <span className={`badge ${getStatusColor(project.status)}`}>{project.status}</span>
                                </div>
                                {project.description && (
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: '12px', fontSize: '0.95rem' }}>
                                        {project.description}
                                    </p>
                                )}
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '0.9rem' }}>
                                    👤 Client: <strong>{project.client.name}</strong>
                                </p>
                                {project.budget && (
                                    <p style={{ color: 'var(--mozuk-primary-light)', marginBottom: '8px', fontSize: '0.9rem' }}>
                                        💰 Budget: <strong>${project.budget.toLocaleString()}</strong>
                                    </p>
                                )}
                                <div className="divider"></div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
                                        {project.startDate && new Date(project.startDate).toLocaleDateString()}
                                    </p>
                                    <button
                                        className="btn btn-danger"
                                        style={{ padding: '8px 16px', fontSize: '0.9rem' }}
                                        onClick={() => handleDelete(project.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {showModal && (
                    <div style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0, 0, 0, 0.7)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 100,
                    }}>
                        <div className="card" style={{ width: '100%', maxWidth: '500px', margin: '24px', maxHeight: '90vh', overflowY: 'auto' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '24px' }}>Add New Project</h2>
                            <form onSubmit={handleSubmit}>
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Project Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Project name"
                                    />
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Client *</label>
                                    <select
                                        required
                                        value={formData.clientId}
                                        onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                                    >
                                        <option value="">Select a client</option>
                                        {clients.map((client) => (
                                            <option key={client.id} value={client.id}>{client.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Description</label>
                                    <textarea
                                        rows={3}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Project description..."
                                    />
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    >
                                        <option value="active">Active</option>
                                        <option value="completed">Completed</option>
                                        <option value="on-hold">On Hold</option>
                                    </select>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Start Date</label>
                                        <input
                                            type="date"
                                            value={formData.startDate}
                                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>End Date</label>
                                        <input
                                            type="date"
                                            value={formData.endDate}
                                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div style={{ marginBottom: '24px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Budget ($)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={formData.budget}
                                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                        placeholder="10000"
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Create Project
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
