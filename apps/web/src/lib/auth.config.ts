import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            const isOnClients = nextUrl.pathname.startsWith('/clients');
            const isOnProjects = nextUrl.pathname.startsWith('/projects');
            const isLoginPage = nextUrl.pathname === '/login';

            // Protect dashboard and other private routes
            if (isOnDashboard || isOnClients || isOnProjects) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn && isLoginPage) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }

            return true;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.sub as string;
            }
            return session;
        },
    },
    providers: [], // Configured in auth.ts
    session: {
        strategy: 'jwt',
    },
} satisfies NextAuthConfig;
