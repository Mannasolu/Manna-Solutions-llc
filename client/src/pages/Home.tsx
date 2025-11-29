import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Cpu, Network } from "lucide-react";
import { Link } from "wouter";
import heroBg from "@assets/generated_images/ai_neural_network_hero_background.png";
import analyticsImg from "@assets/generated_images/predictive_analytics_visualization.png";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="AI Network" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Next-Gen AI Solutions Available Now
          </div>
          
          <h1 className="text-4xl md:text-7xl font-heading font-bold leading-tight mb-6 max-w-4xl mx-auto text-white animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Unlocking the Future with <span className="text-gradient">Intelligent AI/ML</span> Solutions.
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            Manna Solutions LLC delivers custom artificial intelligence and machine learning solutions to automate, optimize, and scale complex decision-making processes.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
            <Link href="/solutions">
              <Button size="lg" className="h-14 px-8 text-base rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] transition-all">
                Explore Our Solutions
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="h-14 px-8 text-base rounded-full border-white/10 text-white hover:bg-white/5 backdrop-blur-sm">
                Request a Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-secondary/30 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "Strategic + Technical Fusion",
                desc: "AI solutions built with business impact in mind, not just experimentation. We merge deep tech skill with ROI goals."
              },
              {
                icon: Cpu,
                title: "Production-Ready AI",
                desc: "Deployment of scalable APIs and apps using containers, stream processing, and edge computing."
              },
              {
                icon: Network,
                title: "Cross-Functional Fluency",
                desc: "We bridge the gap between technical teams and executive stakeholders for seamless integration."
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
              Transforming Data into <span className="text-primary">Decisive Action</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              From predictive analytics that forecast market trends to computer vision systems that automate quality control, our solutions are designed to give you a competitive edge.
            </p>
            <ul className="space-y-4 mb-8">
              {["Automate complex workflows", "Optimize resource allocation", "Scale with cloud-native architecture"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white">
                  <div className="h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/solutions">
              <Button className="gap-2">
                Learn More about our Tech <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 blur-3xl rounded-full opacity-30"></div>
            <img 
              src={analyticsImg} 
              alt="Analytics Dashboard" 
              className="relative rounded-2xl border border-white/10 shadow-2xl bg-background/50 backdrop-blur-sm"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}