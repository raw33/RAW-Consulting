import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@assets/generated_images/Professional_consulting_workspace_hero_image_1b6b0979.png";

interface HeroProps {
  onContactClick?: () => void;
}

export default function Hero({ onContactClick }: HeroProps) {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/50" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-20 text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-tight mb-6">
          Transform Your Business<br />Vision Into Reality
        </h1>
        
        <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
          Expert business consulting and coaching services with proven results across 9+ industries. 
          From business development to MVP creation, we turn your ideas into thriving businesses.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            variant="default"
            className="px-8 py-6 text-lg"
            onClick={onContactClick}
            data-testid="button-schedule-consultation"
          >
            Schedule Free Consultation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        
        <p className="text-sm text-white/70 mt-6">
          Trusted by businesses across medical devices, education, transportation, and more
        </p>
      </div>
    </section>
  );
}
