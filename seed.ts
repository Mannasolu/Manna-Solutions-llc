import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./shared/schema";

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client, { schema });

async function seed() {
  console.log("Seeding database...");
  
  await db.insert(schema.projects).values([
    {
      name: "Retail Demand Forecasting",
      client: "GlobalRetail Inc.",
      status: "Active",
      progress: 75,
      dueDate: "2024-12-15",
      description: "Implementing LSTM models to predict inventory requirements across 500+ store locations."
    },
    {
      name: "Customer Sentiment Analysis",
      client: "TechFlow Solutions",
      status: "Completed",
      progress: 100,
      dueDate: "2024-10-30",
      description: "Deployed NLP pipeline for real-time analysis of customer support tickets and social media mentions."
    },
    {
      name: "Quality Control Vision System",
      client: "AutoMfg Corp",
      status: "In Review",
      progress: 90,
      dueDate: "2024-11-20",
      description: "Computer vision system for defect detection on the assembly line using edge computing."
    }
  ]);

  console.log("Database seeded successfully");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
