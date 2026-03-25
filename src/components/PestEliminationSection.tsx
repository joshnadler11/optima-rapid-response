import { lazy, Suspense } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import ScrollReveal, { useInView, usePrefersReducedMotion } from './ScrollReveal';

const PestScene3D = lazy(() => import('./PestScene3D'));
const PestSceneMobile = lazy(() => import('./PestSceneMobile'));

export default function PestEliminationSection() {
  const isMobile = useIsMobile();
  const { ref: gradientRef, visible: gradientVisible } = useInView(0.05);
  const reduced = usePrefersReducedMotion();

  return (
    <div
      ref={gradientRef}
      style={{
        background: reduced || gradientVisible
          ? 'hsl(154, 43%, 8%)'
          : 'hsl(38, 42%, 96%)',
        transition: reduced ? 'none' : 'background 0.8s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      <ScrollReveal>
        <div className="w-full">
          <div className="text-center py-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground tracking-tight">
              We Eliminate Pests. Every Time.
            </h2>
          </div>
          <Suspense
            fallback={
              <div
                className="w-full flex items-center justify-center"
                style={{ height: isMobile ? '360px' : '520px', backgroundColor: 'hsl(154, 43%, 8%)' }}
              >
                <div className="text-primary-foreground/50 font-medium">Loading...</div>
              </div>
            }
          >
            {isMobile ? <PestSceneMobile /> : <PestScene3D />}
          </Suspense>
        </div>
      </ScrollReveal>
    </div>
  );
}
