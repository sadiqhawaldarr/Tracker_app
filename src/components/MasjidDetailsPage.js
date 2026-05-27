import React, { memo, useCallback } from 'react';
import PrayerTimingCard from './PrayerTimingCard';

const MasjidDetailsPage = memo(function MasjidDetailsPage({ masjid, onBack }) {
  const handleNavigate = useCallback(() => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${masjid.lat},${masjid.lng}&travelmode=walking`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }, [masjid]);

  return (
    <main className="masjid-detail-page" aria-labelledby="masjid-detail-title">
      <button className="detail-back" type="button" onClick={onBack}>Back to masjids</button>

      <section className="detail-hero">
        <div className="detail-hero__content">
          <span className="detail-hero__eyebrow">{masjid.area}</span>
          <h1 className="detail-hero__title" id="masjid-detail-title">{masjid.name}</h1>
          <button className="detail-btn detail-btn--primary" type="button" onClick={handleNavigate}>
            Get Directions
          </button>
        </div>
      </section>

      <section className="detail-times" aria-label="Prayer timings">
        <PrayerTimingCard masjid={masjid} />
      </section>

      <section className="detail-info" aria-label="Masjid information">
        <div className="detail-info__item">
          <span className="detail-info__label">Address</span>
          <span className="detail-info__value">{masjid.address}</span>
        </div>
        <div className="detail-info__item">
          <span className="detail-info__label">Imam</span>
          <span className="detail-info__value">{masjid.imam}</span>
        </div>
        <div className="detail-info__item">
          <span className="detail-info__label">Capacity</span>
          <span className="detail-info__value">&nbsp;</span>
        </div>
      </section>

      <section className="detail-facilities" aria-labelledby="facilities-title">
        <h2 className="detail-section-title" id="facilities-title">Facilities</h2>
        <div className="detail-tags">
          {masjid.amenities.map(amenity => (
            <span key={amenity} className="detail-tag">{amenity}</span>
          ))}
        </div>
      </section>
    </main>
  );
});

export default MasjidDetailsPage;
