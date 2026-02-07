import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const client = await prisma.client.findUnique({
            where: { id },
            include: {
                projects: true,
            },
        });

        if (!client) {
            return NextResponse.json({ error: 'Client not found' }, { status: 404 });
        }

        return NextResponse.json(client);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch client' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();
        const client = await prisma.client.update({
            where: { id },
            data: {
                name: body.name,
                email: body.email,
                company: body.company,
                phone: body.phone,
                notes: body.notes,
                status: body.status,
            },
        });
        return NextResponse.json(client);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update client' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        await prisma.client.delete({
            where: { id },
        });
        return NextResponse.json({ message: 'Client deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete client' }, { status: 500 });
    }
}
