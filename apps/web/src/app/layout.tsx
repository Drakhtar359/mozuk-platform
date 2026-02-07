import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'MOZUK Platform',
    description: 'Precision Protocol',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
