import { Star } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import happyClientImg from '@/assets/happy-client.jpg';

const reviews = [
  { text: 'Optima responded fastest, beat the lowest price, and showed up same afternoon. Highly recommend.', name: 'Sarah L.', location: 'Montreal' },
  { text: "They didn't just beat the price — they explained what the competitor missed. Haven't seen a trace since.", name: 'Karim B.', location: 'Laval' },
  { text: 'My go-to for all rental units. Quick, professional, fair pricing every time.', name: 'Roberto M.', location: 'Plateau' },
];

const Testimonials = () => (
  <section className="py-12 md:py-20 bg-background">
    <div className="container">
      <ScrollReveal className="text-center mb-14" variant="fade-scale" divider>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">
          What Our Clients Say
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((r, i) => (
          <ScrollReveal key={r.name} delay={i * 0.15} variant="flip-y" duration={0.55}>
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

      {/* Happy client photo */}
      <ScrollReveal className="mt-12" delay={0.3}>
        <div className="rounded-xl overflow-hidden shadow-lg max-w-md mx-auto">
          <img src={happyClientImg} alt="Satisfied client in pest-free home" loading="lazy" width={800} height={544} className="w-full h-auto object-cover" />
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default Testimonials;
