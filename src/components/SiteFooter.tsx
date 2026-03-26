import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const SiteFooter = () => (
  <footer className="bg-primary text-primary-foreground">
    <ScrollReveal>
      <div className="container py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="font-display text-2xl font-bold mb-1">OPTIMA EXTERMINATION</h3>
            <p className="text-primary-foreground/70 text-sm mb-4">Fast. Discreet. Guaranteed.</p>
            <div className="flex gap-3">
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors"><Facebook className="w-4 h-4" /></a>
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors"><Instagram className="w-4 h-4" /></a>
            </div>
          </div>
          <div>
            <h4 className="font-display text-lg font-bold mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {[{ label: 'Home', to: '/' }, { label: 'Services', to: '/services' }, { label: 'About', to: '/about' }, { label: 'Contact', to: '/contact' }, { label: 'Quote', to: '/quote' }].map((link) => (
                <Link key={link.to} to={link.to} className="text-primary-foreground/70 text-sm hover:text-accent transition-colors">{link.label}</Link>
              ))}
            </nav>
          </div>
          <div>
            <h4 className="font-display text-lg font-bold mb-4">Contact</h4>
            <div className="space-y-3">
              <a href="tel:5144580805" className="flex items-center gap-2 text-sm hover:text-accent transition-colors"><Phone className="w-4 h-4 text-accent" /> (514) 458-0805</a>
              <a href="tel:5145883113" className="flex items-center gap-2 text-sm hover:text-accent transition-colors"><Phone className="w-4 h-4 text-accent" /> (514) 588-3113</a>
              <a href="mailto:optimaextermination@gmail.com" className="flex items-center gap-2 text-sm hover:text-accent transition-colors"><Mail className="w-4 h-4 text-accent" /> optimaextermination@gmail.com</a>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/70"><MapPin className="w-4 h-4 text-accent" /> Montreal, QC</div>
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
    <div className="bg-primary/80 border-t border-primary-foreground/10 py-4">
      <div className="container text-center text-primary-foreground/50 text-xs">© 2025 Optima Extermination. All rights reserved.</div>
    </div>
  </footer>
);

export default SiteFooter;
