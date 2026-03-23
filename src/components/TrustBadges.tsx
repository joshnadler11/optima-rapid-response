import { CheckCircle } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const badges = [
  'Licensed & Certified',
  'Fully Insured',
  'Same-Day Service',
  'Price Beat Guarantee',
];

const TrustBadges = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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

  return (
    <section ref={ref} className="bg-primary" style={{ height: '90px' }}>
      <div className="container h-full">
        <div className="grid grid-cols-2 md:grid-cols-4 h-full">
          {badges.map((badge, i) => (
            <div
              key={badge}
              className="flex items-center justify-center gap-3"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s, transform 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s`,
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
