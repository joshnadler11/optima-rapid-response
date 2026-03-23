import EmergencyBar from '@/components/EmergencyBar';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';
import FloatingButtons from '@/components/FloatingButtons';
import ContactQuoteForm from '@/components/ContactQuoteForm';
import ServiceAreas from '@/components/ServiceAreas';

const Contact = () => (
  <>
    <EmergencyBar />
    <Navbar />
    <section className="bg-primary py-20">
      <div className="container text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Contact Us</h1>
        <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
          Get in touch for a free quote. We respond within 30 minutes, 24/7.
        </p>
      </div>
    </section>
    <ContactQuoteForm />
    <ServiceAreas />
    <SiteFooter />
    <FloatingButtons />
  </>
);

export default Contact;
