import { Button } from "@/components/ui/button";
import { SiLinkedin } from "react-icons/si";
import collaborationImage from "@assets/setting view_1761878541418.png";

export default function ContactForm() {
  return (
    <section id="contact" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="relative order-2 lg:order-1">
            <img 
              src={collaborationImage} 
              alt="Collaborative workspace - team working together" 
              className="w-full h-[600px] lg:h-[700px] object-cover rounded-lg sticky top-24"
            />
          </div>

          <div className="order-1 lg:order-2">
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6">
                Let's Work Together
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Ready to transform your business? I'd love to hear from you. Connect with me on LinkedIn to start a conversation about your goals.
              </p>
              <Button 
                asChild
                size="lg"
                data-testid="button-linkedin-message"
              >
                <a 
                  href="https://www.linkedin.com/in/richward3/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3"
                >
                  <SiLinkedin className="w-5 h-5" />
                  Message Me on LinkedIn
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
