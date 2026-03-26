import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

export default function PestSceneMobile() {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  const [showShield, setShowShield] = useState(false);
  const [showRing, setShowRing] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const hasTriggered = useRef(false);

  const runAnimation = useCallback(() => {
    setTriggered(true);
    setShowShield(false);
    setShowRing(false);
    setShowText(false);
    setShowButton(false);
    setTimeout(() => setShowShield(true), 300);
    setTimeout(() => setShowRing(true), 600);
    setTimeout(() => setShowText(true), 900);
    setTimeout(() => setShowButton(true), 1200);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true;
          runAnimation();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [runAnimation]);

  const replay = () => {
    setTriggered(false);
    setTimeout(() => runAnimation(), 50);
  };

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden flex flex-col items-center justify-center"
      style={{ backgroundColor: '#0D2B1E', minHeight: '360px', padding: '2rem 1rem' }}
    >
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${3 + Math.random() * 5}px`,
              height: `${3 + Math.random() * 5}px`,
              background: 'hsl(82, 85%, 45%)',
              opacity: triggered ? 0.4 : 0,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transition: `opacity 0.8s ease-out ${i * 0.05}s`,
              animation: triggered ? `float-particle ${3 + Math.random() * 4}s ease-in-out infinite ${i * 0.2}s` : 'none',
            }}
          />
        ))}
      </div>

      {/* Shield + pulse ring */}
      <div className="relative flex items-center justify-center mb-6" style={{ width: '120px', height: '120px' }}>
        {/* Pulse ring */}
        <div
          className="absolute rounded-full border-2"
          style={{
            borderColor: 'hsl(82, 85%, 45%)',
            width: showRing ? '200px' : '60px',
            height: showRing ? '200px' : '60px',
            opacity: showRing ? 0 : 0.6,
            transition: 'all 1.2s ease-out',
          }}
        />
        {/* Shield */}
        <div
          className="text-7xl select-none"
          style={{
            transform: showShield ? 'translateY(0) scale(1)' : 'translateY(-40px) scale(0.5)',
            opacity: showShield ? 1 : 0,
            transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease-out',
            filter: showShield ? 'drop-shadow(0 0 20px hsla(82, 85%, 45%, 0.5))' : 'none',
          }}
        >
          🛡️
        </div>
      </div>

      <h3
        className="font-display text-2xl font-bold text-primary-foreground text-center mb-4 relative z-10"
        style={{
          opacity: showText ? 1 : 0,
          transform: showText ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
        }}
      >
        Guaranteed Results. Every Time.
      </h3>

      <Link
        to="/quote"
        className="relative z-10 inline-flex items-center justify-center bg-accent text-accent-foreground font-bold text-lg px-8 h-14 rounded-md hover:brightness-110 transition-all active:scale-[0.97] shadow-lg shadow-accent/30 animate-cta-pulse"
        style={{
          opacity: showButton ? 1 : 0,
          transform: showButton ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
        }}
      >
        Get a Free Quote
      </Link>

      <button
        onClick={replay}
        className="absolute bottom-3 right-3 z-20 bg-muted-foreground/20 hover:bg-muted-foreground/40 text-primary-foreground text-xs font-medium px-3 py-1.5 rounded-full transition-colors active:scale-95"
      >
        ↻ Replay
      </button>

      <style>{`
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-8px) translateX(4px); }
          50% { transform: translateY(-3px) translateX(-3px); }
          75% { transform: translateY(-10px) translateX(2px); }
        }
      `}</style>
    </section>
  );
}
