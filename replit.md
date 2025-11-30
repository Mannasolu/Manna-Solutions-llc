# Manna Solutions LLC - AI/ML Solutions Platform

## Overview

Manna Solutions LLC is a full-stack web application combining a public-facing marketing website with a client portal for an AI/ML solutions company. The platform showcases the company's AI/ML services (Predictive Analytics, NLP, Computer Vision, ML Ops) while providing authenticated clients with project management, document sharing, and billing capabilities.

The application uses a modern monorepo structure with React/Vite for the frontend, Express for the backend, and PostgreSQL (via Neon) for data persistence. It integrates Stripe for payment processing and subscription management.

Additionally, the platform includes a dedicated **Trucker Expense Tracking System** for managing comprehensive expense tracking for trucking professionals.

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
- Dashboard subsystem for trucker expense tracking with 7 dedicated pages

### Backend Architecture

**Framework**: Express.js with TypeScript running on Node.js
- **Database ORM**: Drizzle ORM for type-safe database operations
- **API Design**: RESTful endpoints with JSON payloads
- **Build System**: esbuild for server bundling with selective dependency bundling

**Key Routes**:
- `/api/projects` - CRUD operations for project management
- `/api/contacts` - Contact form submissions
- `/api/demo-requests` - Demo request submissions and retrieval
- `/api/stripe/*` - Stripe integration endpoints (webhook, billing portal, checkout)
- `/api/mileage-logs` - Trucker mileage tracking
- `/api/fuel-expenses` - Fuel expense management
- `/api/maintenance-expenses` - Maintenance cost tracking
- `/api/food-expenses` - Meal expense logging
- `/api/paperwork` - Documentation management
- `/api/subscription-tiers` - Trucker subscription pricing
- `/api/subscriptions` - Trucker subscription management

**Design Decisions**:
- Monolithic server with routes defined in `server/routes.ts`
- Storage abstraction layer (`IStorage` interface) allows easy database swapping
- Server-side rendering of index.html in production via static middleware
- Development mode uses Vite's middleware for HMR

### Data Storage

**Database**: PostgreSQL (Neon serverless)
- **Schema Management**: Drizzle Kit for migrations
- **Core Tables**:
  - `users` - Authentication (username/password) with Stripe customer linking and optional truckerClientId
  - `projects` - Project tracking with status, progress, due dates
  - `contacts` - Contact form inquiries
  - `demo_requests` - Demo request submissions with company details, timeline, budget, challenges, and notes
  - Stripe sync tables (managed by `stripe-replit-sync` package)

- **Trucker Expense Tracking Tables**:
  - `truckerClients` - Trucker company information and subscription tier links
  - `subscriptionTiers` - 3 subscription tiers (Basic, Professional, Enterprise) with 300% markup pricing
  - `truckerSubscriptions` - Links trucker clients to subscription tiers with billing dates
  - `mileageLogs` - Date, miles driven, and driver notes
  - `fuelExpenses` - Gallons purchased, cost per gallon, total cost
  - `maintenanceExpenses` - Date, description, and maintenance costs
  - `foodExpenses` - Date, description, and meal expenses
  - `paperworkDocuments` - Date, document type, and descriptions

**Design Decisions**:
- UUID primary keys using `gen_random_uuid()`
- Connection pooling via `@neondatabase/serverless` for serverless compatibility
- Schema defined in shared directory (`shared/schema.ts`) for type sharing between client/server
- Seed script provides sample project data
- Separate trucker subsystem with dedicated tables for data integrity and targeted management

### Authentication & Authorization

**Current State**: Mock authentication (login redirects to dashboard without validation)

**Trucker Portal**: Supports linking trucker clients to subscription tiers

**Planned Architecture** (evident from user schema):
- Username/password authentication
- Passport.js integration prepared (dependency installed)
- Session management via `express-session` with PostgreSQL store (`connect-pg-simple`)

**Design Rationale**: Authentication system is stubbed to allow client portal UI development while deferring complex security implementation.

### External Dependencies

**Payment Processing**:
- **Stripe** - Subscription billing and payment processing
  - Environment-based credential management via STRIPE_PUBLISHABLE_KEY and STRIPE_SECRET_KEY secrets
  - Managed webhooks via `stripe-replit-sync` package
  - Customer portal for subscription management
  - Note: Stripe connector was dismissed; using secrets-based authentication instead

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

**Design Rationale for Stripe Integration**: The application uses `stripe-replit-sync` to automatically manage database schema for Stripe data synchronization, reducing manual webhook handling complexity. Managed webhooks ensure reliability across deployments.

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

## Feature: Trucker Expense Tracking System

**Overview**: Complete expense management solution for trucking professionals with three subscription tiers calculated at 300% markup (cost × 4).

**Subscription Tiers**:
1. **Basic Tier** - $116/month
   - Mileage tracking
   - Fuel expense logging
   - Dashboard overview

2. **Professional Tier** - $236/month (includes Basic +)
   - Maintenance expense tracking
   - Food/meal expense logging
   - Monthly reports

3. **Enterprise Tier** - $396/month (includes Professional +)
   - Paperwork and documentation management
   - Advanced analytics
   - Full expense history and exports

**Components**:
- `TruckerDashboard.tsx` - Home page with expense summary and quick actions
- `MileageTracking.tsx` - Log daily mileage with notes
- `FuelExpenses.tsx` - Track fuel purchases and calculate costs
- `MaintenanceTracking.tsx` - Record maintenance expenses
- `FoodExpenses.tsx` - Track meal and food expenses
- `PaperworkManagement.tsx` - Manage documentation and receipts
- `SubscriptionManagement.tsx` - View subscription and upgrade options

**Solutions Page Integration**:
- Dedicated pricing menu section on Solutions page
- Displays all 3 subscription tiers with feature comparison
- Monthly pricing with 300% markup calculations
- Call-to-action buttons for each tier

**Database**: 8 dedicated trucker expense tables with full CRUD API support

**API Endpoints**:
- `GET/POST/PUT/DELETE /api/mileage-logs` - Mileage tracking
- `GET/POST/PUT/DELETE /api/fuel-expenses` - Fuel management
- `GET/POST/PUT/DELETE /api/maintenance-expenses` - Maintenance tracking
- `GET/POST/PUT/DELETE /api/food-expenses` - Food expenses
- `GET/POST/PUT/DELETE /api/paperwork` - Documentation
- `GET /api/subscription-tiers` - Subscription tier information
- `POST /api/subscriptions` - Create subscriptions
