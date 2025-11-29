import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Link } from "wouter";

interface MileageLog {
  id: string;
  logDate: string;
  milesDriven: number;
  notes?: string;
}

export default function MileageTracking() {
  const [logs, setLogs] = useState<MileageLog[]>([
    { id: "1", logDate: "2025-01-29", milesDriven: 245, notes: "Interstate delivery" },
    { id: "2", logDate: "2025-01-28", milesDriven: 180, notes: "Local pickups" },
  ]);
  const [formData, setFormData] = useState({
    logDate: new Date().toISOString().split("T")[0],
    milesDriven: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.milesDriven) return;

    const newLog: MileageLog = {
      id: Date.now().toString(),
      logDate: formData.logDate,
      milesDriven: parseFloat(formData.milesDriven),
      notes: formData.notes,
    };

    setLogs([newLog, ...logs]);
    setFormData({
      logDate: new Date().toISOString().split("T")[0],
      milesDriven: "",
      notes: "",
    });
  };

  const handleDelete = (id: string) => {
    setLogs(logs.filter((log) => log.id !== id));
  };

  const totalMiles = logs.reduce((sum, log) => sum + log.milesDriven, 0);

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
              Mileage Tracking
            </h1>
            <p className="text-muted-foreground">
              Log your daily miles and track driving distance
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-1">
            <Card className="p-6 border-border">
              <h2 className="text-lg font-heading font-bold text-white mb-4">
                Log Mileage
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-muted-foreground">
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.logDate}
                    onChange={(e) =>
                      setFormData({ ...formData, logDate: e.target.value })
                    }
                    data-testid="input-log-date"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="miles" className="text-muted-foreground">
                    Miles Driven
                  </Label>
                  <Input
                    id="miles"
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                    value={formData.milesDriven}
                    onChange={(e) =>
                      setFormData({ ...formData, milesDriven: e.target.value })
                    }
                    data-testid="input-miles-driven"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-muted-foreground">
                    Notes (Optional)
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any notes about this trip..."
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    data-testid="input-notes"
                    className="resize-none"
                    rows={3}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-lg"
                  data-testid="button-submit-mileage"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Log Mileage
                </Button>
              </form>
            </Card>

            <Card className="p-6 border-border mt-4 bg-secondary/30">
              <p className="text-muted-foreground text-sm mb-2">Total Miles</p>
              <p className="text-3xl font-bold text-white">
                {totalMiles.toLocaleString()}
              </p>
            </Card>
          </div>

          {/* Logs List */}
          <div className="lg:col-span-2">
            <div className="space-y-3">
              {logs.length > 0 ? (
                logs.map((log) => (
                  <Card
                    key={log.id}
                    data-testid={`log-item-${log.id}`}
                    className="p-4 border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="font-semibold text-white">
                              {log.milesDriven} miles
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(log.logDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        {log.notes && (
                          <p className="text-sm text-muted-foreground mt-2">
                            {log.notes}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => handleDelete(log.id)}
                        data-testid={`button-delete-${log.id}`}
                        className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-5 w-5 text-destructive" />
                      </button>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-8 border-border text-center">
                  <p className="text-muted-foreground">No mileage logs yet</p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
