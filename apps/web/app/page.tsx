import { auth, signOut } from '@/auth';
import LoginForm from '@/components/LoginForm';

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex-1 flex justify-center items-center pt-[65px]">
      {session?.user ? (
        <div className="bg-[rgba(20,20,20,0.6)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-12 w-full max-w-[600px] text-center backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <h2 className="text-2xl font-bold mb-4">Welcome, {session.user.name || session.user.email}</h2>
          <p className="mb-6 text-gray-400">You have successfully authenticated.</p>
          <form
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <button className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
              Sign Out
            </button>
          </form>
        </div>
      ) : (
        <LoginForm />
      )}
    </main>
  );
}
