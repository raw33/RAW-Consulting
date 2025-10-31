import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Users, TrendingUp, Code, Share2, Briefcase } from "lucide-react";

const services = [
  {
    icon: Briefcase,
    title: "Fractional Leadership",
    description: "CEO, CFO, CMO, HR, and Legal executives on demand. Get C-suite expertise without the full-time commitment.",
  },
  {
    icon: TrendingUp,
    title: "Business Development",
    description: "Strategic planning and execution to scale your business and identify sustainable growth opportunities.",
  },
  {
    icon: Code,
    title: "Web App MVP Development",
    description: "Turn your ideas into market-ready products. Fast, efficient development that validates your concept.",
  },
  {
    icon: Share2,
    title: "Social Media & Marketing",
    description: "Compelling content creation and strategic campaigns to build your brand and engage your audience.",
  },
  {
    icon: Users,
    title: "Executive Coaching",
    description: "One-on-one coaching to develop leadership skills and drive organizational excellence.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6">
            Services
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
            Comprehensive consulting and fractional leadership solutions tailored to your business needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index} 
                className="hover-elevate transition-all duration-200 border"
                data-testid={`card-service-${index}`}
              >
                <CardHeader className="space-y-4">
                  <Icon className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold">
                    {service.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
