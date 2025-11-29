import { Link, useLocation } from "wouter";
import { Menu, X, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import logo from "@assets/logo_1764423796982.jpeg";

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
        {/* Left Side: Logo */}
        <Link href="/">
          <div className="flex items-center gap-3 flex-shrink-0 mr-4 cursor-pointer">
            <img src={logo} alt="Manna Solutions LLC" className="h-10 w-10 rounded-lg shrink-0" />
            <span className="text-xl font-heading font-bold tracking-tight text-white whitespace-nowrap">
              Manna <span className="text-primary">Solutions</span>
            </span>
          </div>
        </Link>

        {/* Center: Navigation Links (Hidden on Mobile) */}
        {/* using flex-1 and justify-center ensures they take available space but don't overlap with sides */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-6 lg:gap-8 mx-4">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <span className={`text-sm font-medium transition-colors hover:text-primary whitespace-nowrap cursor-pointer ${
                location === link.href ? "text-primary" : "text-muted-foreground"
              }`}>
                {link.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="hidden md:block">
            <Link href="/login">
              <Button variant="default" size="sm" className="gap-2 cursor-pointer">
                Client Portal <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border p-6 space-y-4">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <span 
                className="block text-lg font-medium text-foreground hover:text-primary cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </span>
            </Link>
          ))}
          <Link href="/login">
            <Button className="w-full mt-4 cursor-pointer">Client Portal</Button>
          </Link>
        </div>
      )}
    </nav>
  );
}