import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { stats } from "@/lib/data";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import type { Project } from "@shared/schema";

export default function Dashboard() {
  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-heading font-bold text-white mb-2">Welcome back, Amani</h2>
        <p className="text-muted-foreground">Here's what's happening with your projects today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <Card key={i} className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <p className="text-xs text-emerald-500 flex items-center gap-1">
                {stat.trend && <ArrowUpRight className="h-3 w-3" />}
                {stat.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Projects Section */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-heading font-bold text-white">Active Projects</h3>
            <Button variant="outline" size="sm">View All</Button>
          </div>

          <div className="space-y-4">
            {isLoading ? (
              <div className="text-muted-foreground">Loading projects...</div>
            ) : projects.length === 0 ? (
              <div className="text-muted-foreground">No projects yet</div>
            ) : (
              projects.map((project) => (
                <Card key={project.id} className="bg-card border-border hover:border-primary/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-white text-lg mb-1">{project.name}</h4>
                        <p className="text-sm text-muted-foreground">{project.client}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        project.status === "Active" ? "bg-primary/10 text-primary border-primary/20" :
                        project.status === "Completed" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                        "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-6">
                      {project.description}
                    </p>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {project.dueDate}</span>
                        <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> 2 days left</span>
                      </div>
                      <div className="flex items-center gap-2 w-1/3">
                        <span className="text-xs text-white">{project.progress}%</span>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-heading font-bold text-white">Recent Activity</h3>
          <Card className="bg-secondary/30 border-border h-full">
            <CardContent className="p-6 space-y-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex gap-4 relative pb-6 last:pb-0 border-l border-white/10 pl-6 last:border-0">
                  <div className="absolute -left-[5px] top-0 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background"></div>
                  <div>
                    <p className="text-sm text-white font-medium">Model v2.4 deployed</p>
                    <p className="text-xs text-muted-foreground mb-1">Retail Demand Forecasting</p>
                    <p className="text-xs text-muted-foreground/50">2 hours ago</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}