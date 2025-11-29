import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Link } from "wouter";

interface FuelExpense {
  id: string;
  expenseDate: string;
  gallons: number;
  costPerGallon: number;
  totalCost: number;
  location?: string;
}

export default function FuelExpenses() {
  const [expenses, setExpenses] = useState<FuelExpense[]>([
    {
      id: "1",
      expenseDate: "2025-01-29",
      gallons: 60,
      costPerGallon: 3.45,
      totalCost: 207,
      location: "Love's Travel Stop - Ohio",
    },
    {
      id: "2",
      expenseDate: "2025-01-27",
      gallons: 70,
      costPerGallon: 3.42,
      totalCost: 239.4,
      location: "Pilot Flying J - Pennsylvania",
    },
  ]);
  const [formData, setFormData] = useState({
    expenseDate: new Date().toISOString().split("T")[0],
    gallons: "",
    costPerGallon: "",
    location: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.gallons || !formData.costPerGallon) return;

    const gallons = parseFloat(formData.gallons);
    const costPerGallon = parseFloat(formData.costPerGallon);
    const totalCost = gallons * costPerGallon;

    const newExpense: FuelExpense = {
      id: Date.now().toString(),
      expenseDate: formData.expenseDate,
      gallons,
      costPerGallon,
      totalCost,
      location: formData.location,
    };

    setExpenses([newExpense, ...expenses]);
    setFormData({
      expenseDate: new Date().toISOString().split("T")[0],
      gallons: "",
      costPerGallon: "",
      location: "",
    });
  };

  const handleDelete = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const totalCost = expenses.reduce((sum, e) => sum + e.totalCost, 0);
  const totalGallons = expenses.reduce((sum, e) => sum + e.gallons, 0);
  const avgCostPerGallon =
    totalGallons > 0 ? (totalCost / totalGallons).toFixed(2) : "0.00";

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/dashboard">
            <a className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <ArrowLeft className="h-6 w-6 text-muted-foreground" />
            </a>
          </Link>
          <div>
            <h1 className="text-4xl font-heading font-bold text-white">
              Fuel Expenses
            </h1>
            <p className="text-muted-foreground">
              Track all your fuel purchases and costs
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-1">
            <Card className="p-6 border-border">
              <h2 className="text-lg font-heading font-bold text-white mb-4">
                Log Fuel Expense
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-muted-foreground">
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.expenseDate}
                    onChange={(e) =>
                      setFormData({ ...formData, expenseDate: e.target.value })
                    }
                    data-testid="input-fuel-date"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gallons" className="text-muted-foreground">
                    Gallons
                  </Label>
                  <Input
                    id="gallons"
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                    value={formData.gallons}
                    onChange={(e) =>
                      setFormData({ ...formData, gallons: e.target.value })
                    }
                    data-testid="input-gallons"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="costPerGallon" className="text-muted-foreground">
                    Cost per Gallon
                  </Label>
                  <Input
                    id="costPerGallon"
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                    value={formData.costPerGallon}
                    onChange={(e) =>
                      setFormData({ ...formData, costPerGallon: e.target.value })
                    }
                    data-testid="input-cost-per-gallon"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-muted-foreground">
                    Location (Optional)
                  </Label>
                  <Input
                    id="location"
                    placeholder="e.g., Pilot Flying J"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    data-testid="input-location"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-lg"
                  data-testid="button-submit-fuel"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Log Fuel Expense
                </Button>
              </form>
            </Card>

            <Card className="p-6 border-border mt-4 bg-secondary/30">
              <div className="space-y-3">
                <div>
                  <p className="text-muted-foreground text-sm">Total Cost</p>
                  <p className="text-3xl font-bold text-white">
                    ${totalCost.toFixed(2)}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10">
                  <p className="text-muted-foreground text-sm">Avg $/Gallon</p>
                  <p className="text-xl font-bold text-white">
                    ${avgCostPerGallon}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Expenses List */}
          <div className="lg:col-span-2">
            <div className="space-y-3">
              {expenses.length > 0 ? (
                expenses.map((expense) => (
                  <Card
                    key={expense.id}
                    data-testid={`fuel-item-${expense.id}`}
                    className="p-4 border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="font-semibold text-white">
                              {expense.gallons} gal @ ${expense.costPerGallon}/gal
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Total: ${expense.totalCost.toFixed(2)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(expense.expenseDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        {expense.location && (
                          <p className="text-sm text-muted-foreground mt-2">
                            📍 {expense.location}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => handleDelete(expense.id)}
                        data-testid={`button-delete-${expense.id}`}
                        className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-5 w-5 text-destructive" />
                      </button>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-8 border-border text-center">
                  <p className="text-muted-foreground">No fuel expenses yet</p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
