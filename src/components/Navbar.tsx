import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  return (
    <nav
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-background shadow-lg shadow-foreground/5' : 'bg-primary/90 backdrop-blur-sm'
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-[72px]">
        <Link to="/" className="flex items-center gap-2">
          <span className={`font-display text-xl md:text-2xl font-bold tracking-tight ${scrolled ? 'text-primary' : 'text-primary-foreground'}`}>
            OPTIMA
          </span>
          <span className={`hidden sm:inline font-display text-xl md:text-2xl font-light tracking-tight ${scrolled ? 'text-accent' : 'text-accent'}`}>
            EXTERMINATION
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-semibold uppercase tracking-wide transition-colors hover:text-accent ${
                scrolled ? 'text-foreground' : 'text-primary-foreground'
              } ${location.pathname === link.to ? 'text-accent' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="tel:5144580805"
            className="hidden md:flex items-center gap-2 bg-accent text-accent-foreground font-bold text-sm px-5 h-11 rounded-md hover:brightness-110 transition-all active:scale-[0.97]"
          >
            <Phone className="w-4 h-4" />
            Call Now: (514) 458-0805
          </a>
          <a
            href="tel:5144580805"
            className="md:hidden flex items-center gap-1.5 bg-accent text-accent-foreground font-bold text-xs px-3 h-10 rounded-md active:scale-[0.97]"
          >
            <Phone className="w-3.5 h-3.5" />
            Call
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 transition-colors ${scrolled ? 'text-foreground' : 'text-primary-foreground'}`}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-background border-t border-border animate-fade-up">
          <div className="container py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="py-3 px-4 text-foreground font-semibold uppercase text-sm tracking-wide rounded-md hover:bg-secondary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/quote"
              className="py-3 px-4 text-accent font-bold uppercase text-sm tracking-wide rounded-md hover:bg-secondary transition-colors"
            >
              Get a Free Quote
            </Link>
            <a
              href="tel:5144580805"
              className="mt-3 flex items-center justify-center gap-2 bg-accent text-accent-foreground font-bold text-lg h-14 rounded-md active:scale-[0.97]"
            >
              <Phone className="w-5 h-5" />
              (514) 458-0805
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
