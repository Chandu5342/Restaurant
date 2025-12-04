import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
export function Navbar({ variant = "landing" }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl gradient-hero flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">M</span>
            </div>
            <span className="font-bold text-xl text-foreground">MenuFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {variant === "landing" && (
              <>
                <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </a>
                <a href="#portals" className="text-muted-foreground hover:text-foreground transition-colors">
                  Portals
                </a>
                <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </a>
              </>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {variant === "landing" && (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/customer">Demo</Link>
                </Button>
                <Button variant="hero" asChild>
                  <Link to="/admin">Get Started</Link>
                </Button>
              </>
            )}
            {variant === "customer" && (
              <Button variant="outline" asChild>
                <Link to="/">Back to Home</Link>
              </Button>
            )}
            {(variant === "admin" || variant === "superadmin") && (
              <Button variant="outline" asChild>
                <Link to="/">Logout</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slide-up">
            {variant === "landing" && (
              <div className="flex flex-col gap-4">
                <a href="#features" className="text-muted-foreground hover:text-foreground">Features</a>
                <a href="#portals" className="text-muted-foreground hover:text-foreground">Portals</a>
                <a href="#pricing" className="text-muted-foreground hover:text-foreground">Pricing</a>
                <div className="flex gap-3 pt-4">
                  <Button variant="ghost" asChild className="flex-1">
                    <Link to="/customer">Demo</Link>
                  </Button>
                  <Button variant="hero" asChild className="flex-1">
                    <Link to="/admin">Get Started</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

