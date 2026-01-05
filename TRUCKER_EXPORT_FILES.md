# Trucker Expense Tracking System - Export Guide

This document lists all files and code sections related to the Trucker Expense Tracking System that need to be copied to a new project.

## Frontend Pages (client/src/pages/)

### Dashboard Pages (copy entire files)
1. `client/src/pages/dashboard/TruckerDashboard.tsx` - Main dashboard home
2. `client/src/pages/dashboard/MileageTracking.tsx` - Mileage log management
3. `client/src/pages/dashboard/FuelExpenses.tsx` - Fuel expense tracking
4. `client/src/pages/dashboard/MaintenanceTracking.tsx` - Maintenance costs
5. `client/src/pages/dashboard/FoodExpenses.tsx` - Meal expenses
6. `client/src/pages/dashboard/PaperworkManagement.tsx` - Document management
7. `client/src/pages/dashboard/SubscriptionManagement.tsx` - Subscription tiers
8. `client/src/pages/dashboard/DocumentExtractor.tsx` - AI receipt extraction

### Onboarding
9. `client/src/pages/TruckerOnboarding.tsx` - Signup/onboarding flow

## Backend Integration Files

### AI Integration (copy entire folder)
10. `server/replit_integrations/extraction/index.ts` - Gemini AI document extraction

### Object Storage (copy entire folder)
11. `server/replit_integrations/object_storage/index.ts` - Receipt image storage

## Database Schema (shared/schema.ts)

Copy these table definitions (lines 50-149):
```typescript
// Trucker Expense Tracking System
export const subscriptionTiers = pgTable("subscription_tiers", {...});
export const truckerClients = pgTable("trucker_clients", {...});
export const mileageLogs = pgTable("mileage_logs", {...});
export const fuelExpenses = pgTable("fuel_expenses", {...});
export const maintenanceExpenses = pgTable("maintenance_expenses", {...});
export const foodExpenses = pgTable("food_expenses", {...});
export const paperworkDocuments = pgTable("paperwork_documents", {...});
export const receiptImages = pgTable("receipt_images", {...});
export const storageBilling = pgTable("storage_billing", {...});
```

Copy the insert schemas (lines 174-214):
```typescript
export const insertSubscriptionTierSchema = ...
export const insertTruckerClientSchema = ...
export const insertMileageLogSchema = ...
export const insertFuelExpenseSchema = ...
export const insertMaintenanceExpenseSchema = ...
export const insertFoodExpenseSchema = ...
export const insertPaperworkDocumentSchema = ...
export const insertReceiptImageSchema = ...
```

Copy the type exports (lines 229-244):
```typescript
export type InsertSubscriptionTier = ...
export type SubscriptionTier = ...
// ... all trucker-related types
```

## API Routes (server/routes.ts)

Copy these route sections (approximately lines 180-680):
- `/api/trucker-clients` - CRUD for trucker clients
- `/api/mileage-logs` - CRUD for mileage logs
- `/api/fuel-expenses` - CRUD for fuel expenses
- `/api/maintenance-expenses` - CRUD for maintenance
- `/api/food-expenses` - CRUD for food expenses
- `/api/paperwork-documents` - CRUD for paperwork
- `/api/subscription-tiers` - Get subscription tiers
- `/api/subscriptions` - Create subscriptions
- `/api/receipt-images` - Receipt image storage
- `/api/storage-pricing` - Storage pricing info
- `/api/storage-usage` - Storage usage stats
- `/api/extract-document` - AI document extraction

## Storage Interface (server/storage.ts)

Copy these interface methods (lines 50-95):
```typescript
// Trucker Clients
createTruckerClient(client: InsertTruckerClient): Promise<TruckerClient>;
getTruckerClient(id: string): Promise<TruckerClient | undefined>;
// ... all trucker-related methods
```

Copy the implementation methods (lines 175-350+):
- All `TruckerClient` methods
- All `MileageLog` methods
- All `FuelExpense` methods
- All `MaintenanceExpense` methods
- All `FoodExpense` methods
- All `PaperworkDocument` methods
- All `ReceiptImage` methods
- All `StorageBilling` methods

## App Router (client/src/App.tsx)

Copy these route registrations:
```typescript
import TruckerOnboarding from "@/pages/TruckerOnboarding";
import TruckerDashboard from "@/pages/dashboard/TruckerDashboard";
import MileageTracking from "@/pages/dashboard/MileageTracking";
import FuelExpenses from "@/pages/dashboard/FuelExpenses";
import MaintenanceTracking from "@/pages/dashboard/MaintenanceTracking";
import FoodExpenses from "@/pages/dashboard/FoodExpenses";
import PaperworkManagement from "@/pages/dashboard/PaperworkManagement";

// Routes
<Route path="/trucker-signup" component={TruckerOnboarding} />
<Route path="/dashboard" component={TruckerDashboard} />
<Route path="/dashboard/mileage" component={MileageTracking} />
<Route path="/dashboard/fuel" component={FuelExpenses} />
<Route path="/dashboard/maintenance" component={MaintenanceTracking} />
<Route path="/dashboard/food" component={FoodExpenses} />
<Route path="/dashboard/paperwork" component={PaperworkManagement} />
```

## Environment Variables Needed

For the new project, you'll need:
- `DATABASE_URL` - PostgreSQL connection string
- `STRIPE_PUBLISHABLE_KEY` - Stripe public key
- `STRIPE_API_SECRET_KEY` - Stripe secret key
- Object storage environment variables (auto-configured by Replit)
- Gemini AI integration (auto-configured by Replit AI Integrations)

## Database Tables to Recreate

Run these to set up the new database:
1. subscription_tiers
2. trucker_clients
3. mileage_logs
4. fuel_expenses
5. maintenance_expenses
6. food_expenses
7. paperwork_documents
8. receipt_images
9. storage_billing

## Subscription Tier Pricing

The system uses 300% markup pricing:
- Basic: $116/month (cost: $29)
- Professional: $236/month (cost: $59)
- Enterprise: $396/month (cost: $99)

Receipt storage: $0.05/image/month

---

Once you've copied these files, let me know and I'll proceed with removing the trucker elements from this marketing site.
