import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import logo from "@assets/logo_1764423796982.jpeg";
import heroBg from "@assets/generated_images/ai_neural_network_hero_background.png";

export default function Login() {
  const [, setLocation] = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={heroBg} alt="Background" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
      </div>

      <Card className="w-full max-w-md relative z-10 border-white/10 bg-secondary/50 backdrop-blur-md shadow-2xl">
        <CardHeader className="text-center space-y-6 pb-8">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-xl bg-background flex items-center justify-center shadow-lg border border-white/10">
              <img src={logo} alt="Logo" className="h-12 w-12" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl font-heading font-bold text-white">Client Portal</CardTitle>
            <CardDescription>Enter your credentials to access your project dashboard</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Email</label>
              <Input type="email" placeholder="client@company.com" className="bg-background/50 border-white/10 text-white" defaultValue="demo@client.com" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium text-white">Password</label>
                <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
              </div>
              <Input type="password" placeholder="••••••••" className="bg-background/50 border-white/10 text-white" defaultValue="password" />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              Sign In
            </Button>
          </form>
          <div className="mt-6 text-center text-xs text-muted-foreground">
            Don't have an account? <a href="/contact" className="text-primary hover:underline">Contact Support</a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}