import executiveImage from "@assets/stock_images/modern_executive_wor_122aad03.jpg";

export default function Results() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${executiveImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-primary/70" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center text-white">
          <div>
            <div className="text-6xl md:text-7xl font-semibold mb-4">9+</div>
            <p className="text-xl md:text-2xl font-light">Industries Served</p>
          </div>
          <div>
            <div className="text-6xl md:text-7xl font-semibold mb-4">15+</div>
            <p className="text-xl md:text-2xl font-light">Businesses Launched</p>
          </div>
          <div>
            <div className="text-6xl md:text-7xl font-semibold mb-4">100%</div>
            <p className="text-xl md:text-2xl font-light">Client Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
}
