import { lazy, Suspense, useRef, useState, useEffect } from 'react';
import AnimatedCounter from './AnimatedCounter';
import { useIsMobile } from '@/hooks/use-mobile';
import ScrollReveal, { usePrefersReducedMotion } from './ScrollReveal';

const StatsBackground3D = lazy(() => import('./StatsBackground3D'));

const stats = [
  { end: 500, suffix: '+', label: 'Clients Served' },
  { end: 24, suffix: '/7', label: 'Availability' },
  { end: 100, suffix: '%', label: 'Satisfaction Guaranteed' },
  { end: 15, suffix: ' Min', label: 'Avg Response Time' },
];

export default function StatsCounterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  const [lineVisible, setLineVisible] = useState(false);
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          setTimeout(() => setLineVisible(true), reduced ? 0 : 2100);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <section ref={ref} className="relative bg-primary py-16 md:py-20 overflow-hidden">
      {!isMobile && (
        <Suspense fallback={null}>
          <StatsBackground3D />
        </Suspense>
      )}

      <div className="container relative z-10">
        <ScrollReveal divider className="mb-8">
          <span />
        </ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center"
              style={{
                willChange: 'transform, opacity',
                opacity: reduced || triggered ? 1 : 0,
                transform: reduced || triggered
                  ? 'perspective(1000px) rotateX(0deg) translateY(0)'
                  : 'perspective(1000px) rotateX(4deg) translateY(24px)',
                transition: reduced ? 'none' : `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.08}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.08}s`,
              }}
            >
              <div className="font-display font-bold text-primary-foreground leading-none" style={{ fontSize: 'clamp(40px, 8vw, 64px)' }}>
                <AnimatedCounter end={stat.end} suffix="" triggered={triggered} duration={2000} />
                <span className="text-accent">{stat.suffix}</span>
              </div>
              <div className="relative h-0.5 mx-auto mt-3 mb-3" style={{ maxWidth: '60px' }}>
                <div
                  className="absolute inset-0 bg-accent rounded-full"
                  style={{
                    transform: lineVisible ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: reduced ? 'none' : `transform 0.8s cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s`,
                  }}
                />
              </div>
              <p className="text-primary-foreground/80 text-sm md:text-base font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
