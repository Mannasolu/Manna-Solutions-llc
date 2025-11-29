import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Link } from "wouter";

interface FoodExpense {
  id: string;
  expenseDate: string;
  description: string;
  cost: number;
  location?: string;
}

export default function FoodExpenses() {
  const [expenses, setExpenses] = useState<FoodExpense[]>([
    {
      id: "1",
      expenseDate: "2025-01-29",
      description: "Breakfast at truck stop",
      cost: 12.50,
      location: "Pilot Flying J",
    },
    {
      id: "2",
      expenseDate: "2025-01-28",
      description: "Lunch and dinner",
      cost: 28.75,
      location: "Local diner",
    },
  ]);
  const [formData, setFormData] = useState({
    expenseDate: new Date().toISOString().split("T")[0],
    description: "",
    cost: "",
    location: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description || !formData.cost) return;

    const newExpense: FoodExpense = {
      id: Date.now().toString(),
      expenseDate: formData.expenseDate,
      description: formData.description,
      cost: parseFloat(formData.cost),
      location: formData.location,
    };

    setExpenses([newExpense, ...expenses]);
    setFormData({
      expenseDate: new Date().toISOString().split("T")[0],
      description: "",
      cost: "",
      location: "",
    });
  };

  const handleDelete = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const totalCost = expenses.reduce((sum, e) => sum + e.cost, 0);

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
              Food Expenses
            </h1>
            <p className="text-muted-foreground">
              Track your meal and food expenses
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-1">
            <Card className="p-6 border-border">
              <h2 className="text-lg font-heading font-bold text-white mb-4">
                Log Food Expense
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
                    data-testid="input-food-date"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-muted-foreground">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="What did you eat? (e.g., breakfast, lunch, dinner)"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    data-testid="input-food-description"
                    className="resize-none"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cost" className="text-muted-foreground">
                    Cost
                  </Label>
                  <Input
                    id="cost"
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                    value={formData.cost}
                    onChange={(e) =>
                      setFormData({ ...formData, cost: e.target.value })
                    }
                    data-testid="input-food-cost"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-muted-foreground">
                    Location (Optional)
                  </Label>
                  <Input
                    id="location"
                    placeholder="Restaurant or truck stop"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    data-testid="input-food-location"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-lg"
                  data-testid="button-submit-food"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Log Food Expense
                </Button>
              </form>
            </Card>

            <Card className="p-6 border-border mt-4 bg-secondary/30">
              <p className="text-muted-foreground text-sm">Total Spent</p>
              <p className="text-3xl font-bold text-white">
                ${totalCost.toFixed(2)}
              </p>
            </Card>
          </div>

          {/* Expenses List */}
          <div className="lg:col-span-2">
            <div className="space-y-3">
              {expenses.length > 0 ? (
                expenses.map((expense) => (
                  <Card
                    key={expense.id}
                    data-testid={`food-item-${expense.id}`}
                    className="p-4 border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="font-semibold text-white">
                              {expense.description}
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
                        <p className="text-lg font-bold text-white mt-2">
                          ${expense.cost.toFixed(2)}
                        </p>
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
                  <p className="text-muted-foreground">No food expenses yet</p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
