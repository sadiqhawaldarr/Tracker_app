import React, { memo } from 'react';

const formatEidTime = time => {
  if (!time) return 'Not set';
  const [hours = '0', minutes = '00'] = time.split(':');
  const numericHours = Number(hours);
  const period = numericHours >= 12 ? 'PM' : 'AM';
  const displayHours = numericHours % 12 || 12;
  return `${displayHours}:${minutes} ${period}`;
};

const HeroBanner = memo(function HeroBanner({ stats }) {
  const eidTimes = Object.keys(stats).sort();
  const totalMasjids = eidTimes.reduce((total, time) => total + (stats[time] ?? 0), 0);

  return (
    <section className="hero" aria-label="Eid Namaz hero section">
      <div className="hero__bg-pattern" aria-hidden="true" />
      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__content">
        <p className="hero__arabic">Eid Mubarak</p>

        <h1 className="hero__title">
          Bijapur <span className="hero__title-accent">Eid-ul-Adha Namaz Timing 2026</span>
        </h1>

        <p className="hero__subtitle">
          Eidgah & Masjid updates
        </p>

        <p className="hero__total" aria-live="polite">
          Total Masjids: <strong>{totalMasjids}</strong>
        </p>

        <div className="hero__pills" role="list" aria-label="Eid prayer time summary">
          {eidTimes.map(time => (
            <div key={time} className="hero__pill" role="listitem">
              <span className="hero__pill-time">{formatEidTime(time)}</span>
              <span className="hero__pill-count">
                {stats[time] ?? 0} Masjid{(stats[time] ?? 0) !== 1 ? 's' : ''}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default HeroBanner;
