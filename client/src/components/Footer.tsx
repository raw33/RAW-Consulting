import { Linkedin, Mail, Phone } from "lucide-react";

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-card border-t py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-semibold mb-4">RAW CONSULTING</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Transforming business visions into reality through expert fractional leadership and consulting services.
            </p>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover-elevate"
                data-testid="link-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-3">
              <button
                onClick={() => scrollToSection("services")}
                className="block text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-footer-services"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("industries")}
                className="block text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-footer-industries"
              >
                Industries
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-footer-contact"
              >
                Contact
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <a
                href="mailto:contact@rawconsulting.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-footer-email"
              >
                <Mail className="h-4 w-4" />
                contact@rawconsulting.com
              </a>
              <a
                href="tel:+15551234567"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-footer-phone"
              >
                <Phone className="h-4 w-4" />
                (555) 123-4567
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t text-center md:text-left">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} RAW Consulting. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
