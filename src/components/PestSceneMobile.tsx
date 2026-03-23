import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

const bugs = ['🪳', '🐜', '🪲', '🕷️', '🪳', '🐜'];

export default function PestSceneMobile() {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  const [scattered, setScattered] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const hasTriggered = useRef(false);

  const runAnimation = useCallback(() => {
    setTriggered(true);
    setScattered(false);
    setShowText(false);
    setShowButton(false);
    // Bugs crawl in for ~0.8s, then shield drops and bugs scatter
    setTimeout(() => setScattered(true), 800);
    setTimeout(() => setShowText(true), 1400);
    setTimeout(() => setShowButton(true), 1900);
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

  // Scatter directions for each bug
  const scatterTransforms = [
    'translate(-200px, -120px) rotate(-340deg)',
    'translate(220px, -80px) rotate(290deg)',
    'translate(-180px, 100px) rotate(-260deg)',
    'translate(200px, 130px) rotate(310deg)',
    'translate(-250px, -40px) rotate(-380deg)',
    'translate(230px, -110px) rotate(350deg)',
  ];

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden flex flex-col items-center justify-center"
      style={{ backgroundColor: '#0D2B1E', minHeight: '360px', padding: '2rem 1rem' }}
    >
      {/* Bug + shield arena */}
      <div className="relative w-full max-w-xs h-40 flex items-center justify-center mb-6">
        {/* Bugs */}
        {bugs.map((emoji, i) => (
          <span
            key={i}
            className="absolute text-3xl"
            style={{
              left: `${10 + i * 14}%`,
              bottom: '10%',
              transform: triggered && !scattered
                ? 'translateX(0)'
                : scattered
                ? scatterTransforms[i]
                : 'translateX(-120px)',
              opacity: triggered && !scattered ? 1 : scattered ? 0 : 0,
              transition: scattered
                ? 'transform 0.6s cubic-bezier(0.2,1,0.3,1), opacity 0.4s ease-out 0.2s'
                : 'transform 0.6s cubic-bezier(0.16,1,0.3,1) ' + (i * 0.08) + 's, opacity 0.3s ease-out ' + (i * 0.08) + 's',
            }}
          >
            {emoji}
          </span>
        ))}

        {/* Shield */}
        <div
          className="absolute text-7xl select-none"
          style={{
            transform: scattered ? 'translateY(0) scale(1)' : 'translateY(-100px) scale(0.5)',
            opacity: scattered ? 1 : 0,
            transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease-out',
            filter: scattered ? 'drop-shadow(0 0 16px rgba(232, 93, 36, 0.6))' : 'none',
            lineHeight: 1,
          }}
        >
          🛡️
        </div>
      </div>

      {/* Text */}
      <h3
        className="font-display text-2xl font-bold text-primary-foreground text-center mb-4"
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
        className="inline-flex items-center justify-center bg-accent text-accent-foreground font-bold text-lg px-8 h-14 rounded-md hover:brightness-110 transition-all active:scale-[0.97] shadow-lg shadow-accent/30 animate-cta-pulse"
        style={{
          opacity: showButton ? 1 : 0,
          transform: showButton ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
        }}
      >
        Get a Free Quote
      </Link>

      {/* Replay */}
      <button
        onClick={replay}
        className="absolute bottom-3 right-3 z-20 bg-muted-foreground/20 hover:bg-muted-foreground/40 text-primary-foreground text-xs font-medium px-3 py-1.5 rounded-full transition-colors active:scale-95"
      >
        ↻ Replay
      </button>
    </section>
  );
}
