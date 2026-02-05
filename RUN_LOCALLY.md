# Running This Application Locally

This guide explains how to run the Manna Solutions LLC application on your local computer.

## Prerequisites

| Requirement | Version | Notes |
|-------------|---------|-------|
| Node.js | v20.x (v20.20.0 recommended) | Download from nodejs.org |
| npm | v10.x (v10.8.2 recommended) | Comes with Node.js |
| PostgreSQL | 16.x | Local database or cloud service like Neon |

## Environment Variables

Create a `.env` file in the project root with these variables:

```env
# Required
DATABASE_URL=postgresql://user:password@host:5432/database

# For Stripe payments (optional - app runs without these)
STRIPE_PUBLISHABLE_KEY=pk_live_xxx or pk_test_xxx
STRIPE_API_SECRET_KEY=sk_live_xxx or sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# For Object Storage - receipt images (Replit-specific, needs alternative locally)
DEFAULT_OBJECT_STORAGE_BUCKET_ID=your-bucket
PRIVATE_OBJECT_DIR=.private
PUBLIC_OBJECT_SEARCH_PATHS=public

# For AI document extraction (needs Gemini API key from Google AI Studio)
GEMINI_API_KEY=your-gemini-api-key
```

## NPM Scripts

| Command | Purpose |
|---------|---------|
| `npm install` | Install all dependencies |
| `npm run dev` | Start development server (backend + frontend via Vite) |
| `npm run build` | Build for production |
| `npm run start` | Run production build |
| `npm run db:push` | Push database schema to PostgreSQL |
| `npm run check` | TypeScript type checking |

## Dependencies Overview

### Frontend (React)
- React 19.2.0, React DOM
- Vite 7.1.9 (build tool)
- Tailwind CSS 4.1.14
- Shadcn/UI components (Radix UI primitives)
- TanStack React Query (server state)
- Wouter (routing)
- React Hook Form + Zod (forms/validation)
- Lucide React (icons)
- Framer Motion (animations)
- Recharts (charts)

### Backend (Express)
- Express 4.21.2
- Drizzle ORM 0.39.3 + drizzle-kit
- @neondatabase/serverless (PostgreSQL driver)
- Passport.js (authentication - partially implemented)
- Stripe 18.5.0

### Replit-Specific (need alternatives locally)
- `@replit/vite-plugin-*` - Can be removed for local dev
- `stripe-replit-sync` - Uses Replit's managed Stripe integration
- `@google-cloud/storage` - For object storage (use local file system or S3)
- `@google/genai` - For Gemini AI (need your own API key)

## Project Structure

```
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utilities
│   └── index.html          # Entry HTML
├── server/                 # Backend Express server
│   ├── index.ts            # Server entry point
│   ├── routes.ts           # API routes
│   ├── storage.ts          # Database operations
│   └── replit_integrations/# AI & storage integrations
├── shared/                 # Shared code
│   └── schema.ts           # Database schema (Drizzle)
├── package.json            # Dependencies & scripts
├── tsconfig.json           # TypeScript config
├── vite.config.ts          # Vite bundler config
├── drizzle.config.ts       # Database config
└── postcss.config.js       # PostCSS config
```

## Steps to Run Locally

1. **Clone/copy the project**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up PostgreSQL database** (local installation or Neon cloud service)

4. **Create `.env` file** with DATABASE_URL at minimum

5. **Push database schema:**
   ```bash
   npm run db:push
   ```

6. **Start development server:**
   ```bash
   npm run dev
   ```

7. **Open browser:** http://localhost:5000

## Notes for Local Development

### Remove Replit Plugins
Edit `vite.config.ts` to remove or comment out the Replit-specific imports:
- `@replit/vite-plugin-runtime-error-modal`
- `@replit/vite-plugin-cartographer`
- `@replit/vite-plugin-dev-banner`

### Object Storage
The application uses Google Cloud Storage via Replit's integration. For local development:
- Replace with local file system storage
- Or configure AWS S3 / Google Cloud Storage with your own credentials

### AI Document Extraction
The receipt extraction feature uses Google's Gemini AI:
1. Get an API key from Google AI Studio (https://aistudio.google.com/)
2. Set `GEMINI_API_KEY` in your `.env` file

### Stripe Payments
Works as-is with your own Stripe API keys:
1. Get keys from Stripe Dashboard (https://dashboard.stripe.com/apikeys)
2. Set `STRIPE_PUBLISHABLE_KEY` and `STRIPE_API_SECRET_KEY` in `.env`

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Verify DATABASE_URL format: `postgresql://user:password@localhost:5432/dbname`
- Check firewall/network settings if using remote database

### Port Already in Use
- The app runs on port 5000 by default
- Kill existing processes or change the PORT environment variable

### TypeScript Errors
- Run `npm run check` to see all type errors
- Ensure all dependencies are installed with `npm install`
