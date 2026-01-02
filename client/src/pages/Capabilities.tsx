import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Shield, Award, MapPin, Phone, Mail, Globe, CheckCircle } from "lucide-react";
import { Link } from "wouter";

export default function Capabilities() {
  const coreCompetencies = [
    "Supervised & unsupervised model development (classification, regression, clustering)",
    "NLP: entity extraction, document classification, sentiment analysis",
    "Computer vision: object detection, OCR, and image segmentation",
    "Cloud-based ML deployment (SageMaker, Vertex AI, Azure ML)",
    "ML Ops: model versioning, CI/CD pipelines, drift monitoring"
  ];

  const serviceCapabilities = [
    {
      title: "AI & ML Consulting",
      description: "End-to-end advisory for strategy, design, and implementation of AI systems."
    },
    {
      title: "Model Development & Deployment",
      description: "Custom ML models trained for predictive analytics, automation, and pattern recognition."
    },
    {
      title: "Data Engineering",
      description: "Data collection, cleaning, warehousing, and pipeline automation."
    },
    {
      title: "AI Integration",
      description: "Seamless integration of AI/ML systems into existing applications and business workflows."
    }
  ];

  const certifications = [
    "UT Business School – Executive Certificate in Artificial Intelligence & Machine Learning",
    "AWS Certified Machine Learning – Specialty",
    "TensorFlow Developer Certificate"
  ];

  const differentiators = [
    {
      title: "Strategic + Technical Fusion",
      description: "AI solutions built with business impact in mind, not just experimentation."
    },
    {
      title: "Production-Ready AI",
      description: "Deployment of APIs and apps using containers, stream processing, and edge deployments."
    },
    {
      title: "Cross-Functional Fluency",
      description: "Ability to work with both technical teams and executive stakeholders."
    }
  ];

  return (
    <Layout>
      <div className="bg-secondary/30 py-20 border-b border-white/5">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
            Capability <span className="text-gradient">Statement</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Manna Solutions LLC delivers custom artificial intelligence and machine learning solutions to clients seeking to automate, optimize, and scale complex decision-making processes.
          </p>
        </div>
      </div>

      {/* Government Info & Company Overview */}
      <section className="py-16 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Government Info */}
            <div className="p-8 rounded-3xl bg-card border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-white">Government Info</h2>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-white/5">
                  <span className="text-muted-foreground">UEI</span>
                  <span className="text-white font-medium" data-testid="text-uei">RXC8TT8MT153</span>
                </div>
                <div className="flex justify-between py-3 border-b border-white/5">
                  <span className="text-muted-foreground">CAGE Code</span>
                  <span className="text-white font-medium" data-testid="text-cage">13VM7</span>
                </div>
                <div className="py-3">
                  <span className="text-muted-foreground block mb-2">NAICS Codes</span>
                  <div className="flex flex-wrap gap-2">
                    {["541511", "541512", "541513", "541715", "518210"].map((code) => (
                      <span key={code} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                        {code}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="p-8 rounded-3xl bg-card border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Phone className="h-6 w-6 text-accent" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-white">Contact Info</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 py-3 border-b border-white/5">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <span className="text-white" data-testid="text-email">mannasolu@yahoo.com</span>
                </div>
                <div className="flex items-center gap-3 py-3 border-b border-white/5">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <span className="text-white" data-testid="text-phone">(832) 803-8840</span>
                </div>
                <div className="flex items-center gap-3 py-3 border-b border-white/5">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <span className="text-white" data-testid="text-address">7019 River Garden Dr, Houston, TX</span>
                </div>
                <div className="flex items-center gap-3 py-3">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  <span className="text-muted-foreground">Virtual operations headquartered in Texas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Competencies */}
      <section className="py-16 border-b border-white/5">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold text-white mb-8 text-center">
            Core <span className="text-primary">Competencies</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {coreCompetencies.map((competency, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-secondary/30 border border-white/5">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">{competency}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Capabilities */}
      <section className="py-16 border-b border-white/5">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold text-white mb-8 text-center">
            Service <span className="text-primary">Capabilities</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {serviceCapabilities.map((service, i) => (
              <div key={i} className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors">
                <h3 className="text-lg font-heading font-bold text-white mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Award className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-heading font-bold text-white">
              Certifications & Licenses
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {certifications.map((cert, i) => (
              <div key={i} className="px-6 py-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-white/10 text-center">
                <span className="text-white text-sm font-medium">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-16 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Shield className="h-8 w-8 text-accent" />
            <h2 className="text-3xl font-heading font-bold text-white">
              Differentiators
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {differentiators.map((diff, i) => (
              <div key={i} className="p-6 rounded-2xl bg-secondary/30 border border-white/5 text-center">
                <h3 className="text-lg font-heading font-bold text-white mb-3">{diff.title}</h3>
                <p className="text-muted-foreground text-sm">{diff.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="p-12 rounded-3xl bg-gradient-to-r from-primary/10 to-accent/10 border border-white/10 text-center">
            <h2 className="text-3xl font-heading font-bold text-white mb-4">Ready to Work Together?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contact us today to discuss how Manna Solutions can help your organization leverage AI and ML technologies.
            </p>
            <Link href="/contact">
              <Button size="lg" className="rounded-full" data-testid="button-contact-cta">
                Contact Us <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
