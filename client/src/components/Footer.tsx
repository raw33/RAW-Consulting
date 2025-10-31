import { Linkedin } from "lucide-react";

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-background border-t py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-3">RAW Consulting</h3>
            <p className="text-sm text-muted-foreground">
              Transforming business visions into reality through expert consulting and coaching.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-3">Quick Links</h4>
            <div className="space-y-2">
              <button
                onClick={() => scrollToSection("services")}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-footer-services"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("industries")}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-footer-industries"
              >
                Industries
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-footer-contact"
              >
                Contact
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Connect</h4>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-linkedin"
            >
              <Linkedin className="h-5 w-5" />
              LinkedIn
            </a>
          </div>
        </div>

        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} RAW Consulting. All rights reserved.</p>
          <div className="flex gap-6">
            <button className="hover:text-foreground transition-colors">
              Privacy Policy
            </button>
            <button className="hover:text-foreground transition-colors">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
