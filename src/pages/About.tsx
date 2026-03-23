import EmergencyBar from '@/components/EmergencyBar';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';
import FloatingButtons from '@/components/FloatingButtons';
import ContactQuoteForm from '@/components/ContactQuoteForm';
import ScrollReveal from '@/components/ScrollReveal';
import { CheckCircle, Shield, Clock, Truck } from 'lucide-react';

const values = [
  { icon: Shield, title: 'Licensed & Certified', desc: 'All technicians hold valid Quebec extermination permits and undergo continuous training.' },
  { icon: Clock, title: 'Same-Day Response', desc: 'We respond within 30 minutes and offer same-day service across Greater Montreal.' },
  { icon: Truck, title: 'Discreet Service', desc: 'Our unmarked vehicles and professional conduct ensure your privacy at all times.' },
  { icon: CheckCircle, title: 'Guaranteed Results', desc: "If pests return within the warranty period, we come back at no additional cost." },
];

const About = () => (
  <>
    <EmergencyBar />
    <Navbar />
    <section className="bg-primary py-20">
      <div className="container text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">About Optima Extermination</h1>
        <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
          Montreal's trusted pest control partner — fast, discreet, and guaranteed.
        </p>
      </div>
    </section>

    <section className="py-20 bg-background">
      <div className="container max-w-3xl">
        <ScrollReveal>
          <h2 className="font-display text-3xl font-bold text-primary mb-6">Why Optima?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Optima Extermination was founded with one mission: provide Montreal homeowners and businesses with pest control
            that is fast, honest, and effective. We understand that dealing with pests is stressful, which is why we prioritize
            rapid response, transparent pricing, and guaranteed results.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Every technician on our team is licensed by the Quebec government, fully insured, and trained to handle infestations
            of all types — from bed bugs and cockroaches to rodents and wasps. We arrive in unmarked vehicles to protect your
            privacy and treat every home with the respect it deserves.
          </p>
        </ScrollReveal>
      </div>
    </section>

    <section className="py-20 bg-secondary">
      <div className="container">
        <ScrollReveal className="text-center mb-14">
          <h2 className="font-display text-3xl font-bold text-primary">Our Values</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {values.map((v, i) => (
            <ScrollReveal key={v.title} delay={i * 0.1}>
              <div className="flex gap-4 bg-background rounded-lg p-6 border border-border">
                <v.icon className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-display text-lg font-bold text-primary mb-1">{v.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    <ContactQuoteForm />
    <SiteFooter />
    <FloatingButtons />
  </>
);

export default About;
