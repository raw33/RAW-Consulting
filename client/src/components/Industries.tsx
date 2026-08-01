import teamImage from "@assets/industries-office.jpg";

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
    <section id="industries" className="py-20 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6">
              Industry Experience
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              We've successfully helped build and scale businesses across multiple sectors, 
              bringing specialized expertise to each unique challenge.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {industries.map((industry, index) => (
                <div 
                  key={index}
                  className="py-3 border-l-2 border-primary pl-4"
                  data-testid={`text-industry-${index}`}
                >
                  <p className="font-medium">{industry}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <img 
              src={teamImage} 
              alt="Collaborative workspace overhead view" 
              className="w-full h-[500px] object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
