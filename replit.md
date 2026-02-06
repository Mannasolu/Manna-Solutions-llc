# Manna Solutions LLC - AI/ML Solutions Platform

## Overview

Manna Solutions LLC is a full-stack web application combining a public-facing marketing website with a client portal for an AI/ML solutions company. The platform showcases the company's AI/ML services (Predictive Analytics, NLP, Computer Vision, ML Ops) while providing authenticated clients with project management, document sharing, and billing capabilities.

The application uses a modern monorepo structure with React/Vite for the frontend, Express for the backend, and PostgreSQL (via Neon) for data persistence. It integrates Stripe for payment processing and subscription management.

## User Preferences

Preferred communication style: Simple, everyday language.
Build approach: Minimize credit usage; review as you go. Uses Autonomous mode for complex features.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, bundled using Vite
- **UI Library**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS v4 with custom design tokens (deep navy & tech blue theme)
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state
- **Form Handling**: React Hook Form with Zod validation

**Design Decisions**:
- Component-based architecture with reusable UI primitives in `client/src/components/ui/`
- Layout components separate public marketing pages from authenticated dashboard
- Custom fonts (DM Sans for body, Space Grotesk for headings) loaded from Google Fonts
- Responsive-first design with mobile breakpoint at 768px

### Backend Architecture

**Framework**: Express.js with TypeScript running on Node.js
- **Database ORM**: Drizzle ORM for type-safe database operations
- **API Design**: RESTful endpoints with JSON payloads
- **Build System**: esbuild for server bundling with selective dependency bundling

**Key Routes**:
- `/api/projects` - CRUD operations for project management
- `/api/contacts` - Contact form submissions
- `/api/demo-requests` - Demo request submissions and retrieval
- `/api/stripe/*` - Stripe integration endpoints (webhook, billing portal, config)

**Design Decisions**:
- Monolithic server with routes defined in `server/routes.ts`
- Storage abstraction layer (`IStorage` interface) allows easy database swapping
- Server-side rendering of index.html in production via static middleware
- Development mode uses Vite's middleware for HMR

### Data Storage

**Database**: PostgreSQL (Neon serverless)
- **Schema Management**: Drizzle Kit for migrations
- **Core Tables**:
  - `users` - Authentication (username/password) with Stripe customer linking
  - `projects` - Project tracking with status, progress, due dates
  - `contacts` - Contact form inquiries
  - `demo_requests` - Demo request submissions with company details, timeline, budget, challenges, and notes

**Design Decisions**:
- UUID primary keys using `gen_random_uuid()`
- Connection pooling via `@neondatabase/serverless` for serverless compatibility
- Schema defined in shared directory (`shared/schema.ts`) for type sharing between client/server
- Seed script provides sample project data

### Authentication & Authorization

**Current State**: Mock authentication (login redirects to dashboard without validation)

**Planned Architecture** (evident from user schema):
- Username/password authentication
- Passport.js integration prepared (dependency installed)
- Session management via `express-session` with PostgreSQL store (`connect-pg-simple`)

**Design Rationale**: Authentication system is stubbed to allow client portal UI development while deferring complex security implementation.

### External Dependencies

**Payment Processing**:
- **Stripe** - Subscription billing and payment processing
  - Environment-based credential management via STRIPE_PUBLISHABLE_KEY and STRIPE_API_SECRET_KEY secrets
  - Direct Stripe SDK usage (native `stripe` package)
  - Customer portal for subscription management
  - Webhook handler ready (requires STRIPE_WEBHOOK_SECRET)

**Infrastructure**:
- **Neon Database** - Serverless PostgreSQL hosting
- **Replit Deployment** - Platform hosting with environment variable management
  - Custom meta image plugin for OpenGraph tags
  - Development banner and cartographer plugins in dev mode

**Third-Party Libraries**:
- **UI Components**: Extensive Radix UI component library (@radix-ui/*)
- **Validation**: Zod for runtime type checking and schema validation
- **Date Handling**: date-fns for date formatting and manipulation
- **Icons**: Lucide React for consistent iconography

**Build & Development**:
- **Vite** - Fast development server with HMR
- **TypeScript** - Type safety across entire stack
- **PostCSS** - CSS processing with Tailwind and Autoprefixer
- **Drizzle Kit** - Database migration management

## Feature: Demo Request Funnel

**Overview**: Intelligent two-step funnel on the Contact page that captures detailed demo requests vs general consultations.

**Components**:
- `DemoFunnel.tsx` - Main funnel component with choice selection and form
- Contact page displays funnel initially, switches to consultation form when "General Inquiry" is selected

**Flow**:
1. **Choice Step** - User selects between "Request a Demo" or "General Inquiry"
2. **Demo Form** (if Demo selected) - Collects:
   - Personal info: firstName, lastName, email
   - Company info: company name, job title, industry, company size
   - Needs: timeline, budget range
   - Context: challenges facing, additional notes
3. **Consultation Form** (if General Inquiry selected) - Standard contact form

**Management Dashboard**:
- Tabbed interface in Consultations page
- **Consultations Tab** - General inquiries with search/filter
- **Demo Requests Tab** - Detailed demo requests organized by industry, company size, timeline, budget
- Each demo request displays all collected information in organized cards

**Database**: Separate `demo_requests` table maintains data integrity and enables targeted management

## Recent Changes

- **2026-02-06**: Removed Trucker Expense Tracking System from this project
  - Removed all trucker dashboard pages, API routes, database schema tables, storage methods, seed data, and export guide
  - Removed AI extraction and object storage integrations
- **2026-01-04**: Switched from `stripe-replit-sync` to direct Stripe SDK usage
  - Uses `STRIPE_API_SECRET_KEY` instead of `STRIPE_SECRET_KEY` (Replit integration was overwriting the key)
