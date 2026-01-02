import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, Truck, Check, Building2, Users, ClipboardList } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";

interface FormData {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  fleetSize: number;
  operationType: string;
  trackingFeatures: string[];
}

interface SubscriptionTier {
  id: string;
  name: string;
  description: string;
  baseCostPerMonth: string;
  finalPricePerMonth: string;
  features: string[];
  order: number;
}

const trackingOptions = [
  { id: "mileage", label: "Mileage Tracking", description: "Log daily miles driven", tier: "basic" },
  { id: "fuel", label: "Fuel Expenses", description: "Track fuel purchases and costs", tier: "basic" },
  { id: "maintenance", label: "Maintenance Expenses", description: "Record repairs and maintenance costs", tier: "professional" },
  { id: "food", label: "Food & Meal Expenses", description: "Track per diem and meal costs", tier: "professional" },
  { id: "paperwork", label: "Paperwork Management", description: "Store receipts and documents", tier: "enterprise" },
];

const operationTypes = [
  { value: "owner-operator", label: "Owner-Operator", description: "Single truck, independent" },
  { value: "small-fleet", label: "Small Fleet", description: "2-10 trucks" },
  { value: "large-fleet", label: "Large Fleet", description: "10+ trucks" },
];

export default function TruckerOnboarding() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [tiers, setTiers] = useState<SubscriptionTier[]>([]);
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    fleetSize: 1,
    operationType: "owner-operator",
    trackingFeatures: ["mileage", "fuel"],
  });

  useEffect(() => {
    fetchTiers();
  }, []);

  const fetchTiers = async () => {
    try {
      const response = await fetch("/api/subscription-tiers");
      if (response.ok) {
        const data = await response.json();
        setTiers(data);
      }
    } catch (error) {
      console.error("Failed to fetch tiers:", error);
    }
  };

  const getRecommendedTier = (): SubscriptionTier | null => {
    if (tiers.length === 0) return null;
    
    const features = formData.trackingFeatures;
    const hasPaperwork = features.includes("paperwork");
    const hasMaintenanceOrFood = features.includes("maintenance") || features.includes("food");
    const hasMileage = features.includes("mileage");
    const hasFuel = features.includes("fuel");

    if (hasPaperwork) {
      return tiers.find(t => t.name === "Enterprise") || null;
    } else if (hasMaintenanceOrFood) {
      return tiers.find(t => t.name === "Professional") || null;
    } else if (hasMileage || hasFuel) {
      return tiers.find(t => t.name === "Basic") || null;
    } else {
      return tiers.find(t => t.name === "Basic") || null;
    }
  };

  const handleFeatureToggle = (featureId: string) => {
    setFormData(prev => {
      const current = prev.trackingFeatures;
      if (current.includes(featureId)) {
        return { ...prev, trackingFeatures: current.filter(f => f !== featureId) };
      } else {
        return { ...prev, trackingFeatures: [...current, featureId] };
      }
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const recommendedTier = getRecommendedTier();
    
    try {
      const response = await fetch("/api/trucker-clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: formData.companyName,
          contactPerson: formData.contactPerson,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          fleetSize: formData.fleetSize,
          operationType: formData.operationType,
          trackingFeatures: formData.trackingFeatures,
          subscriptionTierId: recommendedTier?.id,
        }),
      });

      if (response.ok) {
        setLocation("/dashboard");
      } else {
        console.error("Failed to create account");
      }
    } catch (error) {
      console.error("Error creating account:", error);
    } finally {
      setLoading(false);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.companyName && formData.email;
      case 2:
        return formData.operationType;
      case 3:
        return formData.trackingFeatures.length > 0;
      default:
        return true;
    }
  };

  const recommendedTier = getRecommendedTier();

  return (
    <Layout>
      <div className="bg-secondary/30 py-12 border-b border-white/5">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Truck className="h-8 w-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-white">
              Get Started with Expense Tracking
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tell us about your trucking operation and we'll recommend the best plan for your needs.
          </p>
        </div>
      </div>

      <section className="py-12">
        <div className="container mx-auto px-6 max-w-2xl">
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-12">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                    step >= s
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {step > s ? <Check className="h-5 w-5" /> : s}
                </div>
                {s < 4 && (
                  <div
                    className={`w-12 h-1 mx-2 rounded ${
                      step > s ? "bg-primary" : "bg-secondary"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Business Info */}
          {step === 1 && (
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Building2 className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle className="text-white">Business Information</CardTitle>
                    <CardDescription>Tell us about your trucking company</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      placeholder="Your Company LLC"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      data-testid="input-company-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">Contact Person</Label>
                    <Input
                      id="contactPerson"
                      placeholder="John Smith"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      data-testid="input-contact-person"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      data-testid="input-email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      data-testid="input-phone"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Input
                    id="address"
                    placeholder="123 Main St, City, State"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    data-testid="input-address"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Fleet Info */}
          {step === 2 && (
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle className="text-white">Fleet Information</CardTitle>
                    <CardDescription>Tell us about your operation size</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fleetSize">Number of Trucks</Label>
                  <Input
                    id="fleetSize"
                    type="number"
                    min={1}
                    value={formData.fleetSize}
                    onChange={(e) => setFormData({ ...formData, fleetSize: parseInt(e.target.value) || 1 })}
                    data-testid="input-fleet-size"
                  />
                </div>
                <div className="space-y-4">
                  <Label>Operation Type</Label>
                  <RadioGroup
                    value={formData.operationType}
                    onValueChange={(value) => setFormData({ ...formData, operationType: value })}
                  >
                    {operationTypes.map((type) => (
                      <div
                        key={type.value}
                        className="flex items-center space-x-3 p-4 rounded-xl border border-white/10 hover:border-primary/50 transition-colors cursor-pointer"
                      >
                        <RadioGroupItem value={type.value} id={type.value} />
                        <Label htmlFor={type.value} className="flex-1 cursor-pointer">
                          <div className="font-medium text-white">{type.label}</div>
                          <div className="text-sm text-muted-foreground">{type.description}</div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Feature Selection */}
          {step === 3 && (
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <ClipboardList className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle className="text-white">What do you want to track?</CardTitle>
                    <CardDescription>Select the features you need for your business</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {trackingOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`flex items-start space-x-3 p-4 rounded-xl border transition-colors cursor-pointer ${
                      formData.trackingFeatures.includes(option.id)
                        ? "border-primary bg-primary/10"
                        : "border-white/10 hover:border-primary/50"
                    }`}
                    onClick={() => handleFeatureToggle(option.id)}
                  >
                    <Checkbox
                      id={option.id}
                      checked={formData.trackingFeatures.includes(option.id)}
                      data-testid={`checkbox-${option.id}`}
                    />
                    <div className="flex-1">
                      <Label className="font-medium text-white cursor-pointer">
                        {option.label}
                        {option.tier === "professional" && (
                          <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">
                            Professional
                          </span>
                        )}
                        {option.tier === "enterprise" && (
                          <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400">
                            Enterprise
                          </span>
                        )}
                      </Label>
                      <div className="text-sm text-muted-foreground">{option.description}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Step 4: Recommended Plan */}
          {step === 4 && !recommendedTier && (
            <Card className="bg-card border-border">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Unable to load pricing information. Please try again later.</p>
                <Button className="mt-4" onClick={() => fetchTiers()}>Retry</Button>
              </CardContent>
            </Card>
          )}
          {step === 4 && recommendedTier && (
            <Card className="bg-card border-border">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white">Your Recommended Plan</CardTitle>
                <CardDescription>Based on your tracking needs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 text-center">
                  <h3 className="text-3xl font-heading font-bold text-white mb-2">
                    {recommendedTier.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">{recommendedTier.description}</p>
                  <div className="flex items-baseline justify-center gap-2 mb-6">
                    <span className="text-5xl font-heading font-bold text-white">
                      ${recommendedTier.finalPricePerMonth}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <ul className="text-left space-y-3 max-w-sm mx-auto">
                    {recommendedTier.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-secondary/30 border border-white/5">
                  <h4 className="font-medium text-white mb-2">Account Summary</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p><strong>Company:</strong> {formData.companyName}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Fleet Size:</strong> {formData.fleetSize} truck(s)</p>
                    <p><strong>Tracking:</strong> {formData.trackingFeatures.join(", ")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                className="gap-2"
                data-testid="button-back"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="gap-2"
                data-testid="button-next"
              >
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="gap-2"
                data-testid="button-submit"
              >
                {loading ? "Creating Account..." : "Start Tracking"} <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
