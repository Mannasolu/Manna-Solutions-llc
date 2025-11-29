import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, User } from "lucide-react";
import ceoImg from "@assets/generated_images/ceo_headshot.png";
import dsImg from "@assets/generated_images/data_scientist_headshot.png";
import analyticsImg from "@assets/generated_images/predictive_analytics_visualization.png";

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: "The Future of Predictive Analytics in Retail",
      excerpt: "How AI is transforming inventory management and customer demand forecasting for global brands.",
      author: "David Chen",
      role: "Lead Data Scientist",
      image: dsImg,
      date: "Nov 28, 2024",
      cover: analyticsImg,
      category: "Analytics"
    },
    {
      id: 2,
      title: "Ethical AI: Navigating the New Frontier",
      excerpt: "Understanding the importance of explainability and bias reduction in machine learning models.",
      author: "Amani Latson",
      role: "CEO",
      image: ceoImg,
      date: "Nov 15, 2024",
      cover: analyticsImg, // Reusing for now
      category: "Strategy"
    },
    {
      id: 3,
      title: "Optimizing Supply Chains with Computer Vision",
      excerpt: "Real-world use cases of automated visual inspection in manufacturing environments.",
      author: "David Chen",
      role: "Lead Data Scientist",
      image: dsImg,
      date: "Oct 30, 2024",
      cover: analyticsImg, // Reusing for now
      category: "Technology"
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
                  <Button variant="link" className="px-0 text-primary hover:text-primary/80">
                    Read Article
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}