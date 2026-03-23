import { useEffect, useRef, useState, ReactNode, useCallback } from 'react';

/* ─── reduced motion hook ─── */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mql.matches);
    const handler = () => setReduced(mql.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);
  return reduced;
}

/* ─── base observer hook ─── */
function useInView(threshold = 0.15) {
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
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ─── types ─── */
type AnimVariant =
  | 'fade-up'
  | 'fade-scale'
  | 'slide-right'
  | 'slide-left'
  | 'slide-down'
  | 'flip-y'
  | 'spring-drop';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: AnimVariant;
  duration?: number;
}

/* ─── variant config ─── */
function getStyles(variant: AnimVariant, visible: boolean, delay: number, duration: number) {
  const base = {
    transition: `opacity ${duration}s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform ${duration}s cubic-bezier(0.16,1,0.3,1) ${delay}s, filter ${duration}s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  };

  switch (variant) {
    case 'fade-up':
      return {
        ...base,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        filter: visible ? 'blur(0px)' : 'blur(4px)',
      };
    case 'fade-scale':
      return {
        ...base,
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.95)',
        filter: visible ? 'blur(0px)' : 'blur(3px)',
      };
    case 'slide-right':
      return {
        ...base,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(60px)',
      };
    case 'slide-left':
      return {
        ...base,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(-60px)',
      };
    case 'slide-down':
      return {
        ...base,
        transition: `opacity ${duration}s cubic-bezier(0.34,1.56,0.64,1) ${delay}s, transform ${duration}s cubic-bezier(0.34,1.56,0.64,1) ${delay}s`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-40px)',
      };
    case 'flip-y':
      return {
        ...base,
        transition: `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'perspective(800px) rotateY(0deg)' : 'perspective(800px) rotateY(90deg)',
        transformStyle: 'preserve-3d' as const,
      };
    case 'spring-drop':
      return {
        ...base,
        transition: `opacity ${duration}s cubic-bezier(0.34,1.56,0.64,1) ${delay}s, transform ${duration}s cubic-bezier(0.34,1.56,0.64,1) ${delay}s`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(-40px) scale(0.95)',
      };
    default:
      return {
        ...base,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
      };
  }
}

const ScrollReveal = ({
  children,
  className = '',
  delay = 0,
  variant = 'fade-up',
  duration = 0.6,
}: ScrollRevealProps) => {
  const { ref, visible } = useInView(0.15);
  const reducedMotion = usePrefersReducedMotion();

  const styles = reducedMotion
    ? { opacity: 1, transform: 'none', filter: 'none' }
    : getStyles(variant, visible, delay, duration);

  return (
    <div ref={ref} className={className} style={styles}>
      {children}
    </div>
  );
};

export default ScrollReveal;
export { useInView, usePrefersReducedMotion };
