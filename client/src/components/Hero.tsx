import { Button } from "@/components/ui/button";
import heroImage from "@assets/zoomed in office shot_1761876697844.png";

interface HeroProps {
  onContactClick?: () => void;
}

export default function Hero({ onContactClick }: HeroProps) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/40" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full">
        <div className="max-w-4xl">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-semibold text-white leading-tight mb-8">
            TRANSFORM <span className="font-light">YOUR BUSINESS</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mb-12 leading-relaxed">
            Expert fractional leadership and consulting services to scale your vision
          </p>
          
          <Button 
            size="lg" 
            variant="default"
            className="px-10 py-6 text-lg font-medium"
            onClick={onContactClick}
            data-testid="button-schedule-consultation"
          >
            GET STARTED
          </Button>
        </div>
      </div>
    </section>
  );
}
