import { useState } from 'react';
import { X, Phone } from 'lucide-react';

const EmergencyBar = () => {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="bg-emergency w-full py-2.5 px-4 relative z-50">
      <div className="container flex items-center justify-center gap-2 text-emergency-foreground">
        <Phone className="w-4 h-4 flex-shrink-0" />
        <span className="text-sm md:text-base font-bold text-center">
          Pest Emergency? We Answer 24/7 —{' '}
          <a href="tel:5144580805" className="underline hover:no-underline">
            Call (514) 458-0805
          </a>
        </span>
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 transition-opacity text-emergency-foreground"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default EmergencyBar;
