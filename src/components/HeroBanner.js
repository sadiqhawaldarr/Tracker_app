import React, { memo } from 'react';

const EID_TIME_LABELS = { '07:00': '7:00 AM', '07:30': '7:30 AM', '08:00': '8:00 AM' };

const HeroBanner = memo(function HeroBanner({ stats }) {
  return (
    <section className="hero" aria-label="Eid Namaz hero section">
      <div className="hero__bg-pattern" aria-hidden="true" />
      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__content">
        <p className="hero__arabic">Eid Mubarak</p>

        <h1 className="hero__title">
          Find Your <span className="hero__title-accent">Eid Namaz</span> Masjid
        </h1>

        <p className="hero__subtitle">
          Discover nearby masjids, Eid prayer timings, and get directions all in one place.
        </p>

        <div className="hero__pills" role="list" aria-label="Eid prayer time summary">
          {Object.entries(EID_TIME_LABELS).map(([time, label]) => (
            <div key={time} className="hero__pill" role="listitem">
              <span className="hero__pill-time">{label}</span>
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
