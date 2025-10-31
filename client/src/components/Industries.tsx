import { Badge } from "@/components/ui/badge";

const industries = [
  "Medical Device Sales",
  "Education",
  "Transportation",
  "Travel",
  "Micromobility",
  "Wireless Retail",
  "Economic Development",
  "Public Policy",
  "Youth Sports"
];

export default function Industries() {
  return (
    <section id="industries" className="py-16 md:py-20 lg:py-24 bg-card">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
            Proven Success Across Diverse Industries
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            We've successfully helped build and scale businesses across multiple sectors, 
            bringing specialized expertise and proven methodologies to each unique challenge.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto">
          {industries.map((industry, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="px-4 py-2 text-sm md:text-base"
              data-testid={`badge-industry-${index}`}
            >
              {industry}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
