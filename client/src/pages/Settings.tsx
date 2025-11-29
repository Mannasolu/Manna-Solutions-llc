import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, User, Bell, Shield, Loader2 } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const [isLoadingPortal, setIsLoadingPortal] = useState(false);
  const { toast } = useToast();

  const billingPortalMutation = useMutation({
    mutationFn: async () => {
      // Pass user email to identify the customer
      const res = await apiRequest("POST", "/api/stripe/billing-portal", {
        email: "amani@mannasolutions.com"
      });
      return res.json();
    },
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Could not open billing portal. Please try again.",
        variant: "destructive",
      });
      setIsLoadingPortal(false);
    },
  });

  const handleManagePayment = () => {
    setIsLoadingPortal(true);
    billingPortalMutation.mutate();
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-heading font-bold text-white mb-2">Account Settings</h2>
        <p className="text-muted-foreground">Manage your account preferences and billing.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Your personal information</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Full Name</label>
              <Input defaultValue="Amani Latson" className="bg-background/50 border-white/10" data-testid="input-fullname" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <Input defaultValue="amani@mannasolutions.com" className="bg-background/50 border-white/10" data-testid="input-email" />
            </div>
            <Button className="w-full" data-testid="button-update-profile">Update Profile</Button>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Manage your billing and subscription</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-secondary/50 border border-white/5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">Current Plan</span>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                  Enterprise
                </span>
              </div>
              <p className="text-white font-medium mb-1">Manna Solutions LLC</p>
              <p className="text-sm text-muted-foreground">Full access to all AI/ML services</p>
            </div>

            <div className="p-4 rounded-lg bg-secondary/50 border border-white/5">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-8 w-12 rounded bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">VISA</span>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">•••• •••• •••• 4242</p>
                  <p className="text-xs text-muted-foreground">Expires 12/25</p>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleManagePayment}
              disabled={isLoadingPortal}
              className="w-full"
              data-testid="button-manage-payment"
            >
              {isLoadingPortal ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Opening Portal...
                </>
              ) : (
                "Manage Payment Methods"
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                <Bell className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Configure how you receive updates</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-sm font-medium">Email Notifications</p>
                <p className="text-xs text-muted-foreground">Receive project updates via email</p>
              </div>
              <div className="h-6 w-11 rounded-full bg-primary relative cursor-pointer">
                <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-sm font-medium">SMS Alerts</p>
                <p className="text-xs text-muted-foreground">Get critical alerts via SMS</p>
              </div>
              <div className="h-6 w-11 rounded-full bg-muted-foreground/30 relative cursor-pointer">
                <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-violet-500" />
              </div>
              <div>
                <CardTitle>Security</CardTitle>
                <CardDescription>Protect your account</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Current Password</label>
              <Input type="password" placeholder="••••••••" className="bg-background/50 border-white/10" data-testid="input-current-password" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">New Password</label>
              <Input type="password" placeholder="••••••••" className="bg-background/50 border-white/10" data-testid="input-new-password" />
            </div>
            <Button variant="outline" className="w-full border-white/10" data-testid="button-change-password">Change Password</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
