import { Button } from "@/components/ui/button";
import { ExternalLink, Code } from "lucide-react";

export default function WebAppSamples() {
  return (
    <section id="samples" className="py-20 md:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6">
            Web App Samples
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
            Every web app we build is custom-designed for each client's unique needs and goals. Browse a selection of sample applications to see what's possible.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="max-w-2xl">
            <div className="flex items-start gap-4 mb-8">
              <Code className="h-6 w-6 text-primary mt-1 shrink-0" />
              <p className="text-muted-foreground leading-relaxed">
                From client portals and dashboards to booking systems and internal tools — we scope, design, and deliver MVPs that solve real business problems. Each sample below represents the kind of tailored solutions we bring to every engagement.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              data-testid="button-webapp-samples"
            >
              <a
                href="https://webapp-samples.replit.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3"
              >
                <ExternalLink className="w-5 h-5" />
                View Sample Web Apps
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
