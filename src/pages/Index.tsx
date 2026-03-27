import { lazy, Suspense } from 'react';
import SEOHead from '@/components/SEOHead';
import EmergencyBar from '@/components/EmergencyBar';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustBadges from '@/components/TrustBadges';
import FloatingButtons from '@/components/FloatingButtons';
import LoadingScreen from '@/components/LoadingScreen';

// Lazy load below-the-fold sections
const StatsCounterSection = lazy(() => import('@/components/StatsCounterSection'));
const ServicesSection = lazy(() => import('@/components/ServicesSection'));
const HowItWorks = lazy(() => import('@/components/HowItWorks'));
const PestEliminationSection = lazy(() => import('@/components/PestEliminationSection'));
const PriceBeatBanner = lazy(() => import('@/components/PriceBeatBanner'));
const Testimonials = lazy(() => import('@/components/Testimonials'));
const ServiceAreas = lazy(() => import('@/components/ServiceAreas'));
const ContactQuoteForm = lazy(() => import('@/components/ContactQuoteForm'));
const SiteFooter = lazy(() => import('@/components/SiteFooter'));

const SectionFallback = () => <div className="py-20" />;

const Index = () => (
  <>
    <SEOHead
      title="Extermination Montréal | Same-Day Service | Optima Extermination"
      description="Certified pest control in Montreal. Bed bugs, cockroaches, rodents & more. Same-day service. We beat any quote. Call (514) 458-0805."
      canonical="/"
    />
    <LoadingScreen />
    <EmergencyBar />
    <Navbar />
    <Hero />
    <TrustBadges />
    <Suspense fallback={<SectionFallback />}>
      <StatsCounterSection />
      <ServicesSection />
      <HowItWorks />
      <PestEliminationSection />
      <PriceBeatBanner />
      <Testimonials />
      <ServiceAreas />
      <ContactQuoteForm />
      <SiteFooter />
    </Suspense>
    <FloatingButtons />
  </>
);

export default Index;
