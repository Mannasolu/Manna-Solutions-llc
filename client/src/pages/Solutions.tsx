import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/data";
import { ArrowRight, Check, Truck } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect } from "react";

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

export default function Solutions() {
  const [truckerTiers, setTruckerTiers] = useState<SubscriptionTier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscriptionTiers();
  }, []);

  const fetchSubscriptionTiers = async () => {
    try {
      const response = await fetch("/api/subscription-tiers");
      if (response.ok) {
        const data = await response.json();
        setTruckerTiers(data);
      }
    } catch (error) {
      console.error("Failed to fetch subscription tiers:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="bg-secondary/30 py-20 border-b border-white/5">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
            Our <span className="text-gradient">Expertise</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive AI and ML capabilities tailored to your business needs. From consultation to deployment.
          </p>
        </div>
      </div>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <div key={i} className="group relative p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <service.icon className="h-40 w-40" />
                </div>
                
                <div className={`h-14 w-14 rounded-2xl bg-background border border-border flex items-center justify-center mb-6 ${service.color} group-hover:scale-110 transition-transform shadow-lg`}>
                  <service.icon className="h-7 w-7" />
                </div>
                
                <h3 className="text-2xl font-heading font-bold text-white mb-4">{service.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed relative z-10">
                  {service.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  <Link href="/contact">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-xs font-medium text-primary border border-primary/20 hover:bg-primary/20 cursor-pointer transition-colors" data-testid={`use-case-${i}`}>
                      {service.useCase}
                    </span>
                  </Link>
                  <Link href="/contact">
                    <span className="px-3 py-1 rounded-full bg-secondary text-xs font-medium text-muted-foreground border border-white/5 hover:border-primary/50 cursor-pointer transition-colors">
                      Learn More
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 p-12 rounded-3xl bg-gradient-to-r from-primary/10 to-accent/10 border border-white/10 text-center">
            <h2 className="text-3xl font-heading font-bold text-white mb-4">Need a custom solution?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              We specialize in building bespoke models for unique business challenges. Let's discuss your specific requirements.
            </p>
            <Link href="/contact">
              <Button size="lg" className="rounded-full">
                Schedule a Consultation <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trucker Expense Tracking Solutions */}
      <section className="py-20 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Truck className="h-8 w-8 text-primary" data-testid="icon-truck" />
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white">
                Trucker Expense Tracking
              </h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Complete expense management solution for trucking professionals. Track mileage, fuel, maintenance, meals, and paperwork all in one place.
            </p>
          </div>

          {!loading && truckerTiers.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {truckerTiers.map((tier) => (
                <div
                  key={tier.id}
                  data-testid={`pricing-card-${tier.name.toLowerCase()}`}
                  className={`relative rounded-3xl p-8 border transition-all duration-300 ${
                    tier.order === 2
                      ? "border-primary/50 bg-gradient-to-b from-primary/10 to-background ring-2 ring-primary/20"
                      : "border-border bg-card hover:border-primary/30"
                  }`}
                >
                  {tier.order === 2 && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-primary to-accent text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-2xl font-heading font-bold text-white mb-2">
                      {tier.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {tier.description}
                    </p>
                  </div>

                  <div className="mb-8 py-6 border-t border-b border-white/10">
                    <div className="flex items-baseline gap-2 justify-center">
                      <span className="text-4xl font-heading font-bold text-white">
                        ${tier.finalPricePerMonth}
                      </span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      Base cost: ${tier.baseCostPerMonth} with 300% markup applied
                    </p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/dashboard">
                    <Button
                      size="lg"
                      className="w-full rounded-xl"
                      variant={tier.order === 2 ? "default" : "outline"}
                      data-testid={`button-select-${tier.name.toLowerCase()}`}
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading pricing information...</p>
            </div>
          )}

          <div className="mt-20 p-12 rounded-3xl bg-secondary/30 border border-white/5 text-center">
            <h3 className="text-2xl font-heading font-bold text-white mb-4">
              Ready to streamline your expense tracking?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start your free trial today and see how Manna Solutions' expense tracking can save you time and money.
            </p>
            <Link href="/login">
              <Button size="lg" className="rounded-full">
                Start Your Free Trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}