import { Star } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const reviews = [
  {
    text: 'We had a sudden bed bug issue in our apartment downtown and called three companies. Optima responded the fastest, beat the lowest price, and showed up that same afternoon. Highly recommend.',
    name: 'Sarah L.',
    location: 'Montreal',
  },
  {
    text: "I sent them a competitor estimate for a cockroach problem and they didn't just beat the price, they explained what the other company missed. Licensed, on time, and respectful. We haven't seen a trace since.",
    name: 'Karim B.',
    location: 'Laval',
  },
  {
    text: 'I manage several rental units and Optima is my go-to for any extermination issue. Quick to respond, professional with tenants, fair pricing every single time.',
    name: 'Roberto M.',
    location: 'Property Manager, Plateau',
  },
];

const Testimonials = () => (
  <section className="py-12 md:py-20 bg-background">
    <div className="container">
      <ScrollReveal className="text-center mb-14" variant="fade-scale">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">
          What Our Montreal Clients Say
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((r, i) => (
          <ScrollReveal key={r.name} delay={i * 0.15} variant="flip-y" duration={0.5}>
            <div className="bg-secondary rounded-lg p-9 border-l-4 border-primary h-full flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground text-sm leading-relaxed italic flex-1 mb-6">"{r.text}"</p>
              <div>
                <p className="font-bold text-primary text-base">{r.name}</p>
                <p className="text-muted-foreground text-sm">{r.location}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
