import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Calendar, Search, Trash2, Archive, Video } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import type { Contact, DemoRequest } from "@shared/schema";
import { useState } from "react";

export default function Consultations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"consultations" | "demos">("consultations");
  
  const { data: consultations = [], isLoading: consultLoading } = useQuery<Contact[]>({
    queryKey: ["/api/contacts"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  const { data: demoRequests = [], isLoading: demoLoading } = useQuery<DemoRequest[]>({
    queryKey: ["/api/demo-requests"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  const filteredConsultations = consultations.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDemos = demoRequests.filter(d =>
    `${d.firstName} ${d.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (d.company?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateString;
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-heading font-bold text-white mb-2">Service Requests</h2>
        <p className="text-muted-foreground">Manage all incoming consultation and demo requests.</p>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2 border-b border-border">
        <button
          onClick={() => setActiveTab("consultations")}
          className={`px-4 py-3 font-medium border-b-2 transition-colors ${
            activeTab === "consultations"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
          data-testid="tab-consultations"
        >
          Consultations ({consultations.length})
        </button>
        <button
          onClick={() => setActiveTab("demos")}
          className={`px-4 py-3 font-medium border-b-2 transition-colors ${
            activeTab === "demos"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
          data-testid="tab-demos"
        >
          Demo Requests ({demoRequests.length})
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 flex items-center gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or details..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-background/50 border-white/10"
            data-testid="input-search-requests"
          />
        </div>
      </div>

      {activeTab === "consultations" && (
        <>
          {/* Summary Stats */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="text-sm text-muted-foreground mb-1">Total Requests</div>
                <div className="text-3xl font-bold text-white">{consultations.length}</div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="text-sm text-muted-foreground mb-1">This Month</div>
                <div className="text-3xl font-bold text-white">{consultations.filter(c => {
                  const date = new Date(c.createdAt);
                  const now = new Date();
                  return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
                }).length}</div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="text-sm text-muted-foreground mb-1">Unique Contacts</div>
                <div className="text-3xl font-bold text-white">{new Set(consultations.map(c => c.email)).size}</div>
              </CardContent>
            </Card>
          </div>

          {/* Consultations List */}
          <div className="space-y-4">
            {consultLoading ? (
              <div className="text-muted-foreground">Loading consultations...</div>
            ) : filteredConsultations.length === 0 ? (
              <Card className="bg-card border-border">
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground">No consultation requests found.</p>
                </CardContent>
              </Card>
            ) : (
              filteredConsultations.map((consultation) => (
                <Card key={consultation.id} className="bg-card border-border hover:border-primary/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-white text-lg mb-1" data-testid={`text-name-${consultation.id}`}>
                          {consultation.name}
                        </h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            <a href={`mailto:${consultation.email}`} className="hover:text-primary transition-colors" data-testid={`link-email-${consultation.id}`}>
                              {consultation.email}
                            </a>
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(consultation.createdAt)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" data-testid={`button-archive-${consultation.id}`}>
                          <Archive className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" data-testid={`button-delete-${consultation.id}`}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 rounded-lg bg-secondary/50 border border-white/5">
                      <p className="text-white whitespace-pre-wrap" data-testid={`text-message-${consultation.id}`}>
                        {consultation.message}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </>
      )}

      {activeTab === "demos" && (
        <>
          {/* Demo Stats */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="text-sm text-muted-foreground mb-1">Total Demo Requests</div>
                <div className="text-3xl font-bold text-white">{demoRequests.length}</div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="text-sm text-muted-foreground mb-1">This Month</div>
                <div className="text-3xl font-bold text-white">{demoRequests.filter(d => {
                  const date = new Date(d.createdAt);
                  const now = new Date();
                  return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
                }).length}</div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="text-sm text-muted-foreground mb-1">Industries</div>
                <div className="text-3xl font-bold text-white">{new Set(demoRequests.map(d => d.industry).filter(Boolean)).size}</div>
              </CardContent>
            </Card>
          </div>

          {/* Demos List */}
          <div className="space-y-4">
            {demoLoading ? (
              <div className="text-muted-foreground">Loading demo requests...</div>
            ) : filteredDemos.length === 0 ? (
              <Card className="bg-card border-border">
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground">No demo requests found.</p>
                </CardContent>
              </Card>
            ) : (
              filteredDemos.map((demo) => (
                <Card key={demo.id} className="bg-card border-border hover:border-primary/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-bold text-white text-lg" data-testid={`text-demo-name-${demo.id}`}>
                            {demo.firstName} {demo.lastName}
                          </h4>
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            <Video className="h-3 w-3" />
                            Demo Requested
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            <a href={`mailto:${demo.email}`} className="hover:text-primary transition-colors" data-testid={`link-demo-email-${demo.id}`}>
                              {demo.email}
                            </a>
                          </span>
                          {demo.company && <span>{demo.company}</span>}
                          {demo.jobTitle && <span>{demo.jobTitle}</span>}
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(demo.createdAt)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" data-testid={`button-demo-archive-${demo.id}`}>
                          <Archive className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" data-testid={`button-demo-delete-${demo.id}`}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="mt-6 grid md:grid-cols-2 gap-4">
                      {demo.industry && (
                        <div className="p-3 rounded-lg bg-secondary/50 border border-white/5">
                          <p className="text-xs text-muted-foreground mb-1">Industry</p>
                          <p className="text-white font-medium">{demo.industry}</p>
                        </div>
                      )}
                      {demo.companySize && (
                        <div className="p-3 rounded-lg bg-secondary/50 border border-white/5">
                          <p className="text-xs text-muted-foreground mb-1">Company Size</p>
                          <p className="text-white font-medium">{demo.companySize}</p>
                        </div>
                      )}
                      {demo.timeline && (
                        <div className="p-3 rounded-lg bg-secondary/50 border border-white/5">
                          <p className="text-xs text-muted-foreground mb-1">Timeline</p>
                          <p className="text-white font-medium">{demo.timeline}</p>
                        </div>
                      )}
                      {demo.budget && (
                        <div className="p-3 rounded-lg bg-secondary/50 border border-white/5">
                          <p className="text-xs text-muted-foreground mb-1">Budget Range</p>
                          <p className="text-white font-medium">{demo.budget}</p>
                        </div>
                      )}
                    </div>

                    {demo.challenges && (
                      <div className="mt-4 p-4 rounded-lg bg-secondary/50 border border-white/5">
                        <p className="text-xs text-muted-foreground mb-2">Challenges</p>
                        <p className="text-white whitespace-pre-wrap" data-testid={`text-demo-challenges-${demo.id}`}>
                          {demo.challenges}
                        </p>
                      </div>
                    )}

                    {demo.consultationNotes && (
                      <div className="mt-4 p-4 rounded-lg bg-secondary/50 border border-white/5">
                        <p className="text-xs text-muted-foreground mb-2">Additional Notes</p>
                        <p className="text-white whitespace-pre-wrap" data-testid={`text-demo-notes-${demo.id}`}>
                          {demo.consultationNotes}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
