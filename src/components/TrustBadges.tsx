import { CheckCircle } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { usePrefersReducedMotion } from './ScrollReveal';

const badges = [
  'Licensed & Certified',
  'Fully Insured',
  'Same-Day Service',
  'Price Beat Guarantee',
];

const TrustBadges = () => {
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
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Badges 0,2 slide from left; badges 1,3 slide from right
  const getSlideDirection = (i: number) => (i % 2 === 0 ? -40 : 40);

  return (
    <section
      ref={ref}
      className="bg-primary"
      style={{ height: '90px' }}
      aria-label="Trust badges"
    >
      <div className="container h-full">
        <div className="grid grid-cols-2 md:grid-cols-4 h-full">
          {badges.map((badge, i) => (
            <div
              key={badge}
              className="flex items-center justify-center gap-3"
              style={{
                willChange: 'transform, opacity',
                opacity: reduced || visible ? 1 : 0,
                transform: reduced || visible ? 'translateX(0)' : `translateX(${getSlideDirection(i)}px)`,
                transition: reduced ? 'none' : `opacity 0.4s cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s, transform 0.4s cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s`,
              }}
            >
              <CheckCircle className="w-6 h-6 text-accent flex-shrink-0" strokeWidth={2.5} />
              <span className="text-primary-foreground font-bold text-sm md:text-lg tracking-wide">{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
