import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, date, decimal, boolean, timestamp, foreignKey } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  stripeCustomerId: text("stripe_customer_id"),
  truckerClientId: varchar("trucker_client_id"),
  userType: text("user_type").notNull().default("standard"), // "standard" or "trucker"
});

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  client: text("client").notNull(),
  status: text("status").notNull(), // "Active", "Completed", "In Review"
  progress: integer("progress").notNull().default(0),
  dueDate: date("dueDate").notNull(),
  description: text("description").notNull(),
});

export const contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: date("createdAt").notNull().default(sql`CURRENT_DATE`),
});

export const demoRequests = pgTable("demo_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  jobTitle: text("job_title"),
  industry: text("industry"),
  companySize: text("company_size"),
  challenges: text("challenges"),
  timeline: text("timeline"),
  budget: text("budget"),
  consultationNotes: text("consultation_notes"),
  createdAt: date("createdAt").notNull().default(sql`CURRENT_DATE`),
});

// Trucker Expense Tracking System
export const subscriptionTiers = pgTable("subscription_tiers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(), // "Basic", "Professional", "Enterprise"
  description: text("description").notNull(),
  baseCostPerMonth: decimal("base_cost_per_month", { precision: 10, scale: 2 }).notNull(),
  markupPercentage: decimal("markup_percentage", { precision: 5, scale: 2 }).notNull().default("300"), // 300% markup
  finalPricePerMonth: decimal("final_price_per_month", { precision: 10, scale: 2 }).notNull(), // calculated price with markup
  features: text("features").array().notNull(), // array of feature strings
  order: integer("order").notNull(), // for sorting
});

export const truckerClients = pgTable("trucker_clients", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  companyName: text("company_name").notNull(),
  contactPerson: text("contact_person"),
  email: text("email").notNull(),
  phone: text("phone"),
  address: text("address"),
  subscriptionTierId: varchar("subscription_tier_id").notNull(),
  subscriptionStartDate: date("subscription_start_date").notNull().default(sql`CURRENT_DATE`),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const mileageLogs = pgTable("mileage_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  truckerClientId: varchar("trucker_client_id").notNull(),
  logDate: date("log_date").notNull(),
  milesDriven: decimal("miles_driven", { precision: 10, scale: 2 }).notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const fuelExpenses = pgTable("fuel_expenses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  truckerClientId: varchar("trucker_client_id").notNull(),
  expenseDate: date("expense_date").notNull(),
  gallons: decimal("gallons", { precision: 10, scale: 2 }).notNull(),
  costPerGallon: decimal("cost_per_gallon", { precision: 10, scale: 2 }).notNull(),
  totalCost: decimal("total_cost", { precision: 10, scale: 2 }).notNull(),
  location: text("location"),
  createdAt: timestamp("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const maintenanceExpenses = pgTable("maintenance_expenses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  truckerClientId: varchar("trucker_client_id").notNull(),
  expenseDate: date("expense_date").notNull(),
  description: text("description").notNull(),
  cost: decimal("cost", { precision: 10, scale: 2 }).notNull(),
  category: text("category"), // "Oil Change", "Tire", "Repair", etc.
  createdAt: timestamp("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const foodExpenses = pgTable("food_expenses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  truckerClientId: varchar("trucker_client_id").notNull(),
  expenseDate: date("expense_date").notNull(),
  description: text("description").notNull(),
  cost: decimal("cost", { precision: 10, scale: 2 }).notNull(),
  location: text("location"),
  createdAt: timestamp("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const paperworkDocuments = pgTable("paperwork_documents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  truckerClientId: varchar("trucker_client_id").notNull(),
  documentDate: date("document_date").notNull(),
  documentType: text("document_type").notNull(), // "Invoice", "Receipt", "Report", etc.
  description: text("description").notNull(),
  fileUrl: text("file_url"),
  createdAt: timestamp("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
});

export const insertDemoRequestSchema = createInsertSchema(demoRequests).omit({
  id: true,
  createdAt: true,
});

// Trucker Expense Tracking Schemas
export const insertSubscriptionTierSchema = createInsertSchema(subscriptionTiers).omit({
  id: true,
});

export const insertTruckerClientSchema = createInsertSchema(truckerClients).omit({
  id: true,
  createdAt: true,
});

export const insertMileageLogSchema = createInsertSchema(mileageLogs).omit({
  id: true,
  createdAt: true,
});

export const insertFuelExpenseSchema = createInsertSchema(fuelExpenses).omit({
  id: true,
  createdAt: true,
});

export const insertMaintenanceExpenseSchema = createInsertSchema(maintenanceExpenses).omit({
  id: true,
  createdAt: true,
});

export const insertFoodExpenseSchema = createInsertSchema(foodExpenses).omit({
  id: true,
  createdAt: true,
});

export const insertPaperworkDocumentSchema = createInsertSchema(paperworkDocuments).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;
export type InsertDemoRequest = z.infer<typeof insertDemoRequestSchema>;
export type DemoRequest = typeof demoRequests.$inferSelect;

export type InsertSubscriptionTier = z.infer<typeof insertSubscriptionTierSchema>;
export type SubscriptionTier = typeof subscriptionTiers.$inferSelect;
export type InsertTruckerClient = z.infer<typeof insertTruckerClientSchema>;
export type TruckerClient = typeof truckerClients.$inferSelect;
export type InsertMileageLog = z.infer<typeof insertMileageLogSchema>;
export type MileageLog = typeof mileageLogs.$inferSelect;
export type InsertFuelExpense = z.infer<typeof insertFuelExpenseSchema>;
export type FuelExpense = typeof fuelExpenses.$inferSelect;
export type InsertMaintenanceExpense = z.infer<typeof insertMaintenanceExpenseSchema>;
export type MaintenanceExpense = typeof maintenanceExpenses.$inferSelect;
export type InsertFoodExpense = z.infer<typeof insertFoodExpenseSchema>;
export type FoodExpense = typeof foodExpenses.$inferSelect;
export type InsertPaperworkDocument = z.infer<typeof insertPaperworkDocumentSchema>;
export type PaperworkDocument = typeof paperworkDocuments.$inferSelect;
