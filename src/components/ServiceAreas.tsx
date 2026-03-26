import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { useIsMobile } from '@/hooks/use-mobile';

const ServiceAreaMap3D = lazy(() => import('./ServiceAreaMap3D'));

const cities = [
  { name: 'Montreal' }, { name: 'Laval' }, { name: 'Longueuil' },
  { name: 'Brossard' }, { name: 'South Shore' }, { name: 'North Shore' },
];

const ServiceAreas = () => {
  const isMobile = useIsMobile();

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container">
        <ScrollReveal className="text-center mb-10 md:mb-14" variant="fade-scale" divider>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">
            Serving All of Greater Montreal
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <ScrollReveal variant="slide-left" className="order-2 lg:order-1">
            <div className="relative rounded-xl overflow-hidden bg-primary" style={{ height: isMobile ? '300px' : '500px' }}>
              <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><div className="text-primary-foreground/50 font-medium text-sm">Loading map...</div></div>}>
                <ServiceAreaMap3D />
              </Suspense>
            </div>
          </ScrollReveal>

          <div className="order-1 lg:order-2 space-y-3">
            {cities.map((city, i) => (
              <ScrollReveal key={city.name} delay={i * 0.08} variant="spring-drop">
                <div className="flex items-center justify-between bg-background border border-border rounded-lg p-4 md:p-5 hover:bg-secondary hover:shadow-md transition-all duration-300 group">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-accent flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                    <h3 className="font-display font-bold text-primary text-base md:text-lg">{city.name}</h3>
                  </div>
                  <Link to="/quote" className="text-accent font-bold text-sm hover:underline transition-colors flex-shrink-0">Book →</Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreas;
