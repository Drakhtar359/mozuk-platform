import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function getUser(email: string) {
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        return user;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;

                    // DEMO MODE: Allow hardcoded admin access for deployment without DB
                    if (email === 'admin@mozuk.net') {
                        // password123 hash comparison
                        const isMatch = await bcrypt.compare(password, '$2b$10$g4OstbFd4VezdaeGOBM9c..JoF3YIjPYRNJyffkbAaH7vIobrUv7C');
                        if (isMatch) {
                            return {
                                id: 'demo-admin',
                                name: 'Admin User',
                                email: 'admin@mozuk.net',
                                role: 'admin'
                            };
                        }
                    }

                    const user = await getUser(email);
                    if (!user) return null;
                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (passwordsMatch) return user;
                }

                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
});
