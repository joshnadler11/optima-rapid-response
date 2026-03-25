import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Star } from 'lucide-react';

const HeroBackground3D = lazy(() => import('./HeroBackground3D'));

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#0A1F13' }}>
      {/* 3D canvas background */}
      <Suspense fallback={null}>
        <HeroBackground3D />
      </Suspense>

      <div className="relative z-10 container text-center py-20 px-4 max-w-4xl">
        <div className="animate-hero-in">
          <span className="inline-block bg-accent/20 text-accent-foreground border border-accent/30 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
            ⭐ Montreal's Most Trusted Pest Control
          </span>
        </div>

        <h1 className="animate-hero-in delay-200 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-primary-foreground leading-[0.92] tracking-tight mb-6 font-serif">
          Optima Extermination
        </h1>

        <p className="animate-hero-in delay-400 text-primary-foreground/85 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">


        </p>

        <div className="animate-hero-in delay-600 flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Link
            to="/quote"
            className="w-full sm:w-auto flex items-center justify-center bg-accent text-accent-foreground font-bold text-lg px-10 h-14 rounded-md hover:brightness-110 transition-all active:scale-[0.97] shadow-lg shadow-accent/30 animate-cta-pulse">
            
            Get a Free Quote
          </Link>
          <a
            href="tel:5144580805"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold text-lg px-10 h-14 rounded-md border-2 border-primary-foreground/20 hover:bg-primary/80 transition-all active:scale-[0.97]">
            
            <Phone className="w-5 h-5" />
            Call (514) 458-0805
          </a>
        </div>

        {/* Star rating badge */}
        <div className="animate-hero-in delay-700 flex items-center justify-center gap-2 mb-4">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) =>
            <Star key={i} className="w-5 h-5 fill-accent text-accent" />
            )}
          </div>
          <span className="text-primary-foreground/90 text-sm font-medium">
</span>
        </div>

        <p className="animate-hero-in delay-700 text-green-300 text-sm font-medium">

        </p>
      </div>
    </section>);
};

export default Hero;