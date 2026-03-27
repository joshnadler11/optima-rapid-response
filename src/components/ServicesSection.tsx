import { useRef, useState, useCallback, MouseEvent as ReactMouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Bug, Rat, Antenna, CircleDot, Zap, Shield } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { useIsMobile } from '@/hooks/use-mobile';
import teamActionImg from '@/assets/team-action-1.jpg';

const services = [
  { icon: Bug, title: 'Bed Bug Removal', desc: 'Complete elimination using heat treatment and proven methods.', bobDuration: 3.2 },
  { icon: CircleDot, title: 'Cockroach Extermination', desc: 'Targeted treatment that eliminates colonies at the source.', bobDuration: 2.8 },
  { icon: Antenna, title: 'Ant Control', desc: 'Colony elimination with long-lasting barrier protection.', bobDuration: 3.5 },
  { icon: Rat, title: 'Rodent Control', desc: 'Effective removal with sealed entry points and monitoring.', bobDuration: 3.0 },
  { icon: Zap, title: 'Wasp & Hornet Removal', desc: 'Safe nest removal with emergency same-day service.', bobDuration: 2.6 },
  { icon: Shield, title: 'General Pest Control', desc: 'Comprehensive management for spiders, silverfish, and more.', bobDuration: 3.8 },
];

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
    setTilt({ x: (y - 0.5) * -8, y: (x - 0.5) * 8 });
    setShine({ x: x * 100, y: y * 100 });
  }, [isMobile]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setIsHovered(false); }}
      onMouseEnter={() => setIsHovered(true)}
      className="relative"
      style={{ perspective: '800px', animation: `card-bob ${bobDuration}s ease-in-out infinite`, animationDelay: `${index * 0.3}s` }}
    >
      <div
        className="relative group bg-background border border-border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-foreground/5"
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out' }}
      >
        {isHovered && !isMobile && (
          <div className="absolute inset-0 pointer-events-none z-10 rounded-lg" style={{ background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.15) 0%, transparent 60%)` }} />
        )}
        {children}
      </div>
    </div>
  );
}

const ServicesSection = () => (
  <section className="py-12 md:py-20 bg-background" aria-labelledby="services-heading">
    <div className="container">
      <ScrollReveal className="text-center mb-14" variant="fade-scale" duration={0.5} divider>
        <h2 id="services-heading" className="font-display text-3xl md:text-4xl font-bold text-primary">
          Pest Control Services in Greater Montreal
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-start">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 0.08}>
              <TiltCard bobDuration={s.bobDuration} index={i}>
                <div className="h-1 bg-accent" />
                <div className="p-7">
                  <s.icon className="w-10 h-10 text-accent mb-4" />
                  <h3 className="font-display text-xl font-bold text-primary mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{s.desc}</p>
                  <Link to="/quote" className="text-accent font-bold text-sm hover:underline inline-flex items-center gap-1 transition-colors">
                    Book Now →
                  </Link>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Team in action photo */}
      <ScrollReveal className="mt-12" delay={0.3}>
        <div className="rounded-xl overflow-hidden shadow-lg max-w-2xl mx-auto">
          <img src={teamActionImg} alt="Optima technician treating a home" loading="lazy" width={800} height={544} className="w-full h-auto object-cover" />
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default ServicesSection;
