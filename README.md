# MOZUK Platform

A beautiful client and project tracking platform built for MOZUK.

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000`

### Login

```
Email: admin@mozuk.net
Password: password123
```

## 📦 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Database:** Prisma ORM + SQLite (dev) / PostgreSQL (prod)
- **Authentication:** NextAuth.js v5
- **Styling:** Vanilla CSS with MOZUK brand colors

## 🎨 Features

- 🔐 Secure authentication
- 📊 Dashboard with statistics
- 👥 Client management (CRUD)
- 📁 Project tracking (CRUD)
- 💰 Budget tracking
- 🎯 Status management
- 📱 Responsive design

## 🗄️ Database

### Reset Database

```bash
cd apps/web
npx prisma db push --force-reset
npx tsx prisma/seed.ts
```

### View Database

```bash
cd apps/web
npx prisma studio
```

## 🌐 Deployment

### Environment Variables

Create `.env` in `apps/web/`:

```env
DATABASE_URL="your-postgres-url"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="https://platform.mozuk.net"
```

### Deploy to Vercel

```bash
vercel
```

Then configure `platform.mozuk.net` domain in Vercel dashboard.

## 📁 Project Structure

```
platform-mozuk/
├── apps/
│   └── web/              # Next.js application
│       ├── src/
│       │   ├── app/     # Pages and API routes
│       │   ├── components/  # React components
│       │   └── lib/     # Utilities and configs
│       ├── prisma/      # Database schema + seed
│       └── public/      # Static assets
└── package.json         # Workspace config
```

## 🎯 API Endpoints

- `GET/POST /api/clients` - List/Create clients
- `GET/PUT/DELETE /api/clients/[id]` - Client operations
- `GET/POST /api/projects` - List/Create projects
- `GET/PUT/DELETE /api/projects/[id]` - Project operations

## 📝 License

Private - MOZUK Internal Use
