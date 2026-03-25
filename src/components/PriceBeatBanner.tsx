import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { usePrefersReducedMotion } from './ScrollReveal';

const PriceBeatBanner = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const headline = "Got a Lower Quote? We'll Beat It.";
  const words = headline.split(' ');

  return (
    <section
      ref={ref}
      className="py-16 md:py-20 bg-primary overflow-hidden"
      style={{
        willChange: 'transform, opacity',
        opacity: reduced || visible ? 1 : 0,
        transform: reduced || visible
          ? 'perspective(1000px) rotateX(0deg) translateY(0)'
          : 'perspective(1000px) rotateX(4deg) translateY(24px)',
        transition: reduced ? 'none' : 'opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      <div className="container">
        <div
          className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
          style={{
            opacity: reduced || visible ? 1 : 0,
            transform: reduced || visible ? 'translateX(0)' : 'translateX(60px)',
            transition: reduced ? 'none' : 'opacity 0.5s ease-out, transform 0.5s ease-out',
          }}
        >
          <div
            style={{
              transform: reduced || visible ? 'scale(1)' : 'scale(0.3)',
              opacity: reduced || visible ? 1 : 0,
              transition: reduced ? 'none' : 'transform 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.1s, opacity 0.4s ease-out 0.1s',
            }}
          >
            <ShieldCheck className="w-20 h-20 md:w-24 md:h-24 text-accent flex-shrink-0" />
          </div>
          <div className="text-center md:text-left flex-1">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-3">
              {words.map((word, i) => (
                <span
                  key={i}
                  className="inline-block mr-[0.3em]"
                  style={{
                    opacity: reduced || visible ? 1 : 0,
                    transform: reduced || visible ? 'translateY(0)' : 'translateY(8px)',
                    transition: reduced ? 'none' : `opacity 0.3s ease-out ${0.2 + i * 0.05}s, transform 0.3s ease-out ${0.2 + i * 0.05}s`,
                  }}
                >
                  {word}
                </span>
              ))}
            </h2>
            <p
              className="text-primary-foreground/80 text-base md:text-lg leading-relaxed max-w-2xl"
              style={{
                opacity: reduced || visible ? 1 : 0,
                transition: reduced ? 'none' : 'opacity 0.5s ease-out 0.6s',
              }}
            >
              Show us any written quote from a licensed competitor and we guarantee to beat their price — no exceptions.
              That is the Optima standard.
            </p>
          </div>
          <Link
            to="/quote"
            className="flex-shrink-0 flex items-center justify-center bg-accent text-accent-foreground font-bold text-lg px-8 h-14 rounded-md hover:brightness-110 transition-all active:scale-[0.97] shadow-lg shadow-accent/30"
            style={{
              opacity: reduced || visible ? 1 : 0,
              transform: reduced || visible ? 'translateY(0)' : 'translateY(12px)',
              transition: reduced ? 'none' : 'opacity 0.4s ease-out 0.7s, transform 0.4s ease-out 0.7s',
            }}
          >
            Claim Your Free Quote
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PriceBeatBanner;
