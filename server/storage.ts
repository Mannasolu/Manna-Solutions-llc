import { 
  type User, type InsertUser, 
  type Project, type InsertProject, 
  type Contact, type InsertContact, 
  type DemoRequest, type InsertDemoRequest,
  type SubscriptionTier, type InsertSubscriptionTier,
  type TruckerClient, type InsertTruckerClient,
  type MileageLog, type InsertMileageLog,
  type FuelExpense, type InsertFuelExpense,
  type MaintenanceExpense, type InsertMaintenanceExpense,
  type FoodExpense, type InsertFoodExpense,
  type PaperworkDocument, type InsertPaperworkDocument
} from "@shared/schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@shared/schema";
import { eq } from "drizzle-orm";

// Initialize database connection
const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client, { schema });

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Projects
  getProject(id: string): Promise<Project | undefined>;
  getAllProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;
  
  // Contacts
  createContact(contact: InsertContact): Promise<Contact>;
  getAllContacts(): Promise<Contact[]>;
  
  // Demo Requests
  createDemoRequest(demoRequest: InsertDemoRequest): Promise<DemoRequest>;
  getAllDemoRequests(): Promise<DemoRequest[]>;

  // Subscription Tiers
  createSubscriptionTier(tier: InsertSubscriptionTier): Promise<SubscriptionTier>;
  getAllSubscriptionTiers(): Promise<SubscriptionTier[]>;
  getSubscriptionTier(id: string): Promise<SubscriptionTier | undefined>;

  // Trucker Clients
  createTruckerClient(client: InsertTruckerClient): Promise<TruckerClient>;
  getTruckerClient(id: string): Promise<TruckerClient | undefined>;
  getTruckerClientsByUser(userId: string): Promise<TruckerClient[]>;
  updateTruckerClient(id: string, client: Partial<InsertTruckerClient>): Promise<TruckerClient | undefined>;
  getAllTruckerClients(): Promise<TruckerClient[]>;

  // Mileage Logs
  createMileageLog(log: InsertMileageLog): Promise<MileageLog>;
  getMileageLog(id: string): Promise<MileageLog | undefined>;
  getMileageLogsByClient(truckerClientId: string): Promise<MileageLog[]>;
  updateMileageLog(id: string, log: Partial<InsertMileageLog>): Promise<MileageLog | undefined>;
  deleteMileageLog(id: string): Promise<boolean>;

  // Fuel Expenses
  createFuelExpense(expense: InsertFuelExpense): Promise<FuelExpense>;
  getFuelExpense(id: string): Promise<FuelExpense | undefined>;
  getFuelExpensesByClient(truckerClientId: string): Promise<FuelExpense[]>;
  updateFuelExpense(id: string, expense: Partial<InsertFuelExpense>): Promise<FuelExpense | undefined>;
  deleteFuelExpense(id: string): Promise<boolean>;

  // Maintenance Expenses
  createMaintenanceExpense(expense: InsertMaintenanceExpense): Promise<MaintenanceExpense>;
  getMaintenanceExpense(id: string): Promise<MaintenanceExpense | undefined>;
  getMaintenanceExpensesByClient(truckerClientId: string): Promise<MaintenanceExpense[]>;
  updateMaintenanceExpense(id: string, expense: Partial<InsertMaintenanceExpense>): Promise<MaintenanceExpense | undefined>;
  deleteMaintenanceExpense(id: string): Promise<boolean>;

  // Food Expenses
  createFoodExpense(expense: InsertFoodExpense): Promise<FoodExpense>;
  getFoodExpense(id: string): Promise<FoodExpense | undefined>;
  getFoodExpensesByClient(truckerClientId: string): Promise<FoodExpense[]>;
  updateFoodExpense(id: string, expense: Partial<InsertFoodExpense>): Promise<FoodExpense | undefined>;
  deleteFoodExpense(id: string): Promise<boolean>;

  // Paperwork Documents
  createPaperworkDocument(doc: InsertPaperworkDocument): Promise<PaperworkDocument>;
  getPaperworkDocument(id: string): Promise<PaperworkDocument | undefined>;
  getPaperworkDocumentsByClient(truckerClientId: string): Promise<PaperworkDocument[]>;
  updatePaperworkDocument(id: string, doc: Partial<InsertPaperworkDocument>): Promise<PaperworkDocument | undefined>;
  deletePaperworkDocument(id: string): Promise<boolean>;
}

export class DbStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(schema.users).where(eq(schema.users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(schema.users).where(eq(schema.users.username, username));
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(schema.users).values(user).returning();
    return result[0];
  }

  // Projects
  async getProject(id: string): Promise<Project | undefined> {
    const result = await db.select().from(schema.projects).where(eq(schema.projects.id, id));
    return result[0];
  }

  async getAllProjects(): Promise<Project[]> {
    return db.select().from(schema.projects);
  }

  async createProject(project: InsertProject): Promise<Project> {
    const result = await db.insert(schema.projects).values(project).returning();
    return result[0];
  }

  async updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined> {
    const result = await db.update(schema.projects).set(project).where(eq(schema.projects.id, id)).returning();
    return result[0];
  }

  async deleteProject(id: string): Promise<boolean> {
    const result = await db.delete(schema.projects).where(eq(schema.projects.id, id)).returning();
    return result.length > 0;
  }

  // Contacts
  async createContact(contact: InsertContact): Promise<Contact> {
    const result = await db.insert(schema.contacts).values(contact).returning();
    return result[0];
  }

  async getAllContacts(): Promise<Contact[]> {
    return db.select().from(schema.contacts);
  }

  // Demo Requests
  async createDemoRequest(demoRequest: InsertDemoRequest): Promise<DemoRequest> {
    const result = await db.insert(schema.demoRequests).values(demoRequest).returning();
    return result[0];
  }

  async getAllDemoRequests(): Promise<DemoRequest[]> {
    return db.select().from(schema.demoRequests);
  }

  // Subscription Tiers
  async createSubscriptionTier(tier: InsertSubscriptionTier): Promise<SubscriptionTier> {
    const result = await db.insert(schema.subscriptionTiers).values(tier).returning();
    return result[0];
  }

  async getAllSubscriptionTiers(): Promise<SubscriptionTier[]> {
    return db.select().from(schema.subscriptionTiers).orderBy(schema.subscriptionTiers.order);
  }

  async getSubscriptionTier(id: string): Promise<SubscriptionTier | undefined> {
    const result = await db.select().from(schema.subscriptionTiers).where(eq(schema.subscriptionTiers.id, id));
    return result[0];
  }

  // Trucker Clients
  async createTruckerClient(client: InsertTruckerClient): Promise<TruckerClient> {
    const result = await db.insert(schema.truckerClients).values(client).returning();
    return result[0];
  }

  async getTruckerClient(id: string): Promise<TruckerClient | undefined> {
    const result = await db.select().from(schema.truckerClients).where(eq(schema.truckerClients.id, id));
    return result[0];
  }

  async getTruckerClientsByUser(userId: string): Promise<TruckerClient[]> {
    const result = await db.select().from(schema.truckerClients).where(eq(schema.truckerClients.id, userId));
    return result;
  }

  async updateTruckerClient(id: string, client: Partial<InsertTruckerClient>): Promise<TruckerClient | undefined> {
    const result = await db.update(schema.truckerClients).set(client).where(eq(schema.truckerClients.id, id)).returning();
    return result[0];
  }

  async getAllTruckerClients(): Promise<TruckerClient[]> {
    return db.select().from(schema.truckerClients);
  }

  // Mileage Logs
  async createMileageLog(log: InsertMileageLog): Promise<MileageLog> {
    const result = await db.insert(schema.mileageLogs).values(log).returning();
    return result[0];
  }

  async getMileageLog(id: string): Promise<MileageLog | undefined> {
    const result = await db.select().from(schema.mileageLogs).where(eq(schema.mileageLogs.id, id));
    return result[0];
  }

  async getMileageLogsByClient(truckerClientId: string): Promise<MileageLog[]> {
    return db.select().from(schema.mileageLogs).where(eq(schema.mileageLogs.truckerClientId, truckerClientId));
  }

  async updateMileageLog(id: string, log: Partial<InsertMileageLog>): Promise<MileageLog | undefined> {
    const result = await db.update(schema.mileageLogs).set(log).where(eq(schema.mileageLogs.id, id)).returning();
    return result[0];
  }

  async deleteMileageLog(id: string): Promise<boolean> {
    const result = await db.delete(schema.mileageLogs).where(eq(schema.mileageLogs.id, id)).returning();
    return result.length > 0;
  }

  // Fuel Expenses
  async createFuelExpense(expense: InsertFuelExpense): Promise<FuelExpense> {
    const result = await db.insert(schema.fuelExpenses).values(expense).returning();
    return result[0];
  }

  async getFuelExpense(id: string): Promise<FuelExpense | undefined> {
    const result = await db.select().from(schema.fuelExpenses).where(eq(schema.fuelExpenses.id, id));
    return result[0];
  }

  async getFuelExpensesByClient(truckerClientId: string): Promise<FuelExpense[]> {
    return db.select().from(schema.fuelExpenses).where(eq(schema.fuelExpenses.truckerClientId, truckerClientId));
  }

  async updateFuelExpense(id: string, expense: Partial<InsertFuelExpense>): Promise<FuelExpense | undefined> {
    const result = await db.update(schema.fuelExpenses).set(expense).where(eq(schema.fuelExpenses.id, id)).returning();
    return result[0];
  }

  async deleteFuelExpense(id: string): Promise<boolean> {
    const result = await db.delete(schema.fuelExpenses).where(eq(schema.fuelExpenses.id, id)).returning();
    return result.length > 0;
  }

  // Maintenance Expenses
  async createMaintenanceExpense(expense: InsertMaintenanceExpense): Promise<MaintenanceExpense> {
    const result = await db.insert(schema.maintenanceExpenses).values(expense).returning();
    return result[0];
  }

  async getMaintenanceExpense(id: string): Promise<MaintenanceExpense | undefined> {
    const result = await db.select().from(schema.maintenanceExpenses).where(eq(schema.maintenanceExpenses.id, id));
    return result[0];
  }

  async getMaintenanceExpensesByClient(truckerClientId: string): Promise<MaintenanceExpense[]> {
    return db.select().from(schema.maintenanceExpenses).where(eq(schema.maintenanceExpenses.truckerClientId, truckerClientId));
  }

  async updateMaintenanceExpense(id: string, expense: Partial<InsertMaintenanceExpense>): Promise<MaintenanceExpense | undefined> {
    const result = await db.update(schema.maintenanceExpenses).set(expense).where(eq(schema.maintenanceExpenses.id, id)).returning();
    return result[0];
  }

  async deleteMaintenanceExpense(id: string): Promise<boolean> {
    const result = await db.delete(schema.maintenanceExpenses).where(eq(schema.maintenanceExpenses.id, id)).returning();
    return result.length > 0;
  }

  // Food Expenses
  async createFoodExpense(expense: InsertFoodExpense): Promise<FoodExpense> {
    const result = await db.insert(schema.foodExpenses).values(expense).returning();
    return result[0];
  }

  async getFoodExpense(id: string): Promise<FoodExpense | undefined> {
    const result = await db.select().from(schema.foodExpenses).where(eq(schema.foodExpenses.id, id));
    return result[0];
  }

  async getFoodExpensesByClient(truckerClientId: string): Promise<FoodExpense[]> {
    return db.select().from(schema.foodExpenses).where(eq(schema.foodExpenses.truckerClientId, truckerClientId));
  }

  async updateFoodExpense(id: string, expense: Partial<InsertFoodExpense>): Promise<FoodExpense | undefined> {
    const result = await db.update(schema.foodExpenses).set(expense).where(eq(schema.foodExpenses.id, id)).returning();
    return result[0];
  }

  async deleteFoodExpense(id: string): Promise<boolean> {
    const result = await db.delete(schema.foodExpenses).where(eq(schema.foodExpenses.id, id)).returning();
    return result.length > 0;
  }

  // Paperwork Documents
  async createPaperworkDocument(doc: InsertPaperworkDocument): Promise<PaperworkDocument> {
    const result = await db.insert(schema.paperworkDocuments).values(doc).returning();
    return result[0];
  }

  async getPaperworkDocument(id: string): Promise<PaperworkDocument | undefined> {
    const result = await db.select().from(schema.paperworkDocuments).where(eq(schema.paperworkDocuments.id, id));
    return result[0];
  }

  async getPaperworkDocumentsByClient(truckerClientId: string): Promise<PaperworkDocument[]> {
    return db.select().from(schema.paperworkDocuments).where(eq(schema.paperworkDocuments.truckerClientId, truckerClientId));
  }

  async updatePaperworkDocument(id: string, doc: Partial<InsertPaperworkDocument>): Promise<PaperworkDocument | undefined> {
    const result = await db.update(schema.paperworkDocuments).set(doc).where(eq(schema.paperworkDocuments.id, id)).returning();
    return result[0];
  }

  async deletePaperworkDocument(id: string): Promise<boolean> {
    const result = await db.delete(schema.paperworkDocuments).where(eq(schema.paperworkDocuments.id, id)).returning();
    return result.length > 0;
  }
}

export const storage = new DbStorage();
