import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Solutions from "@/pages/Solutions";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Settings from "@/pages/Settings";
import Consultations from "@/pages/Consultations";
import Blog from "@/pages/Blog";
import TruckerDashboard from "@/pages/dashboard/TruckerDashboard";
import MileageTracking from "@/pages/dashboard/MileageTracking";
import FuelExpenses from "@/pages/dashboard/FuelExpenses";
import MaintenanceTracking from "@/pages/dashboard/MaintenanceTracking";
import FoodExpenses from "@/pages/dashboard/FoodExpenses";
import PaperworkManagement from "@/pages/dashboard/PaperworkManagement";
import SubscriptionManagement from "@/pages/dashboard/SubscriptionManagement";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/solutions" component={Solutions} />
      <Route path="/about" component={About} />
      <Route path="/blog" component={Blog} />
      <Route path="/contact" component={Contact} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={TruckerDashboard} />
      <Route path="/dashboard/mileage" component={MileageTracking} />
      <Route path="/dashboard/fuel" component={FuelExpenses} />
      <Route path="/dashboard/maintenance" component={MaintenanceTracking} />
      <Route path="/dashboard/food" component={FoodExpenses} />
      <Route path="/dashboard/paperwork" component={PaperworkManagement} />
      <Route path="/dashboard/subscription" component={SubscriptionManagement} />
      <Route path="/dashboard/settings" component={Settings} />
      <Route path="/dashboard/consultations" component={Consultations} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;