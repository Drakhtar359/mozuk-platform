import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const projects = await prisma.project.findMany({
            include: {
                client: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return NextResponse.json(projects);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const project = await prisma.project.create({
            data: {
                name: body.name,
                description: body.description,
                status: body.status || 'active',
                startDate: body.startDate ? new Date(body.startDate) : null,
                endDate: body.endDate ? new Date(body.endDate) : null,
                budget: body.budget ? parseFloat(body.budget) : null,
                clientId: body.clientId,
            },
            include: {
                client: true,
            },
        });
        return NextResponse.json(project, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
}
