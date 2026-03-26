import { ArrowRight } from 'lucide-react';
import ScrollReveal, { usePrefersReducedMotion } from './ScrollReveal';
import AnimatedCounter from './AnimatedCounter';
import { useRef, useState, useEffect } from 'react';

const steps = [
  { num: 1, title: 'Call or Book Online', desc: 'We answer 24/7 and respond within 30 minutes.' },
  { num: 2, title: 'Same-Day Inspection', desc: 'A licensed technician assesses and explains your options.' },
  { num: 3, title: 'Fast & Discreet Treatment', desc: 'We eliminate the problem completely with proven methods.' },
];

const HowItWorks = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  const [lineDrawn, setLineDrawn] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLineDrawn(true);
          setTimeout(() => setTriggered(true), reduced ? 0 : 650);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <section ref={ref} className="py-12 md:py-20 bg-secondary">
      <div className="container">
        <div className="relative h-[2px] mb-10 mx-auto" style={{ maxWidth: '100%' }}>
          <div className="absolute inset-0 rounded-full" style={{ background: 'hsl(154, 43%, 18%)', transform: reduced || lineDrawn ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'center', transition: reduced ? 'none' : 'transform 0.6s cubic-bezier(0.22,1,0.36,1)' }} />
        </div>

        <ScrollReveal className="text-center mb-10 md:mb-14" variant="fade-scale">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">
            Getting Rid of Pests Made Easy
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-start">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="flex items-start gap-4 md:gap-0 md:flex-col md:items-center md:text-center relative"
              style={{
                willChange: 'transform, opacity',
                opacity: reduced || triggered ? 1 : 0,
                transform: reduced || triggered ? 'perspective(1000px) rotateX(0deg) translateY(0)' : 'perspective(1000px) rotateX(4deg) translateY(24px)',
                transition: reduced ? 'none' : `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.15}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.15}s`,
              }}
            >
              <div>
                <span className="font-display text-5xl md:text-6xl font-bold text-accent leading-none">
                  0<AnimatedCounter end={step.num} triggered={triggered} duration={1200} />
                </span>
              </div>
              <div className="md:mt-4">
                <h3 className="font-display text-xl font-bold text-primary mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">{step.desc}</p>
              </div>
              {i < 2 && <ArrowRight className="hidden md:block absolute -right-4 top-8 w-8 h-8 text-accent/30" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
