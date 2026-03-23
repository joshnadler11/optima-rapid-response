import { MapPin } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const cities = ['Montreal', 'Laval', 'Longueuil', 'Brossard', 'South Shore', 'North Shore'];

const ServiceAreas = () => (
  <section className="py-20 md:py-28 bg-background">
    <div className="container">
      <ScrollReveal className="text-center mb-14">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">
          We Serve All of Greater Montreal
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {cities.map((city, i) => (
          <ScrollReveal key={city} delay={i * 0.08}>
            <div className="bg-background border border-border rounded-lg p-5 text-center hover:bg-[#F0F7F4] hover:shadow-md transition-all duration-300 group">
              <MapPin className="w-6 h-6 text-accent mx-auto mb-2 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="font-display font-bold text-primary" style={{ fontSize: '18px' }}>{city}</h3>
              <p className="text-muted-foreground text-xs mt-1">Same-day service available</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal className="text-center mt-8">
        <p className="text-muted-foreground text-sm italic">
          Don't see your city? Call us — we likely cover it.
        </p>
      </ScrollReveal>
    </div>
  </section>
);

export default ServiceAreas;
