import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const client = await prisma.client.findUnique({
            where: { id: params.id },
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
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const client = await prisma.client.update({
            where: { id: params.id },
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
    { params }: { params: { id: string } }
) {
    try {
        await prisma.client.delete({
            where: { id: params.id },
        });
        return NextResponse.json({ message: 'Client deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete client' }, { status: 500 });
    }
}
