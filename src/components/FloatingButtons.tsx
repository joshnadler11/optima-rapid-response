import { Phone, MessageCircle } from 'lucide-react';

const FloatingButtons = () => (
  <>
    {/* WhatsApp - bottom left */}
    <a
      href="https://wa.me/15144580805"
      target="_blank"
      rel="noopener noreferrer"
      className="md:hidden fixed bottom-5 left-5 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-black/20 active:scale-95 transition-transform"
      aria-label="WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
    {/* Call - bottom right */}
    <a
      href="tel:5144580805"
      className="md:hidden fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-lg shadow-accent/30 active:scale-95 transition-transform"
      aria-label="Call Now"
    >
      <Phone className="w-6 h-6" />
    </a>
  </>
);

export default FloatingButtons;
