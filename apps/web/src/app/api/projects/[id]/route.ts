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
        const project = await prisma.project.findUnique({
            where: { id },
            include: {
                client: true,
            },
        });

        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        return NextResponse.json(project);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
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
        const project = await prisma.project.update({
            where: { id },
            data: {
                name: body.name,
                description: body.description,
                status: body.status,
                startDate: body.startDate ? new Date(body.startDate) : null,
                endDate: body.endDate ? new Date(body.endDate) : null,
                budget: body.budget ? parseFloat(body.budget) : null,
                clientId: body.clientId,
            },
            include: {
                client: true,
            },
        });
        return NextResponse.json(project);
    } catch (error) {
        console.error('Update project error:', error);
        return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
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
        await prisma.project.delete({
            where: { id },
        });
        return NextResponse.json({ message: 'Project deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }
}
