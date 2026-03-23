import { useState } from 'react';
import { Phone, Mail, CheckCircle } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { toast } from 'sonner';

const ContactQuoteForm = () => {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', service: '', time: '', message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Quote request sent! We will contact you within 30 minutes.');
    setForm({ name: '', phone: '', email: '', service: '', time: '', message: '' });
  };

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [field]: e.target.value });

  return (
    <section id="quote-form" className="py-12 md:py-20 bg-secondary">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-xl overflow-hidden shadow-2xl shadow-foreground/10">
          {/* Left Info Panel — slides from left */}
          <ScrollReveal variant="slide-left" duration={0.5}>
            <div className="bg-primary p-8 md:p-12 text-primary-foreground h-full flex flex-col justify-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
                Get Your Free Quote in 30 Minutes
              </h2>
              <p className="text-primary-foreground/80 mb-8">
                We respond faster than any competitor — guaranteed.
              </p>

              <div className="space-y-4 mb-8">
                <a href="tel:5144580805" className="flex items-center gap-3 text-lg font-bold hover:text-accent transition-colors">
                  <Phone className="w-5 h-5 text-accent" /> (514) 458-0805
                </a>
                <a href="tel:5145883113" className="flex items-center gap-3 text-lg font-bold hover:text-accent transition-colors">
                  <Phone className="w-5 h-5 text-accent" /> (514) 588-3113
                </a>
                <a href="mailto:optimaextermination@gmail.com" className="flex items-center gap-3 text-sm hover:text-accent transition-colors">
                  <Mail className="w-5 h-5 text-accent" /> optimaextermination@gmail.com
                </a>
              </div>

              <div className="space-y-3">
                {['Licensed & Insured', 'Same-Day Availability', 'Price Beat Guarantee'].map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="font-semibold text-sm">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right Form — slides from right */}
          <ScrollReveal variant="slide-right" duration={0.5}>
            <form onSubmit={handleSubmit} className="bg-background p-8 md:p-12 h-full">
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-semibold text-foreground mb-1.5 block">Full Name</label>
                  <input required value={form.name} onChange={update('name')} className="w-full h-12 md:h-12 min-h-[52px] px-4 border border-border rounded-md bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-accent transition" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-1.5 block">Phone Number</label>
                  <input required type="tel" value={form.phone} onChange={update('phone')} className="w-full h-12 md:h-12 min-h-[52px] px-4 border border-border rounded-md bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-accent transition" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-1.5 block">Email Address</label>
                  <input required type="email" value={form.email} onChange={update('email')} className="w-full h-12 md:h-12 min-h-[52px] px-4 border border-border rounded-md bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-accent transition" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-1.5 block">Service Needed</label>
                  <select required value={form.service} onChange={update('service')} className="w-full h-12 md:h-12 min-h-[52px] px-4 border border-border rounded-md bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-accent transition">
                    <option value="">Select a service</option>
                    <option>Bed Bugs</option>
                    <option>Cockroaches</option>
                    <option>Ants</option>
                    <option>Rodents</option>
                    <option>Wasps</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-1.5 block">Preferred Contact Time</label>
                  <select required value={form.time} onChange={update('time')} className="w-full h-12 md:h-12 min-h-[52px] px-4 border border-border rounded-md bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-accent transition">
                    <option value="">Select a time</option>
                    <option>Morning</option>
                    <option>Afternoon</option>
                    <option>Evening</option>
                    <option>Anytime</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-1.5 block">Message (optional)</label>
                  <textarea value={form.message} onChange={update('message')} rows={3} className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-accent transition resize-none" />
                </div>
                <button
                  type="submit"
                  className="w-full bg-accent text-accent-foreground font-bold text-lg h-14 rounded-md hover:brightness-110 transition-all active:scale-[0.97] shadow-lg shadow-accent/20"
                >
                  Send My Free Quote Request
                </button>
                <p className="text-center text-muted-foreground text-xs">
                  🔒 Your information is 100% private and never shared.
                </p>
              </div>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ContactQuoteForm;
