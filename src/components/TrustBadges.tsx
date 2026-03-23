import { CheckCircle } from 'lucide-react';

const badges = [
  'Licensed & Certified',
  'Fully Insured',
  'Same-Day Service',
  'Price Beat Guarantee',
];

const TrustBadges = () => (
  <section className="bg-primary py-6">
    <div className="container">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0">
        {badges.map((badge) => (
          <div key={badge} className="flex items-center justify-center gap-2.5 py-2">
            <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
            <span className="text-primary-foreground font-bold text-sm md:text-base">{badge}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustBadges;
