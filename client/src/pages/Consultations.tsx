import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Calendar, Search, Trash2, Archive } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import type { Contact } from "@shared/schema";
import { useState } from "react";

export default function Consultations() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: consultations = [], isLoading } = useQuery<Contact[]>({
    queryKey: ["/api/contacts"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  const filteredConsultations = consultations.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.message.toLowerCase().includes(searchTerm.toLowerCase())
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
        <h2 className="text-3xl font-heading font-bold text-white mb-2">Consultation Requests</h2>
        <p className="text-muted-foreground">Manage all incoming consultation and service requests from your contact form.</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6 flex items-center gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-background/50 border-white/10"
            data-testid="input-search-consultations"
          />
        </div>
      </div>

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
        {isLoading ? (
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
    </DashboardLayout>
  );
}
