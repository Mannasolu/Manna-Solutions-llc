import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Navigation,
  MapPin,
  Fuel,
  Wrench,
  UtensilsCrossed,
  FileText,
  CreditCard,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Upload,
} from "lucide-react";
import { useState, useEffect } from "react";

interface ExpenseSummary {
  totalMileage: number;
  totalFuelCost: number;
  totalMaintenanceCost: number;
  totalFoodCost: number;
  monthlyExpenses: number;
}

export default function TruckerDashboard() {
  const [summary, setSummary] = useState<ExpenseSummary>({
    totalMileage: 0,
    totalFuelCost: 0,
    totalMaintenanceCost: 0,
    totalFoodCost: 0,
    monthlyExpenses: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // TODO: Load actual data from API when authenticated
      // For now, show placeholder data
      setSummary({
        totalMileage: 12450,
        totalFuelCost: 2840.50,
        totalMaintenanceCost: 450,
        totalFoodCost: 320,
        monthlyExpenses: 3610.50,





      });
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    {
      icon: MapPin,
      label: "Mileage Tracking",
      description: "Log and track your miles driven",
      href: "/dashboard/mileage",
      color: "text-blue-400",
    },
    {
      icon: Fuel,
      label: "Fuel Expenses",
      description: "Record fuel purchases and costs",
      href: "/dashboard/fuel",
      color: "text-yellow-400",
    },
    {
      icon: Wrench,
      label: "Maintenance",
      description: "Track maintenance and repairs",
      href: "/dashboard/maintenance",
      color: "text-orange-400",
    },
    {
      icon: UtensilsCrossed,
      label: "Food Expenses",
      description: "Log meal and food expenses",
      href: "/dashboard/food",
      color: "text-green-400",
    },
    {
      icon: FileText,
      label: "Paperwork",
      description: "Manage documents and receipts",
      href: "/dashboard/paperwork",
      color: "text-purple-400",
    },
    {
      icon: Upload,
      label: "Document Extractor",
      description: "Upload receipts to log expenses",
      href: "/dashboard/extract",
      color: "text-cyan-400",
    },
    {
      icon: CreditCard,
      label: "Subscription",
      description: "Manage your subscription plan",
      href: "/dashboard/subscription",
      color: "text-pink-400",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-heading font-bold text-white">
            Trucker Expense Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track and manage all your trucking expenses in one place
          </p>
        </div>

        {/* Expense Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card
            data-testid="card-total-mileage"
            className="p-6 border-border hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">
                  Total Mileage
                </p>
                <p className="text-3xl font-bold text-white">
                  {summary.totalMileage.toLocaleString()}
                </p>
                <p className="text-muted-foreground text-xs mt-2">miles</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-blue-400/10 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </Card>

          <Card
            data-testid="card-total-fuel-cost"
            className="p-6 border-border hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">
                  Fuel Expenses
                </p>
                <p className="text-3xl font-bold text-white">
                  ${summary.totalFuelCost.toFixed(2)}
                </p>
                <p className="text-muted-foreground text-xs mt-2">this month</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-yellow-400/10 flex items-center justify-center">
                <Fuel className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </Card>

          <Card
            data-testid="card-monthly-total"
            className="p-6 border-border hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">
                  Monthly Total
                </p>
                <p className="text-3xl font-bold text-white">
                  ${summary.monthlyExpenses.toFixed(2)}
                </p>
                <p className="text-muted-foreground text-xs mt-2">all expenses</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-green-400/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Access Menu */}
        <div className="space-y-4">
          <h2 className="text-xl font-heading font-bold text-white">
            Quick Access
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <a
                    data-testid={`link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                    className="block p-6 rounded-2xl border border-border bg-card hover:border-primary/50 hover:bg-secondary/30 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`h-10 w-10 rounded-lg bg-secondary flex items-center justify-center`}>
                        <Icon className={`h-6 w-6 ${item.color}`} />
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="font-heading font-bold text-white mb-1">
                      {item.label}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </a>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Additional Resources */}
        <Card className="p-8 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-heading font-bold text-white mb-2">
                Generate Expense Reports
              </h3>
              <p className="text-muted-foreground mb-4">
                Create detailed expense reports for tax deductions and business
                analysis
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-primary flex-shrink-0" />
          </div>
          <Button className="mt-4 rounded-lg" data-testid="button-generate-report">
            Generate Report <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Card>
      </div>
    </DashboardLayout>
  );
}
