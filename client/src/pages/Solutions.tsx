import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Solutions() {
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
    </Layout>
  );
}
