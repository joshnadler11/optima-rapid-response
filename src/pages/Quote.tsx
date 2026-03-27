import SEOHead from '@/components/SEOHead';
import EmergencyBar from '@/components/EmergencyBar';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';
import FloatingButtons from '@/components/FloatingButtons';
import ContactQuoteForm from '@/components/ContactQuoteForm';

const Quote = () => (
  <>
    <SEOHead
      title="Free Pest Control Quote | Optima Extermination Montreal"
      description="Get a free pest control quote in 30 minutes. Bed bugs, cockroaches, rodents — we beat any licensed competitor's price. Call (514) 458-0805."
      canonical="/quote"
    />
    <EmergencyBar />
    <Navbar />
    <section className="bg-primary py-20">
      <div className="container text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Free Quote</h1>
        <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
          Fill out the form below and we'll get back to you within 30 minutes with a detailed quote.
        </p>
      </div>
    </section>
    <ContactQuoteForm />
    <SiteFooter />
    <FloatingButtons />
  </>
);

export default Quote;
