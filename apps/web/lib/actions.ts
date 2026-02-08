'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        console.log('Server Action: authenticate called');
        console.log('FormData:', Object.fromEntries(formData)); // Be careful in prod with passwords, but okay for debug
        await signIn('credentials', formData);
    } catch (error) {
        console.error('Server Action Error:', error);
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}
