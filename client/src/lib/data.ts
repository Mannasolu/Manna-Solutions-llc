import { Bot, Brain, BarChart3, Eye, Database, Lock, Cloud, Cpu } from "lucide-react";

export const services = [
  {
    title: "Predictive Analytics",
    description: "Custom ML models trained for predictive analytics, automation, and pattern recognition to optimize complex decision-making processes.",
    useCase: "Retail Demand Forecasting",
    icon: BarChart3,
    color: "text-blue-400"
  },
  {
    title: "Natural Language Processing",
    description: "Entity extraction, document classification, and sentiment analysis to unlock insights from unstructured text data.",
    useCase: "Customer Sentiment Analysis",
    icon: Bot,
    color: "text-cyan-400"
  },
  {
    title: "Computer Vision",
    description: "Advanced object detection, OCR, and image segmentation capabilities for automated visual inspection and analysis.",
    useCase: "Quality Control Automation",
    icon: Eye,
    color: "text-emerald-400"
  },
  {
    title: "ML Ops & Deployment",
    description: "Model versioning, CI/CD pipelines, drift monitoring, and cloud-based deployment on SageMaker, Vertex AI, and Azure ML.",
    useCase: "Production ML Infrastructure",
    icon: Cloud,
    color: "text-violet-400"
  }
];

export const team = [
  {
    name: "Amani Latson",
    role: "Founder & CEO",
    bio: "UT Business School–trained technologist merging deep technical skill with business fluency. Expert in ethical, ROI-driven AI systems.",
    image: "CEO Headshot" // Placeholder key
  },
  {
    name: "David Chen",
    role: "Lead Data Scientist",
    bio: "Specialized in deep learning and neural architecture search with over 10 years of experience in predictive modeling.",
    image: "Data Scientist Headshot" // Placeholder key
  },
  {
    name: "Sarah Johnson",
    role: "AI Research Lead",
    bio: "PhD in Computer Science focusing on NLP and semantic understanding. Published author in top AI journals.",
    image: "Office" // Placeholder key (Using office for now if 3rd person image not generated)
  }
];

export const projects = [
  {
    id: 1,
    name: "Retail Demand Forecasting",
    client: "GlobalRetail Inc.",
    status: "Active",
    progress: 75,
    dueDate: "2024-12-15",
    description: "Implementing LSTM models to predict inventory requirements across 500+ store locations."
  },
  {
    id: 2,
    name: "Customer Sentiment Analysis",
    client: "TechFlow Solutions",
    status: "Completed",
    progress: 100,
    dueDate: "2024-10-30",
    description: "Deployed NLP pipeline for real-time analysis of customer support tickets and social media mentions."
  },
  {
    id: 3,
    name: "Quality Control Vision System",
    client: "AutoMfg Corp",
    status: "In Review",
    progress: 90,
    dueDate: "2024-11-20",
    description: "Computer vision system for defect detection on the assembly line using edge computing."
  }
];

export const stats = [
  { label: "Active Projects", value: "12", trend: "+2 this month" },
  { label: "Models Deployed", value: "48", trend: "99.9% uptime" },
  { label: "Data Processed", value: "2.5 PB", trend: "+15% vs last qtr" },
  { label: "Client Satisfaction", value: "4.9/5", trend: "Based on 50 reviews" }
];