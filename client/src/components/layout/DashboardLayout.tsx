import { Link, useLocation } from "wouter";
import { ReactNode } from "react";
import { LayoutDashboard, FolderKanban, FileText, Settings, LogOut, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logo from "@assets/logo_1764423796982.jpeg";
import ceoImg from "@assets/DSC08797-1_1764429137126.JPG";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [location] = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
    { icon: FolderKanban, label: "Projects", href: "/dashboard/projects" },
    { icon: FileText, label: "Documents", href: "/dashboard/documents" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-secondary/30 hidden md:flex flex-col">
        <div className="p-6">
          <Link href="/">
            <a className="flex items-center gap-3">
              <img src={logo} alt="Manna Solutions LLC" className="h-8 w-8 rounded-md" />
              <span className="font-heading font-bold text-lg text-white">
                Manna <span className="text-primary">Solutions</span>
              </span>
            </a>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <a className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                location === item.href 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              }`}>
                <item.icon className="h-4 w-4" />
                {item.label}
              </a>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-4 px-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={ceoImg} />
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate text-white">Amani Latson</p>
              <p className="text-xs text-muted-foreground truncate">Admin</p>
            </div>
          </div>
          <Link href="/login">
            <Button variant="outline" className="w-full justify-start gap-2 text-muted-foreground hover:text-white border-white/10 hover:bg-white/5">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-background/50 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-10">
          <h1 className="font-heading font-semibold text-lg">
            {navItems.find(i => i.href === location)?.label || "Dashboard"}
          </h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-primary rounded-full"></span>
            </Button>
          </div>
        </header>
        <div className="p-6 md:p-8 overflow-auto flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}