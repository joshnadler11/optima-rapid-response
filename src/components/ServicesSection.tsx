import { useRef, useState, useCallback, MouseEvent as ReactMouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Bug, Rat, Antenna, CircleDot, Zap, Shield } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { useIsMobile } from '@/hooks/use-mobile';

const services = [
  {
    icon: Bug,
    title: 'Bed Bug Removal',
    desc: 'Complete bed bug elimination using heat treatment and proven chemical methods. We ensure every egg and adult is destroyed.',
    bobDuration: 3.2,
  },
  {
    icon: CircleDot,
    title: 'Cockroach Extermination',
    desc: 'Targeted cockroach treatment that eliminates colonies at the source. We seal entry points and prevent future infestations.',
    bobDuration: 2.8,
  },
  {
    icon: Antenna,
    title: 'Ant Control',
    desc: 'Professional ant colony elimination for carpenter ants, pavement ants, and more. Long-lasting barrier protection included.',
    bobDuration: 3.5,
  },
  {
    icon: Rat,
    title: 'Rodent Control',
    desc: 'Humane and effective rodent removal for mice and rats. We seal all entry points and install monitoring stations.',
    bobDuration: 3.0,
  },
  {
    icon: Zap,
    title: 'Wasp & Hornet Removal',
    desc: 'Safe removal of wasp and hornet nests from your property. Emergency same-day service available for active nests.',
    bobDuration: 2.6,
  },
  {
    icon: Shield,
    title: 'General Pest Control',
    desc: 'Comprehensive pest management for spiders, silverfish, earwigs, and more. Preventive treatments to keep your home pest-free.',
    bobDuration: 3.8,
  },
];

/* ─── 3D tilt card ─── */
function TiltCard({ children, bobDuration, index }: { children: React.ReactNode; bobDuration: number; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();

  const handleMouseMove = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (y - 0.5) * -8,
      y: (x - 0.5) * 8,
    });
    setShine({ x: x * 100, y: y * 100 });
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className="relative"
      style={{
        perspective: '800px',
        animation: `card-bob ${bobDuration}s ease-in-out infinite`,
        animationDelay: `${index * 0.3}s`,
      }}
    >
      <div
        className="relative group bg-background border border-border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-foreground/5"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out',
        }}
      >
        {/* Shine overlay */}
        {isHovered && !isMobile && (
          <div
            className="absolute inset-0 pointer-events-none z-10 rounded-lg"
            style={{
              background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
            }}
          />
        )}
        {children}
      </div>
    </div>
  );
}

const ServicesSection = () => (
  <section className="py-12 md:py-20 bg-background">
    <div className="container">
      <ScrollReveal className="text-center mb-14" variant="fade-scale" duration={0.5}>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">
          Complete Pest Control Services in Greater Montreal
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <ScrollReveal key={s.title} delay={i * 0.1}>
            <TiltCard bobDuration={s.bobDuration} index={i}>
              <div className="h-1 bg-accent" />
              <div className="p-7">
                <s.icon className="w-10 h-10 text-accent mb-4" />
                <h3 className="font-display text-xl font-bold text-primary mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{s.desc}</p>
                <Link
                  to="/quote"
                  className="text-accent font-bold text-sm hover:underline inline-flex items-center gap-1 transition-colors"
                >
                  Book Now →
                </Link>
              </div>
            </TiltCard>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
