import { Card, CardContent } from "@/components/ui/card";

const metrics = [
  {
    number: "9+",
    label: "Industries Served",
    description: "Diverse expertise across sectors",
  },
  {
    number: "15+",
    label: "Businesses Launched",
    description: "From concept to market success",
  },
  {
    number: "100%",
    label: "Client Satisfaction",
    description: "Committed to your success",
  },
];

export default function Results() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
            Results That Speak
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {metrics.map((metric, index) => (
            <Card key={index} className="text-center" data-testid={`card-metric-${index}`}>
              <CardContent className="pt-8 pb-8">
                <div className="text-5xl md:text-6xl font-semibold text-primary mb-2">
                  {metric.number}
                </div>
                <div className="text-lg md:text-xl font-medium mb-2">
                  {metric.label}
                </div>
                <p className="text-sm text-muted-foreground">
                  {metric.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
