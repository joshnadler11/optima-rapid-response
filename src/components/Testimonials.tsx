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
  <section className="py-20 md:py-28 bg-background">
    <div className="container">
      <ScrollReveal className="text-center mb-14">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">
          What Our Montreal Clients Say
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((r, i) => (
          <ScrollReveal key={r.name} delay={i * 0.1}>
            <div className="bg-secondary rounded-lg p-7 border-l-4 border-primary h-full flex flex-col">
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground text-sm leading-relaxed italic flex-1 mb-5">"{r.text}"</p>
              <div>
                <p className="font-bold text-primary text-sm">{r.name}</p>
                <p className="text-muted-foreground text-xs">{r.location}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
