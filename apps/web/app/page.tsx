'use client';


import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/LoginForm';

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkSession = async () => {
    try {
      const response = await fetch('/api/session');
      const data = await response.json();

      if (data.authenticated) {
        // Redirect to dashboard if already logged in
        router.push('/dashboard');
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

  if (isLoading) {
    return (
      <main className="flex-1 flex justify-center items-center pt-[65px]">
        <div className="text-white">Loading...</div>
      </main>
    );
  }

  return (
    <main className="flex-1 flex justify-center items-center pt-[65px]">
      <LoginForm />
    </main>
  );
}
