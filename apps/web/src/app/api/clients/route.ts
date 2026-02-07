import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const clients = await prisma.client.findMany({
            include: {
                projects: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return NextResponse.json(clients);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const client = await prisma.client.create({
            data: {
                name: body.name,
                email: body.email,
                company: body.company,
                phone: body.phone,
                notes: body.notes,
                status: body.status || 'active',
            },
        });
        return NextResponse.json(client, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create client' }, { status: 500 });
    }
}
