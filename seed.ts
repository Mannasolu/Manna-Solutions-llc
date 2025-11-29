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

  // Seed Trucker Expense Tracking Subscription Tiers with 300% markup
  // Formula: finalPrice = baseCost * (1 + 3.0) = baseCost * 4
  const subscriptionTiers = [
    {
      name: "Basic",
      description: "Essential expense tracking for truckers",
      baseCostPerMonth: "29.00",
      markupPercentage: "300",
      finalPricePerMonth: "116.00", // 29 * 4
      features: ["Mileage tracking", "Fuel expense logs", "Basic reporting"],
      order: 1,
    },
    {
      name: "Professional",
      description: "Comprehensive expense management",
      baseCostPerMonth: "59.00",
      markupPercentage: "300",
      finalPricePerMonth: "236.00", // 59 * 4
      features: [
        "Mileage tracking",
        "Fuel expense logs",
        "Maintenance tracking",
        "Food/meal expenses",
        "Advanced reporting",
        "Monthly summaries",
      ],
      order: 2,
    },
    {
      name: "Enterprise",
      description: "Complete solution with documentation",
      baseCostPerMonth: "99.00",
      markupPercentage: "300",
      finalPricePerMonth: "396.00", // 99 * 4
      features: [
        "Mileage tracking",
        "Fuel expense logs",
        "Maintenance tracking",
        "Food/meal expenses",
        "Paperwork/documentation",
        "Advanced reporting",
        "Monthly summaries",
        "Priority support",
        "Custom integrations",
      ],
      order: 3,
    },
  ];

  await db.insert(schema.subscriptionTiers).values(subscriptionTiers);

  console.log("✓ Database seeded successfully");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
