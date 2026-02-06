# Manna Solutions LLC

AI/ML solutions platform with a public marketing website and client management dashboard.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Shadcn/ui
- **Backend**: Express.js, TypeScript, Drizzle ORM
- **Database**: PostgreSQL

## Quick Start

### Prerequisites

- Node.js v20+
- PostgreSQL 14+

### Setup

```bash
# Install dependencies
npm install

# Copy environment template and fill in your values
cp .env.example .env

# Push database schema
npm run db:push

# (Optional) Seed sample data
npx tsx seed.ts

# Start development server
npm run dev
```

The app runs at **http://localhost:5000**.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Build for production |
| `npm start` | Run production build |
| `npm run check` | TypeScript type checking |
| `npm run db:push` | Sync database schema |

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components (Shadcn/Radix)
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utilities
│   └── index.html
├── server/                 # Express backend
│   ├── index.ts            # Server entry point
│   ├── routes.ts           # API routes
│   └── storage.ts          # Database operations
├── shared/                 # Shared types & schema
│   └── schema.ts           # Drizzle database schema
├── attached_assets/        # Static images & media
├── script/
│   └── build.ts            # Production build script
└── seed.ts                 # Database seed script
```

## Environment Variables

See [`.env.example`](.env.example) for all available configuration options.

**Required**: `DATABASE_URL` and PostgreSQL connection variables (`PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`).

## Features

### Public Website
- Home, About, Solutions, Capabilities, Insights pages
- Contact page with intelligent demo request funnel
- Responsive design with dark navy/tech blue theme

### Dashboard
- Project management and tracking
- Contact inquiry management
- Demo request management with filtering by industry, company size, timeline, budget

## Production Build

```bash
npm run build
npm start
```

The build compiles the React frontend with Vite and bundles the Express server with esbuild into `dist/`.
