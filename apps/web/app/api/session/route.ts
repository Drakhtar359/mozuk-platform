import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');

    if (session?.value) {
        // Decode the session token to get user info
        try {
            const decoded = Buffer.from(session.value, 'base64').toString();
            const [email] = decoded.split(':');

            return NextResponse.json({
                authenticated: true,
                user: { email, name: 'Admin User' }
            });
        } catch (error) {
            console.error('Session decode error:', error);
            return NextResponse.json({ authenticated: false });
        }
    }

    return NextResponse.json({ authenticated: false });
}
