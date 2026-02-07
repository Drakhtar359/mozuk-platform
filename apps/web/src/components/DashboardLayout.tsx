'use client';

import { ReactNode } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './DashboardLayout.module.css';

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <div className={styles.logo}>
                    <h1>MOZUK</h1>
                    <span>Platform</span>
                </div>

                <nav className={styles.nav}>
                    <Link
                        href="/dashboard"
                        className={`${styles.navItem} ${isActive('/dashboard') ? styles.active : ''}`}
                    >
                        <span className={styles.icon}>📊</span>
                        Dashboard
                    </Link>
                    <Link
                        href="/clients"
                        className={`${styles.navItem} ${isActive('/clients') ? styles.active : ''}`}
                    >
                        <span className={styles.icon}>👥</span>
                        Clients
                    </Link>
                    <Link
                        href="/projects"
                        className={`${styles.navItem} ${isActive('/projects') ? styles.active : ''}`}
                    >
                        <span className={styles.icon}>📁</span>
                        Projects
                    </Link>
                </nav>

                <button
                    onClick={() => signOut({ callbackUrl: '/login' })}
                    className={styles.logoutBtn}
                >
                    <span className={styles.icon}>🚪</span>
                    Sign Out
                </button>
            </aside>

            <main className={styles.main}>
                <div className={styles.content}>{children}</div>
            </main>
        </div>
    );
}
