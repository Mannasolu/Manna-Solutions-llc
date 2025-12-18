import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, User } from "lucide-react";
import { Link } from "wouter";
import ceoImg from "@assets/DSC08797-1_1764429137126.JPG";
import dsImg from "@assets/generated_images/data_scientist_headshot.png";
import analyticsImg from "@assets/generated_images/predictive_analytics_visualization.png";

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: "How Small Businesses Can Leverage AI in 2025",
      excerpt: "Practical strategies for implementing AI solutions that deliver ROI without enterprise-level budgets. Learn how automation and smart analytics can level the playing field.",
      author: "Amani Latson",
      role: "CEO",
      image: ceoImg,
      date: "Dec 15, 2024",
      cover: analyticsImg,
      category: "Strategy"
    },
    {
      id: 2,
      title: "The Rise of Edge Computing in AI Applications",
      excerpt: "Why processing data closer to the source is revolutionizing real-time decision making in manufacturing, logistics, and IoT deployments.",
      author: "David Chen",
      role: "Lead Data Scientist",
      image: dsImg,
      date: "Dec 8, 2024",
      cover: analyticsImg,
      category: "Technology"
    },
    {
      id: 3,
      title: "Building Trust Through Explainable AI",
      excerpt: "How transparent machine learning models help businesses comply with regulations while gaining stakeholder confidence in automated decisions.",
      author: "Amani Latson",
      role: "CEO",
      image: ceoImg,
      date: "Nov 22, 2024",
      cover: analyticsImg,
      category: "Ethics"
    },
    {
      id: 4,
      title: "NLP Breakthroughs: From Chatbots to Document Intelligence",
      excerpt: "Exploring how natural language processing is evolving beyond simple chatbots to power sophisticated document analysis and knowledge extraction systems.",
      author: "David Chen",
      role: "Lead Data Scientist",
      image: dsImg,
      date: "Nov 10, 2024",
      cover: analyticsImg,
      category: "Analytics"
    },
    {
      id: 5,
      title: "Reducing Costs with Predictive Maintenance",
      excerpt: "How machine learning models can predict equipment failures before they happen, saving companies millions in downtime and repair costs.",
      author: "David Chen",
      role: "Lead Data Scientist",
      image: dsImg,
      date: "Oct 28, 2024",
      cover: analyticsImg,
      category: "Case Study"
    },
    {
      id: 6,
      title: "The Houston Tech Scene: AI Innovation in the Energy Corridor",
      excerpt: "How Texas-based companies are adopting AI solutions to modernize operations in oil, gas, logistics, and healthcare sectors.",
      author: "Amani Latson",
      role: "CEO",
      image: ceoImg,
      date: "Oct 15, 2024",
      cover: analyticsImg,
      category: "Industry"
    }
  ];

  return (
    <Layout>
      <div className="bg-secondary/30 py-20 border-b border-white/5">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
            Insights & <span className="text-gradient">News</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Latest trends, thoughts, and updates from the Manna Solutions team.
          </p>
        </div>
      </div>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.id} className="bg-card border-border overflow-hidden group hover:border-primary/50 transition-colors">
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <img src={post.cover} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium text-white border border-white/10">
                    {post.category}
                  </span>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                    <span className="flex items-center gap-1"><User className="h-3 w-3" /> {post.author}</span>
                  </div>
                  <CardTitle className="text-xl font-bold text-white leading-tight group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Link href="/contact">
                    <Button variant="link" className="px-0 text-primary hover:text-primary/80" data-testid={`read-article-${post.id}`}>
                      Read Article
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}