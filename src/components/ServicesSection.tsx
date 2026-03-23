import { Link } from 'react-router-dom';
import { Bug, Rat, Antenna, CircleDot, Zap, Shield } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const services = [
  {
    icon: Bug,
    title: 'Bed Bug Removal',
    desc: 'Complete bed bug elimination using heat treatment and proven chemical methods. We ensure every egg and adult is destroyed.',
  },
  {
    icon: CircleDot,
    title: 'Cockroach Extermination',
    desc: 'Targeted cockroach treatment that eliminates colonies at the source. We seal entry points and prevent future infestations.',
  },
  {
    icon: Antenna,
    title: 'Ant Control',
    desc: 'Professional ant colony elimination for carpenter ants, pavement ants, and more. Long-lasting barrier protection included.',
  },
  {
    icon: Rat,
    title: 'Rodent Control',
    desc: 'Humane and effective rodent removal for mice and rats. We seal all entry points and install monitoring stations.',
  },
  {
    icon: Zap,
    title: 'Wasp & Hornet Removal',
    desc: 'Safe removal of wasp and hornet nests from your property. Emergency same-day service available for active nests.',
  },
  {
    icon: Shield,
    title: 'General Pest Control',
    desc: 'Comprehensive pest management for spiders, silverfish, earwigs, and more. Preventive treatments to keep your home pest-free.',
  },
];

const ServicesSection = () => (
  <section className="py-20 md:py-28 bg-background">
    <div className="container">
      <ScrollReveal className="text-center mb-14">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">
          Complete Pest Control Services in Greater Montreal
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <ScrollReveal key={s.title} delay={i * 0.1}>
            <div className="group bg-background border border-border rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-foreground/5">
              <div className="h-1 bg-accent" />
              <div className="p-7">
                <s.icon className="w-10 h-10 text-accent mb-4" />
                <h3 className="font-display text-xl font-bold text-primary mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{s.desc}</p>
                <Link
                  to="/quote"
                  className="text-accent font-bold text-sm hover:underline inline-flex items-center gap-1 transition-colors"
                >
                  Book Now →
                </Link>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
