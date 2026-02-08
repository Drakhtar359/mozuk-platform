import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Check if the request is for a dashboard route
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        // Check for session cookie
        const sessionCookie = request.cookies.get('session');

        if (!sessionCookie) {
            // Redirect to login if no session
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/dashboard/:path*',
};
