import { Link, useLocation } from "wouter";
import { Menu, X, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import logo from "@assets/generated_images/manna_solutions_logo.png";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const links = [
    { href: "/", label: "Home" },
    { href: "/solutions", label: "Solutions" },
    { href: "/about", label: "About Us" },
    { href: "/blog", label: "Insights" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center gap-3">
            <img src={logo} alt="Manna Solutions LLC" className="h-10 w-10 rounded-lg shrink-0" />
            <span className="text-xl font-heading font-bold tracking-tight text-white whitespace-nowrap">
              Manna<span className="text-primary">Solutions</span>
            </span>
          </a>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <a className={`text-sm font-medium transition-colors hover:text-primary ${
                location === link.href ? "text-primary" : "text-muted-foreground"
              }`}>
                {link.label}
              </a>
            </Link>
          ))}
          <Link href="/login">
            <Button variant="default" size="sm" className="gap-2">
              Client Portal <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border p-6 space-y-4">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <a 
                className="block text-lg font-medium text-foreground hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            </Link>
          ))}
          <Link href="/login">
            <Button className="w-full mt-4">Client Portal</Button>
          </Link>
        </div>
      )}
    </nav>
  );
}