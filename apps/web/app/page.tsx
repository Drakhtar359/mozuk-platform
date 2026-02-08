'use client';


import { useEffect, useState } from 'react';
import LoginForm from '@/components/LoginForm';

export default function Home() {
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkSession = async () => {
    try {
      const response = await fetch('/api/session');
      const data = await response.json();

      if (data.authenticated) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Session check error:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (isLoading) {
    return (
      <main className="flex-1 flex justify-center items-center pt-[65px]">
        <div className="text-white">Loading...</div>
      </main>
    );
  }

  return (
    <main className="flex-1 flex justify-center items-center pt-[65px]">
      {user ? (
        <div className="bg-[rgba(20,20,20,0.6)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-12 w-full max-w-[600px] text-center backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <h2 className="text-2xl font-bold mb-4">Welcome, {user.name}</h2>
          <p className="mb-6 text-gray-400">You have successfully authenticated.</p>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <LoginForm onLoginSuccess={checkSession} />
      )}
    </main>
  );
}
