import { CheckCircle } from 'lucide-react';

const badges = [
  'Licensed & Certified',
  'Fully Insured',
  'Same-Day Service',
  'Price Beat Guarantee',
];

const TrustBadges = () => (
  <section className="bg-primary" style={{ height: '90px' }}>
    <div className="container h-full">
      <div className="grid grid-cols-2 md:grid-cols-4 h-full">
        {badges.map((badge) => (
          <div key={badge} className="flex items-center justify-center gap-3">
            <CheckCircle className="w-6 h-6 text-accent flex-shrink-0" strokeWidth={2.5} />
            <span className="text-primary-foreground font-bold text-sm md:text-lg tracking-wide">{badge}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustBadges;
