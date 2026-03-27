import SEOHead from '@/components/SEOHead';
import EmergencyBar from '@/components/EmergencyBar';
import Navbar from '@/components/Navbar';
import ServicesSection from '@/components/ServicesSection';
import PriceBeatBanner from '@/components/PriceBeatBanner';
import ContactQuoteForm from '@/components/ContactQuoteForm';
import SiteFooter from '@/components/SiteFooter';
import FloatingButtons from '@/components/FloatingButtons';

const Services = () => (
  <>
    <SEOHead
      title="Pest Control Services Montreal | Optima Extermination"
      description="Bed bug removal, cockroach extermination, rodent control & more. Licensed technicians, same-day service across Greater Montreal. Free quotes."
      canonical="/services"
    />
    <EmergencyBar />
    <Navbar />
    <section className="bg-primary py-20">
      <div className="container text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Our Services</h1>
        <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
          Professional pest control solutions for homes and businesses across Greater Montreal.
        </p>
      </div>
    </section>
    <ServicesSection />
    <PriceBeatBanner />
    <ContactQuoteForm />
    <SiteFooter />
    <FloatingButtons />
  </>
);

export default Services;
