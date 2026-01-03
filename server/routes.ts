import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertProjectSchema, insertContactSchema, insertDemoRequestSchema,
  insertSubscriptionTierSchema, insertTruckerClientSchema,
  insertMileageLogSchema, insertFuelExpenseSchema,
  insertMaintenanceExpenseSchema, insertFoodExpenseSchema,
  insertPaperworkDocumentSchema, insertReceiptImageSchema
} from "@shared/schema";
import { z } from "zod";
import { getUncachableStripeClient, getStripePublishableKey } from "./stripeClient";
import { registerExtractionRoutes } from "./replit_integrations/extraction";
import { registerObjectStorageRoutes } from "./replit_integrations/object_storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Projects endpoints
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.getProject(req.params.id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const validated = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validated);
      res.status(201).json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid project data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create project" });
    }
  });

  app.patch("/api/projects/:id", async (req, res) => {
    try {
      const validated = insertProjectSchema.partial().parse(req.body);
      const project = await storage.updateProject(req.params.id, validated);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid project data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update project" });
    }
  });

  app.delete("/api/projects/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteProject(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json({ message: "Project deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete project" });
    }
  });

  // Contacts endpoint
  app.post("/api/contacts", async (req, res) => {
    try {
      const validated = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validated);
      res.status(201).json(contact);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid contact data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create contact" });
    }
  });

  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  // Stripe billing portal
  // NOTE: In production, this endpoint should require authentication and use the
  // authenticated user's stripeCustomerId from the users table
  app.post("/api/stripe/billing-portal", async (req, res) => {
    try {
      const stripe = await getUncachableStripeClient();
      const { email } = req.body;
      
      // Look up customer by email - in production, use authenticated user's stripeCustomerId
      let customerId: string | undefined;
      
      if (email) {
        const customers = await stripe.customers.list({ email, limit: 1 });
        if (customers.data.length > 0) {
          customerId = customers.data[0].id;
        }
      }
      
      // If no customer found, create one with the provided email
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: email || "demo@mannasolutions.com",
          name: "Manna Solutions User",
        });
        customerId = customer.id;
      }

      const returnUrl = req.headers.origin || `https://${req.get('host')}`;
      
      const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: `${returnUrl}/dashboard/settings`,
      });

      res.json({ url: session.url });
    } catch (error: any) {
      console.error("Billing portal error:", error);
      res.status(500).json({ message: "Failed to create billing portal session" });
    }
  });

  // Get Stripe publishable key for frontend
  app.get("/api/stripe/config", async (req, res) => {
    try {
      const publishableKey = await getStripePublishableKey();
      res.json({ publishableKey });
    } catch (error) {
      res.status(500).json({ message: "Failed to get Stripe config" });
    }
  });

  // Demo Requests endpoints
  app.post("/api/demo-requests", async (req, res) => {
    try {
      const validated = insertDemoRequestSchema.parse(req.body);
      const demoRequest = await storage.createDemoRequest(validated);
      res.status(201).json(demoRequest);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid demo request data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create demo request" });
    }
  });

  app.get("/api/demo-requests", async (req, res) => {
    try {
      const demoRequests = await storage.getAllDemoRequests();
      res.json(demoRequests);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch demo requests" });
    }
  });

  // Trucker Expense Tracking Endpoints

  // Subscription Tiers
  app.get("/api/subscription-tiers", async (req, res) => {
    try {
      const tiers = await storage.getAllSubscriptionTiers();
      res.json(tiers);
    } catch (error) {
      console.error("Subscription tiers error:", error);
      res.status(500).json({ message: "Failed to fetch subscription tiers", error: String(error) });
    }
  });

  app.get("/api/subscription-tiers/:id", async (req, res) => {
    try {
      const tier = await storage.getSubscriptionTier(req.params.id);
      if (!tier) {
        return res.status(404).json({ message: "Subscription tier not found" });
      }
      res.json(tier);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subscription tier" });
    }
  });

  app.post("/api/subscription-tiers", async (req, res) => {
    try {
      const validated = insertSubscriptionTierSchema.parse(req.body);
      const tier = await storage.createSubscriptionTier(validated);
      res.status(201).json(tier);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid subscription tier data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create subscription tier" });
    }
  });

  // Trucker Clients
  app.post("/api/trucker-clients", async (req, res) => {
    try {
      const validated = insertTruckerClientSchema.parse(req.body);
      const client = await storage.createTruckerClient(validated);
      res.status(201).json(client);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid trucker client data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create trucker client" });
    }
  });

  app.get("/api/trucker-clients/:id", async (req, res) => {
    try {
      const client = await storage.getTruckerClient(req.params.id);
      if (!client) {
        return res.status(404).json({ message: "Trucker client not found" });
      }
      res.json(client);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch trucker client" });
    }
  });

  app.get("/api/trucker-clients", async (req, res) => {
    try {
      const clients = await storage.getAllTruckerClients();
      res.json(clients);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch trucker clients" });
    }
  });

  app.patch("/api/trucker-clients/:id", async (req, res) => {
    try {
      const validated = insertTruckerClientSchema.partial().parse(req.body);
      const client = await storage.updateTruckerClient(req.params.id, validated);
      if (!client) {
        return res.status(404).json({ message: "Trucker client not found" });
      }
      res.json(client);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid trucker client data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update trucker client" });
    }
  });

  // Mileage Logs
  app.post("/api/mileage-logs", async (req, res) => {
    try {
      const validated = insertMileageLogSchema.parse(req.body);
      const log = await storage.createMileageLog(validated);
      res.status(201).json(log);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid mileage log data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create mileage log" });
    }
  });

  app.get("/api/mileage-logs/:id", async (req, res) => {
    try {
      const log = await storage.getMileageLog(req.params.id);
      if (!log) {
        return res.status(404).json({ message: "Mileage log not found" });
      }
      res.json(log);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch mileage log" });
    }
  });

  app.get("/api/mileage-logs/client/:truckerClientId", async (req, res) => {
    try {
      const logs = await storage.getMileageLogsByClient(req.params.truckerClientId);
      res.json(logs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch mileage logs" });
    }
  });

  app.patch("/api/mileage-logs/:id", async (req, res) => {
    try {
      const validated = insertMileageLogSchema.partial().parse(req.body);
      const log = await storage.updateMileageLog(req.params.id, validated);
      if (!log) {
        return res.status(404).json({ message: "Mileage log not found" });
      }
      res.json(log);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid mileage log data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update mileage log" });
    }
  });

  app.delete("/api/mileage-logs/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteMileageLog(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Mileage log not found" });
      }
      res.json({ message: "Mileage log deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete mileage log" });
    }
  });

  // Fuel Expenses
  app.post("/api/fuel-expenses", async (req, res) => {
    try {
      const validated = insertFuelExpenseSchema.parse(req.body);
      const expense = await storage.createFuelExpense(validated);
      res.status(201).json(expense);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid fuel expense data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create fuel expense" });
    }
  });

  app.get("/api/fuel-expenses/:id", async (req, res) => {
    try {
      const expense = await storage.getFuelExpense(req.params.id);
      if (!expense) {
        return res.status(404).json({ message: "Fuel expense not found" });
      }
      res.json(expense);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch fuel expense" });
    }
  });

  app.get("/api/fuel-expenses/client/:truckerClientId", async (req, res) => {
    try {
      const expenses = await storage.getFuelExpensesByClient(req.params.truckerClientId);
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch fuel expenses" });
    }
  });

  app.patch("/api/fuel-expenses/:id", async (req, res) => {
    try {
      const validated = insertFuelExpenseSchema.partial().parse(req.body);
      const expense = await storage.updateFuelExpense(req.params.id, validated);
      if (!expense) {
        return res.status(404).json({ message: "Fuel expense not found" });
      }
      res.json(expense);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid fuel expense data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update fuel expense" });
    }
  });

  app.delete("/api/fuel-expenses/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteFuelExpense(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Fuel expense not found" });
      }
      res.json({ message: "Fuel expense deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete fuel expense" });
    }
  });

  // Maintenance Expenses
  app.post("/api/maintenance-expenses", async (req, res) => {
    try {
      const validated = insertMaintenanceExpenseSchema.parse(req.body);
      const expense = await storage.createMaintenanceExpense(validated);
      res.status(201).json(expense);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid maintenance expense data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create maintenance expense" });
    }
  });

  app.get("/api/maintenance-expenses/:id", async (req, res) => {
    try {
      const expense = await storage.getMaintenanceExpense(req.params.id);
      if (!expense) {
        return res.status(404).json({ message: "Maintenance expense not found" });
      }
      res.json(expense);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch maintenance expense" });
    }
  });

  app.get("/api/maintenance-expenses/client/:truckerClientId", async (req, res) => {
    try {
      const expenses = await storage.getMaintenanceExpensesByClient(req.params.truckerClientId);
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch maintenance expenses" });
    }
  });

  app.patch("/api/maintenance-expenses/:id", async (req, res) => {
    try {
      const validated = insertMaintenanceExpenseSchema.partial().parse(req.body);
      const expense = await storage.updateMaintenanceExpense(req.params.id, validated);
      if (!expense) {
        return res.status(404).json({ message: "Maintenance expense not found" });
      }
      res.json(expense);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid maintenance expense data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update maintenance expense" });
    }
  });

  app.delete("/api/maintenance-expenses/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteMaintenanceExpense(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Maintenance expense not found" });
      }
      res.json({ message: "Maintenance expense deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete maintenance expense" });
    }
  });

  // Food Expenses
  app.post("/api/food-expenses", async (req, res) => {
    try {
      const validated = insertFoodExpenseSchema.parse(req.body);
      const expense = await storage.createFoodExpense(validated);
      res.status(201).json(expense);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid food expense data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create food expense" });
    }
  });

  app.get("/api/food-expenses/:id", async (req, res) => {
    try {
      const expense = await storage.getFoodExpense(req.params.id);
      if (!expense) {
        return res.status(404).json({ message: "Food expense not found" });
      }
      res.json(expense);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch food expense" });
    }
  });

  app.get("/api/food-expenses/client/:truckerClientId", async (req, res) => {
    try {
      const expenses = await storage.getFoodExpensesByClient(req.params.truckerClientId);
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch food expenses" });
    }
  });

  app.patch("/api/food-expenses/:id", async (req, res) => {
    try {
      const validated = insertFoodExpenseSchema.partial().parse(req.body);
      const expense = await storage.updateFoodExpense(req.params.id, validated);
      if (!expense) {
        return res.status(404).json({ message: "Food expense not found" });
      }
      res.json(expense);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid food expense data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update food expense" });
    }
  });

  app.delete("/api/food-expenses/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteFoodExpense(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Food expense not found" });
      }
      res.json({ message: "Food expense deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete food expense" });
    }
  });

  // Paperwork Documents
  app.post("/api/paperwork-documents", async (req, res) => {
    try {
      const validated = insertPaperworkDocumentSchema.parse(req.body);
      const doc = await storage.createPaperworkDocument(validated);
      res.status(201).json(doc);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid paperwork document data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create paperwork document" });
    }
  });

  app.get("/api/paperwork-documents/:id", async (req, res) => {
    try {
      const doc = await storage.getPaperworkDocument(req.params.id);
      if (!doc) {
        return res.status(404).json({ message: "Paperwork document not found" });
      }
      res.json(doc);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch paperwork document" });
    }
  });

  app.get("/api/paperwork-documents/client/:truckerClientId", async (req, res) => {
    try {
      const docs = await storage.getPaperworkDocumentsByClient(req.params.truckerClientId);
      res.json(docs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch paperwork documents" });
    }
  });

  app.patch("/api/paperwork-documents/:id", async (req, res) => {
    try {
      const validated = insertPaperworkDocumentSchema.partial().parse(req.body);
      const doc = await storage.updatePaperworkDocument(req.params.id, validated);
      if (!doc) {
        return res.status(404).json({ message: "Paperwork document not found" });
      }
      res.json(doc);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid paperwork document data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update paperwork document" });
    }
  });

  app.delete("/api/paperwork-documents/:id", async (req, res) => {
    try {
      const deleted = await storage.deletePaperworkDocument(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Paperwork document not found" });
      }
      res.json({ message: "Paperwork document deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete paperwork document" });
    }
  });

  // Register AI extraction routes
  registerExtractionRoutes(app);

  // Register object storage routes for file uploads
  registerObjectStorageRoutes(app);

  // Receipt image storage endpoints
  app.post("/api/receipt-images", async (req, res) => {
    try {
      const validated = insertReceiptImageSchema.parse(req.body);
      const image = await storage.createReceiptImage(validated);
      res.status(201).json(image);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid receipt image data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to save receipt image" });
    }
  });

  app.get("/api/receipt-images", async (req, res) => {
    try {
      const truckerClientId = req.query.truckerClientId as string;
      if (!truckerClientId) {
        return res.status(400).json({ message: "truckerClientId is required" });
      }
      const images = await storage.getReceiptImagesByClient(truckerClientId);
      res.json(images);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch receipt images" });
    }
  });

  app.get("/api/storage-pricing", async (req, res) => {
    res.json({
      pricePerImagePerMonth: 0.05,
      description: "Receipt image storage - $0.05 per image per month",
      features: [
        "Secure cloud storage for your receipt images",
        "Access anytime from any device",
        "Automatic backup and recovery",
        "Links receipts to your expense records"
      ]
    });
  });

  app.get("/api/storage-usage", async (req, res) => {
    try {
      const truckerClientId = req.query.truckerClientId as string;
      if (!truckerClientId) {
        return res.status(400).json({ message: "truckerClientId is required" });
      }
      const usage = await storage.getStorageUsage(truckerClientId);
      res.json(usage);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch storage usage" });
    }
  });

  return httpServer;
}
