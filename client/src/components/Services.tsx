import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { TrendingUp, Code, Share2, Users } from "lucide-react";

const services = [
  {
    icon: TrendingUp,
    title: "Business Development",
    description: "Strategic planning and execution to scale your business. We help identify growth opportunities and create actionable roadmaps for sustainable success.",
  },
  {
    icon: Code,
    title: "Web App MVP Development",
    description: "Turn your ideas into market-ready minimum viable products. Fast, efficient development that validates your concept and attracts early adopters.",
  },
  {
    icon: Share2,
    title: "Social Media & Marketing",
    description: "Compelling content creation and strategic marketing campaigns. Build your brand presence and engage your target audience effectively.",
  },
  {
    icon: Users,
    title: "Executive Coaching",
    description: "One-on-one coaching to develop leadership skills and drive organizational excellence. Personalized guidance for founders and executives.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-16 md:py-20 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
            Our Services
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive consulting solutions tailored to your business needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index} 
                className="hover-elevate transition-all duration-200"
                data-testid={`card-service-${index}`}
              >
                <CardHeader className="space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold">
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
