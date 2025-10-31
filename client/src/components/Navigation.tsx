import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  onContactClick?: () => void;
}

export default function Navigation({ onContactClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "Services", id: "services" },
    { label: "Industries", id: "industries" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
        isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex-shrink-0">
            <h1 
              className={cn(
                "text-2xl md:text-3xl font-semibold transition-colors",
                isScrolled ? "text-foreground" : "text-white"
              )}
            >
              RAW Consulting
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={cn(
                  "text-sm font-medium transition-colors hover-elevate px-4 py-2 rounded-md",
                  isScrolled 
                    ? "text-foreground hover:text-primary" 
                    : "text-white hover:text-white"
                )}
                data-testid={`link-${link.id}`}
              >
                {link.label}
              </button>
            ))}
            <Button 
              variant={isScrolled ? "default" : "outline"}
              onClick={onContactClick}
              className={cn(
                !isScrolled && "bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              )}
              data-testid="button-nav-contact"
            >
              Get Started
            </Button>
          </div>

          <button
            className={cn(
              "md:hidden p-2",
              isScrolled ? "text-foreground" : "text-white"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <div className="px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left px-4 py-2 text-foreground hover-elevate rounded-md"
                data-testid={`link-mobile-${link.id}`}
              >
                {link.label}
              </button>
            ))}
            <Button 
              variant="default" 
              className="w-full"
              onClick={() => {
                onContactClick?.();
                setIsMobileMenuOpen(false);
              }}
              data-testid="button-mobile-contact"
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
