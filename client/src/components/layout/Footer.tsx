import { Link } from "wouter";
import logo from "@assets/logo_1764423796982.jpeg";

export function Footer() {
  return (
    <footer className="bg-secondary py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/">
              <div className="flex items-center gap-3 mb-4 cursor-pointer">
                <img src={logo} alt="Manna Solutions LLC" className="h-8 w-8 rounded-md grayscale opacity-80" />
                <span className="text-lg font-heading font-bold text-white">
                  Manna <span className="text-primary">Solutions</span>
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md">
              Delivering custom artificial intelligence and machine learning solutions to automate, optimize, and scale complex decision-making processes.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/solutions"><span className="hover:text-primary cursor-pointer">Solutions</span></Link></li>
              <li><Link href="/about"><span className="hover:text-primary cursor-pointer">About Us</span></Link></li>
              <li><Link href="/blog"><span className="hover:text-primary cursor-pointer">Insights</span></Link></li>
              <li><Link href="/contact"><span className="hover:text-primary cursor-pointer">Contact</span></Link></li>
              <li><Link href="/login"><span className="hover:text-primary cursor-pointer">Client Portal</span></Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>7019 River Garden Dr</li>
              <li>Houston, TX 77095</li>
              <li>(832) 803-8840</li>
              <li>mannasolu@yahoo.com</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Manna Solutions LLC. All rights reserved.
        </div>
      </div>
    </footer>
  );
}