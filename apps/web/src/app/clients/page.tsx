'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import Link from 'next/link';

interface Client {
    id: string;
    name: string;
    email?: string;
    company?: string;
    phone?: string;
    notes?: string;
    status: string;
    projects: any[];
    createdAt: string;
}

export default function ClientsPage() {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        phone: '',
        notes: '',
        status: 'active',
    });

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const res = await fetch('/api/clients');
            const data = await res.json();
            setClients(data);
        } catch (error) {
            console.error('Failed to fetch clients:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/clients', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setShowModal(false);
                setFormData({ name: '', email: '', company: '', phone: '', notes: '', status: 'active' });
                fetchClients();
            }
        } catch (error) {
            console.error('Failed to create client:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this client?')) {
            try {
                await fetch(`/api/clients/${id}`, { method: 'DELETE' });
                fetchClients();
            } catch (error) {
                console.error('Failed to delete client:', error);
            }
        }
    };

    return (
        <DashboardLayout>
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '8px' }}>Clients</h1>
                        <p style={{ color: 'var(--text-secondary)' }}>Manage your client relationships</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                        + Add Client
                    </button>
                </div>

                {loading ? (
                    <div className="card loading" style={{ height: '200px' }}></div>
                ) : clients.length === 0 ? (
                    <div className="card" style={{ textAlign: 'center', padding: '60px 24px' }}>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                            No clients yet. Add your first client to get started!
                        </p>
                        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                            + Add First Client
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-2">
                        {clients.map((client) => (
                            <div key={client.id} className="card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{client.name}</h3>
                                    <span className={`badge badge-${client.status}`}>{client.status}</span>
                                </div>
                                {client.company && (
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>
                                        🏢 {client.company}
                                    </p>
                                )}
                                {client.email && (
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>
                                        ✉️ {client.email}
                                    </p>
                                )}
                                {client.phone && (
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>
                                        📞 {client.phone}
                                    </p>
                                )}
                                <div className="divider"></div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
                                        {client.projects.length} project{client.projects.length !== 1 ? 's' : ''}
                                    </p>
                                    <button
                                        className="btn btn-danger"
                                        style={{ padding: '8px 16px', fontSize: '0.9rem' }}
                                        onClick={() => handleDelete(client.id)}
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
                        <div className="card" style={{ width: '100%', maxWidth: '500px', margin: '24px' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '24px' }}>Add New Client</h2>
                            <form onSubmit={handleSubmit}>
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Client name"
                                    />
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Email</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="client@example.com"
                                    />
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Company</label>
                                    <input
                                        type="text"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        placeholder="Company name"
                                    />
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Phone</label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="+1 (555) 123-4567"
                                    />
                                </div>
                                <div style={{ marginBottom: '24px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Notes</label>
                                    <textarea
                                        rows={3}
                                        value={formData.notes}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                        placeholder="Additional notes..."
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
                                        Create Client
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
