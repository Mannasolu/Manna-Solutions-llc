# Running Manna Solutions Locally

## Prerequisites

Install the following software before getting started:

| Requirement | Version | Notes |
|-------------|---------|-------|
| Node.js | v20.x (v20.20.0 recommended) | Download from [nodejs.org](https://nodejs.org) |
| npm | v10.x (comes with Node.js) | Included with Node.js installation |
| PostgreSQL | 14+ | Local installation or a cloud service like [Neon](https://neon.tech) |

## Environment Variables

Create a `.env` file in the project root with the following variables:

### Required

| Variable       | Description                                                                 |
|----------------|-----------------------------------------------------------------------------|
| `DATABASE_URL` | Full PostgreSQL connection string (e.g., `postgresql://user:password@localhost:5432/manna`) |
| `PGHOST`       | Database host (e.g., `localhost`)                                           |
| `PGPORT`       | Database port (e.g., `5432`)                                                |
| `PGUSER`       | Database username                                                           |
| `PGPASSWORD`   | Database password                                                           |
| `PGDATABASE`   | Database name                                                               |

### Recommended

| Variable         | Description                                      |
|------------------|--------------------------------------------------|
| `SESSION_SECRET` | Any random string used for session security      |

### Not Needed Locally

The following environment variables are Replit-specific integrations and are **not required** for local development:

- `AI_INTEGRATIONS_GEMINI_*` - Replit's managed Gemini AI integration
- `DEFAULT_OBJECT_STORAGE_BUCKET_ID` - Replit object storage
- `PUBLIC_OBJECT_SEARCH_PATHS` - Replit object storage
- `PRIVATE_OBJECT_DIR` - Replit object storage
- `REPL_ID`, `REPLIT_DOMAINS`, `REPLIT_DEV_DOMAIN` - Replit platform variables

## Setup Steps

### 1. Install dependencies

```bash
npm install
```

### 2. Set up your PostgreSQL database

Create a database (e.g., named `manna`) in your local PostgreSQL, or use a cloud-hosted database.

### 3. Create your `.env` file

At minimum, set `DATABASE_URL` and the individual `PG*` variables.

### 4. Push the database schema

This creates all the necessary tables in your PostgreSQL database:

```bash
npm run db:push
```

### 5. Start in development mode

```bash
npm run dev
```

The app will be available at **http://localhost:5000** with hot reload enabled.

## Production Build

To build and run for production:

```bash
npm run build
npm start
```

## Available Commands

| Command          | Description                                              |
|------------------|----------------------------------------------------------|
| `npm install`    | Install all dependencies                                 |
| `npm run dev`    | Start development server with hot reload (port 5000)     |
| `npm run build`  | Build both client and server for production              |
| `npm start`      | Run the production build                                 |
| `npm run check`  | Run TypeScript type checking                             |
| `npm run db:push`| Sync the database schema to your PostgreSQL instance     |

## Project Structure

```
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── components/     # UI components (Shadcn/Radix)
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utilities
│   └── index.html          # Entry HTML
├── server/                 # Backend Express server
│   ├── index.ts            # Server entry point
│   ├── routes.ts           # API routes
│   └── storage.ts          # Database operations (Drizzle ORM)
├── shared/                 # Shared between client and server
│   └── schema.ts           # Database schema (Drizzle)
├── script/
│   └── build.ts            # Production build script
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite bundler configuration
├── drizzle.config.ts       # Drizzle Kit database configuration
└── postcss.config.js       # PostCSS configuration
```

## Key Dependencies

### Frontend
- React 19, React DOM
- Vite 7 (build tool and dev server)
- Tailwind CSS 4
- Shadcn/UI components (built on Radix UI)
- TanStack React Query (server state management)
- Wouter (client-side routing)
- React Hook Form + Zod (forms and validation)
- Lucide React (icons)
- Framer Motion (animations)
- Recharts (charts)

### Backend
- Express 4
- Drizzle ORM + Drizzle Kit (database ORM and migrations)
- @neondatabase/serverless (PostgreSQL driver)
- Passport.js (authentication - partially implemented)
- express-session (session management)

## Notes for Local Development

### Replit-Specific Vite Plugins

The Vite config includes a few Replit-specific plugins (`cartographer`, `dev-banner`, `runtime-error-modal`). The cartographer and dev-banner plugins only activate when running on Replit (they check for a `REPL_ID` environment variable) and will be harmlessly skipped on your local machine. The runtime-error-modal plugin works fine locally.

### Port Configuration

The app runs on port 5000 by default. You can change this by setting the `PORT` environment variable.

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Verify `DATABASE_URL` format: `postgresql://user:password@localhost:5432/dbname`
- Check firewall/network settings if using a remote database

### Port Already in Use
- Kill existing processes on port 5000, or set `PORT=3000` (or another available port) in your `.env`

### TypeScript Errors
- Run `npm run check` to see all type errors
- Ensure all dependencies are installed with `npm install`
