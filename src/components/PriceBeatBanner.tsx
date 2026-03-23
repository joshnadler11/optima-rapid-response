import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const PriceBeatBanner = () => (
  <section className="py-16 md:py-20 bg-primary">
    <div className="container">
      <ScrollReveal>
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <ShieldCheck className="w-20 h-20 md:w-24 md:h-24 text-accent flex-shrink-0" />
          <div className="text-center md:text-left flex-1">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-3">
              Got a Lower Quote? We'll Beat It.
            </h2>
            <p className="text-primary-foreground/80 text-base md:text-lg leading-relaxed max-w-2xl">
              Show us any written quote from a licensed competitor and we guarantee to beat their price — no exceptions.
              That is the Optima standard.
            </p>
          </div>
          <Link
            to="/quote"
            className="flex-shrink-0 flex items-center justify-center bg-accent text-accent-foreground font-bold text-lg px-8 h-14 rounded-md hover:brightness-110 transition-all active:scale-[0.97] shadow-lg shadow-accent/30"
          >
            Claim Your Free Quote
          </Link>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default PriceBeatBanner;
