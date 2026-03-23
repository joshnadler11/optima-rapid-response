import { Phone, MessageCircle } from 'lucide-react';

const FloatingButtons = () => (
  <>
    {/* WhatsApp - bottom left */}
    <a
      href="https://wa.me/15144580805"
      target="_blank"
      rel="noopener noreferrer"
      className="md:hidden fixed bottom-5 left-5 z-50 flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 active:scale-95 transition-transform"
      style={{ width: '56px', height: '56px' }}
      aria-label="WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
    {/* Call - bottom right */}
    <a
      href="tel:+15144580805"
      className="md:hidden fixed bottom-5 right-5 z-50 flex items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg shadow-accent/30 active:scale-95 transition-transform"
      style={{ width: '56px', height: '56px' }}
      aria-label="Call Now"
    >
      <Phone className="w-6 h-6" />
    </a>
  </>
);

export default FloatingButtons;
