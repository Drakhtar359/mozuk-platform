export default function Home() {
  return (
    <main className="flex-1 flex justify-center items-center pt-[65px]">
      <div className="bg-[rgba(20,20,20,0.6)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-12 w-full max-w-[400px] text-center backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        <h2 className="mt-0 mb-8 tracking-tighter text-2xl font-bold">Platform Access</h2>
        <form>
          <input
            type="email"
            name="email"
            className="w-full p-3 mb-4 bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded-md text-white text-[0.95rem] box-border focus:outline-none focus:border-[var(--brand-color)]"
            placeholder="Identity"
            required
          />
          <input
            type="password"
            name="password"
            className="w-full p-3 mb-4 bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded-md text-white text-[0.95rem] box-border focus:outline-none focus:border-[var(--brand-color)]"
            placeholder="Passkey"
            required
            minLength={6}
          />
          <button
            type="submit"
            className="w-full p-3 bg-[var(--brand-color)] text-black font-semibold border-none rounded-md cursor-pointer text-[0.95rem] transition-opacity duration-200 hover:opacity-90 disabled:opacity-50"
          >
            Initialize Protocol
          </button>
        </form>
      </div>
    </main>
  );
}
