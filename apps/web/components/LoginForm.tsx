'use client';

import { useState } from 'react';
import { authenticate } from '@/lib/actions';

export default function LoginForm() {
    const [isPending, setIsPending] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPending(true);
        setErrorMessage(undefined);

        const formData = new FormData(e.currentTarget);

        try {
            const result = await authenticate(undefined, formData);
            if (result) {
                setErrorMessage(result);
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage('An error occurred during login.');
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="bg-[rgba(20,20,20,0.6)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-12 w-full max-w-[400px] text-center backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <h2 className="mt-0 mb-8 tracking-tighter text-2xl font-bold">Platform Access</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    className="w-full p-3 mb-4 bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded-md text-white text-[0.95rem] box-border focus:outline-none focus:border-[var(--brand-color)]"
                    placeholder="Identity"
                    required
                    disabled={isPending}
                />
                <input
                    type="password"
                    name="password"
                    className="w-full p-3 mb-4 bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded-md text-white text-[0.95rem] box-border focus:outline-none focus:border-[var(--brand-color)]"
                    placeholder="Passkey"
                    required
                    minLength={6}
                    disabled={isPending}
                />
                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full p-3 bg-[var(--brand-color)] text-black font-semibold border-none rounded-md cursor-pointer text-[0.95rem] transition-opacity duration-200 hover:opacity-90 disabled:opacity-50"
                >
                    {isPending ? 'Connecting...' : 'Initialize Protocol'}
                </button>
                <div
                    className="flex h-8 items-end space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {errorMessage && (
                        <p className="text-sm text-red-500 w-full">{errorMessage}</p>
                    )}
                </div>
            </form>
        </div>
    );
}
