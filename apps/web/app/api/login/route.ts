import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const VALID_CREDENTIALS = {
    email: 'admin@mozuk.net',
    password: 'password123'
};

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Validate credentials
        if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
            // Create a simple session token
            const sessionToken = Buffer.from(`${email}:${Date.now()}`).toString('base64');

            // Set HTTP-only cookie
            (await cookies()).set('session', sessionToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7, // 7 days
                path: '/',
            });

            return NextResponse.json({
                success: true,
                user: { email, name: 'Admin User' }
            });
        }

        return NextResponse.json(
            { success: false, error: 'Invalid credentials' },
            { status: 401 }
        );
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { success: false, error: 'Server error' },
            { status: 500 }
        );
    }
}
