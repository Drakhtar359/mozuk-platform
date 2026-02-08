import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-[65px] bg-[var(--nav-bg)] backdrop-blur-xl border-b border-[var(--nav-border)] flex items-center justify-between px-[5%] z-50">
      <Link href="#" className="text-2xl font-bold tracking-tighter text-white no-underline">
        MOZ<span className="text-[var(--brand-color)]">U</span>K
      </Link>
      <nav>
        <Link href="#" className="text-[#a0a0a0] no-underline ml-8 text-[0.95rem] transition-colors duration-200 hover:text-white">
          Services
        </Link>
        <Link href="#" className="text-[#a0a0a0] no-underline ml-8 text-[0.95rem] transition-colors duration-200 hover:text-white">
          Contact
        </Link>
      </nav>
    </header>
  );
}
