import { lazy, Suspense } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import ScrollReveal from './ScrollReveal';

const PestScene3D = lazy(() => import('./PestScene3D'));
const PestSceneMobile = lazy(() => import('./PestSceneMobile'));

export default function PestEliminationSection() {
  const isMobile = useIsMobile();

  return (
    <ScrollReveal>
      <div className="w-full">
        <div className="text-center py-10 bg-[hsl(154,43%,8%)]">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground tracking-tight">
            We Eliminate Pests. Every Time.
          </h2>
        </div>
        <Suspense
          fallback={
            <div
              className="w-full flex items-center justify-center"
              style={{ height: isMobile ? '360px' : '520px', backgroundColor: '#0D2B1E' }}
            >
              <div className="text-primary-foreground/50 font-medium">Loading...</div>
            </div>
          }
        >
          {isMobile ? <PestSceneMobile /> : <PestScene3D />}
        </Suspense>
      </div>
    </ScrollReveal>
  );
}
