import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { ArrowLeft, Check, AlertCircle } from "lucide-react";
import { Link } from "wouter";

interface SubscriptionTier {
  id: string;
  name: string;
  description: string;
  baseCostPerMonth: string;
  finalPricePerMonth: string;
  markupPercentage: string;
  features: string[];
  order: number;
}

interface CurrentSubscription {
  tierId: string;
  tierName: string;
  startDate: string;
  nextBillingDate: string;
  status: "active" | "inactive";
}

export default function SubscriptionManagement() {
  const [tiers, setTiers] = useState<SubscriptionTier[]>([]);
  const [currentSubscription, setCurrentSubscription] = useState<CurrentSubscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscriptionData();
  }, []);

  const fetchSubscriptionData = async () => {
    try {
      const tiersResponse = await fetch("/api/subscription-tiers");
      if (tiersResponse.ok) {
        const tiersData = await tiersResponse.json();
        setTiers(tiersData);

        // Set mock current subscription
        setCurrentSubscription({
          tierId: tiersData?.[1]?.id || "",
          tierName: "Professional",
          startDate: "2024-12-01",
          nextBillingDate: "2025-02-01",
          status: "active",
        });
      }
    } catch (error) {
      console.error("Failed to fetch subscription data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = (tierId: string) => {
    console.log("Upgrading to tier:", tierId);
    // TODO: Implement upgrade functionality
  };

  const handleManageBilling = async () => {
    try {
      const response = await fetch("/api/stripe/billing-portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "user@mannasolutions.com" }),
      });
      if (response.ok) {
        const data = await response.json();
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Failed to access billing portal:", error);
    }
  };

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
              Subscription Management
            </h1>
            <p className="text-muted-foreground">
              Manage your subscription plan and billing
            </p>
          </div>
        </div>

        {/* Current Subscription */}
        {currentSubscription && (
          <Card
            data-testid="card-current-subscription"
            className="p-8 border-primary/50 bg-gradient-to-r from-primary/10 to-accent/10"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-heading font-bold text-white mb-2">
                  Current Plan: {currentSubscription.tierName}
                </h2>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-400"></div>
                  <p className="text-sm text-green-400">Active</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-muted-foreground text-sm">Next Billing Date</p>
                <p className="text-lg font-bold text-white">
                  {new Date(currentSubscription.nextBillingDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-muted-foreground text-sm">Start Date</p>
                <p className="text-lg font-semibold text-white">
                  {new Date(currentSubscription.startDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Plan Status</p>
                <p className="text-lg font-semibold text-white capitalize">
                  {currentSubscription.status}
                </p>
              </div>
            </div>

            <Button
              onClick={handleManageBilling}
              variant="outline"
              data-testid="button-manage-billing"
            >
              Manage Billing & Payment Methods
            </Button>
          </Card>
        )}

        {/* Available Plans */}
        <div className="space-y-4">
          <h2 className="text-2xl font-heading font-bold text-white">
            Available Plans
          </h2>
          <p className="text-muted-foreground">
            Upgrade or downgrade your subscription at any time
          </p>

          {!loading && tiers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tiers.map((tier) => {
                const isCurrentPlan = currentSubscription?.tierId === tier.id;
                return (
                  <Card
                    key={tier.id}
                    data-testid={`plan-card-${tier.name.toLowerCase()}`}
                    className={`p-6 border transition-all ${
                      isCurrentPlan
                        ? "border-primary ring-2 ring-primary/20 bg-primary/5"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-heading font-bold text-white">
                          {tier.name}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {tier.description}
                        </p>
                      </div>
                      {isCurrentPlan && (
                        <span className="inline-block px-3 py-1 rounded-full bg-primary text-white text-xs font-bold">
                          Current
                        </span>
                      )}
                    </div>

                    <div className="mb-6">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-white">
                          ${tier.finalPricePerMonth}
                        </span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Base: ${tier.baseCostPerMonth} + 300% markup
                      </p>
                    </div>

                    <div className="space-y-3 mb-6">
                      {tier.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground text-sm">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={() => handleUpgrade(tier.id)}
                      disabled={isCurrentPlan}
                      className="w-full rounded-lg"
                      variant={isCurrentPlan ? "outline" : "default"}
                      data-testid={`button-select-${tier.name.toLowerCase()}`}
                    >
                      {isCurrentPlan ? "Current Plan" : "Switch to " + tier.name}
                    </Button>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="p-8 border-border text-center">
              <p className="text-muted-foreground">Loading plans...</p>
            </Card>
          )}
        </div>

        {/* Billing Information */}
        <Card className="p-6 border-border">
          <h3 className="text-lg font-heading font-bold text-white mb-4 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            Billing Information
          </h3>
          <div className="space-y-3 text-muted-foreground text-sm">
            <p>
              • Your subscription will renew automatically on your next billing date
            </p>
            <p>
              • You can change or cancel your plan at any time without penalties
            </p>
            <p>
              • Unused credits will not be refunded when downgrading
            </p>
            <p>
              • All prices are in USD and exclude applicable taxes
            </p>
          </div>
        </Card>

        {/* Support */}
        <Card className="p-6 bg-secondary/30 border-border">
          <h3 className="text-lg font-heading font-bold text-white mb-2">
            Need Help?
          </h3>
          <p className="text-muted-foreground mb-4">
            Have questions about our plans or need to make changes to your subscription?
          </p>
          <Link href="/contact">
            <Button variant="outline" data-testid="button-contact-support">
              Contact Support
            </Button>
          </Link>
        </Card>
      </div>
    </DashboardLayout>
  );
}
