import { useEffect, useRef, useState, useCallback } from 'react';

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  triggered: boolean;
}

export default function AnimatedCounter({ end, suffix = '', prefix = '', duration = 2000, triggered }: AnimatedCounterProps) {
  const [value, setValue] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!triggered || hasRun.current) return;
    hasRun.current = true;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic — starts fast, slows at end
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [triggered, end, duration]);

  return (
    <span>
      {prefix}{value}{suffix}
    </span>
  );
}
