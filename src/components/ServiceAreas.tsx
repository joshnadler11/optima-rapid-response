import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { useIsMobile } from '@/hooks/use-mobile';

const ServiceAreaMap3D = lazy(() => import('./ServiceAreaMap3D'));

const cities = [
  { name: 'Montreal', pos: [0, 0] },
  { name: 'Laval', pos: [0, 1.5] },
  { name: 'Longueuil', pos: [0.5, -1.2] },
  { name: 'Brossard', pos: [-0.8, -1.5] },
  { name: 'South Shore', pos: [1.2, -2] },
  { name: 'North Shore', pos: [-1, 2] },
];

const ServiceAreas = () => {
  const isMobile = useIsMobile();

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container">
        <ScrollReveal className="text-center mb-10 md:mb-14" variant="fade-scale" divider>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">
            We Serve All of Greater Montreal
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <ScrollReveal variant="slide-left" className="order-2 lg:order-1">
            <div
              className="relative rounded-xl overflow-hidden bg-primary"
              style={{ height: isMobile ? '300px' : '500px' }}
            >
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-primary-foreground/50 font-medium text-sm">Loading map...</div>
                  </div>
                }
              >
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
                    <div>
                      <h3 className="font-display font-bold text-primary text-base md:text-lg">{city.name}</h3>
                      <p className="text-muted-foreground text-xs">Same-day service available</p>
                    </div>
                  </div>
                  <Link to="/quote" className="text-accent font-bold text-sm hover:underline transition-colors flex-shrink-0">
                    Book Now →
                  </Link>
                </div>
              </ScrollReveal>
            ))}
            <ScrollReveal delay={0.5}>
              <p className="text-muted-foreground text-sm italic text-center mt-4">
                Don't see your city? Call us — we likely cover it.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreas;
