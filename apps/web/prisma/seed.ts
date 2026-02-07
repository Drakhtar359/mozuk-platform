import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...');

    // Create a test user
    const hashedPassword = await bcrypt.hash('password123', 10);

    const user = await prisma.user.upsert({
        where: { email: 'admin@mozuk.net' },
        update: {},
        create: {
            email: 'admin@mozuk.net',
            name: 'MOZUK Admin',
            password: hashedPassword,
        },
    });

    console.log('✅ Created user:', user.email);

    // Create some sample clients
    const client1 = await prisma.client.create({
        data: {
            name: 'Acme Corporation',
            email: 'contact@acme.com',
            company: 'Acme Corp',
            phone: '+1 (555) 123-4567',
            notes: 'Long-term client since 2023',
            status: 'active',
        },
    });

    const client2 = await prisma.client.create({
        data: {
            name: 'TechStart Inc',
            email: 'hello@techstart.io',
            company: 'TechStart',
            phone: '+1 (555) 987-6543',
            status: 'active',
        },
    });

    console.log('✅ Created sample clients');

    // Create some sample projects
    await prisma.project.create({
        data: {
            name: 'Website Redesign',
            description: 'Complete overhaul of company website with modern design',
            status: 'active',
            startDate: new Date('2024-01-15'),
            budget: 15000,
            clientId: client1.id,
        },
    });

    await prisma.project.create({
        data: {
            name: 'Mobile App Development',
            description: 'Native iOS and Android app for customer engagement',
            status: 'active',
            startDate: new Date('2024-02-01'),
            budget: 45000,
            clientId: client1.id,
        },
    });

    await prisma.project.create({
        data: {
            name: 'Brand Identity',
            description: 'Logo design and brand guidelines',
            status: 'completed',
            startDate: new Date('2023-11-01'),
            endDate: new Date('2023-12-15'),
            budget: 8000,
            clientId: client2.id,
        },
    });

    console.log('✅ Created sample projects');
    console.log('');
    console.log('🎉 Database seeded successfully!');
    console.log('');
    console.log('📧 Login credentials:');
    console.log('   Email: admin@mozuk.net');
    console.log('   Password: password123');
}

main()
    .catch((e) => {
        console.error('Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
