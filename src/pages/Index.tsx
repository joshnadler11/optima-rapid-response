import EmergencyBar from '@/components/EmergencyBar';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustBadges from '@/components/TrustBadges';
import ServicesSection from '@/components/ServicesSection';
import HowItWorks from '@/components/HowItWorks';
import PestEliminationSection from '@/components/PestEliminationSection';
import PriceBeatBanner from '@/components/PriceBeatBanner';
import Testimonials from '@/components/Testimonials';
import ServiceAreas from '@/components/ServiceAreas';
import ContactQuoteForm from '@/components/ContactQuoteForm';
import SiteFooter from '@/components/SiteFooter';
import FloatingButtons from '@/components/FloatingButtons';
import LoadingScreen from '@/components/LoadingScreen';

const Index = () => (
  <>
    <LoadingScreen />
    <EmergencyBar />
    <Navbar />
    <Hero />
    <TrustBadges />
    <ServicesSection />
    <HowItWorks />
    <PestEliminationSection />
    <PriceBeatBanner />
    <Testimonials />
    <ServiceAreas />
    <ContactQuoteForm />
    <SiteFooter />
    <FloatingButtons />
  </>
);

export default Index;
