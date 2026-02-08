'use client';

import { useState } from 'react';

export default function LoginForm({ onLoginSuccess }: { onLoginSuccess: () => void }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.success) {
                onLoginSuccess();
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-[rgba(20,20,20,0.6)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-12 w-full max-w-[400px] text-center backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <h2 className="mt-0 mb-8 tracking-tighter text-2xl font-bold">Platform Access</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 mb-4 bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded-md text-white text-[0.95rem] box-border focus:outline-none focus:border-[var(--brand-color)]"
                    placeholder="Identity"
                    required
                    disabled={isLoading}
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 mb-4 bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded-md text-white text-[0.95rem] box-border focus:outline-none focus:border-[var(--brand-color)]"
                    placeholder="Passkey"
                    required
                    minLength={6}
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full p-3 bg-[var(--brand-color)] text-black font-semibold border-none rounded-md cursor-pointer text-[0.95rem] transition-opacity duration-200 hover:opacity-90 disabled:opacity-50"
                >
                    {isLoading ? 'Connecting...' : 'Initialize Protocol'}
                </button>
                {error && (
                    <p className="text-sm text-red-500 mt-4">{error}</p>
                )}
            </form>
        </div>
    );
}
