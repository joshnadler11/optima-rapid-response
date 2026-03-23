import { useState, useEffect } from 'react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Check if already loaded this session
    if (sessionStorage.getItem('optima-loaded')) {
      setVisible(false);
      return;
    }

    const start = Date.now();
    const duration = 1500;

    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / duration, 1);
      setProgress(p);
      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem('optima-loaded', '1');
        setFading(true);
        setTimeout(() => setVisible(false), 500);
      }
    };

    requestAnimationFrame(tick);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-primary"
      style={{
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.5s ease-out',
      }}
    >
      <div className="text-center mb-12">
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-wider">
          <span className="text-primary-foreground">OPTIMA</span>{' '}
          <span className="text-accent">EXTERMINATION</span>
        </h1>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-foreground/10">
        <div
          className="h-full bg-accent"
          style={{
            width: `${progress * 100}%`,
            transition: 'width 0.05s linear',
          }}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
