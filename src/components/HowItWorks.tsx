import { ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const steps = [
  {
    num: '01',
    title: 'Call or Book Online',
    desc: 'Contact us anytime. We answer 24 hours a day, 7 days a week and respond within 30 minutes.',
  },
  {
    num: '02',
    title: 'Same-Day Inspection',
    desc: 'A licensed technician arrives fast, assesses the problem, and explains your options with full transparency.',
  },
  {
    num: '03',
    title: 'Fast & Discreet Treatment',
    desc: 'We eliminate the problem completely using safe, proven methods — with zero judgment and full confidentiality.',
  },
];

const HowItWorks = () => (
  <section className="py-20 md:py-28 bg-secondary">
    <div className="container">
      <ScrollReveal className="text-center mb-14">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">
          Getting Rid of Pests Has Never Been Easier
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-start">
        {steps.map((step, i) => (
          <ScrollReveal key={step.num} delay={i * 0.15} className="flex items-start gap-4 md:gap-0 md:flex-col md:items-center md:text-center relative">
            <div>
              <span className="font-display text-5xl md:text-6xl font-bold text-accent/20 leading-none">{step.num}</span>
            </div>
            <div className="md:mt-4">
              <h3 className="font-display text-xl font-bold text-primary mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">{step.desc}</p>
            </div>
            {i < 2 && (
              <ArrowRight className="hidden md:block absolute -right-4 top-8 w-8 h-8 text-accent/30" />
            )}
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
