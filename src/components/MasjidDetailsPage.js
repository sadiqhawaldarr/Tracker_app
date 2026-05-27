import React, { memo } from 'react';
import PrayerTimingCard from './PrayerTimingCard';
import { getLocalizedMasjidName, useTranslation } from '../i18n';

const MasjidDetailsPage = memo(function MasjidDetailsPage({ masjid, onBack }) {
  const { language, t } = useTranslation();
  const masjidName = getLocalizedMasjidName(masjid, language);

  return (
    <main className="masjid-detail-page" aria-labelledby="masjid-detail-title">
      <button className="detail-back" type="button" onClick={onBack}>{t('backToMasjids')}</button>

      <section className="detail-hero">
        <div className="detail-hero__content">
          <span className="detail-hero__eyebrow">{masjid.area}</span>
          <h1 className="detail-hero__title" id="masjid-detail-title">{masjidName}</h1>
        </div>
      </section>

      <section className="detail-times" aria-label={t('prayerTimingsLabel')}>
        <PrayerTimingCard masjid={masjid} />
      </section>

      <section className="detail-info" aria-label={t('masjidInfoLabel')}>
        <div className="detail-info__item">
          <span className="detail-info__label">{t('address')}</span>
          <span className="detail-info__value">{masjid.address}</span>
        </div>
        <div className="detail-info__item">
          <span className="detail-info__label">{t('imam')}</span>
          <span className="detail-info__value">{masjid.imam}</span>
        </div>
        <div className="detail-info__item">
          <span className="detail-info__label">{t('capacity')}</span>
          <span className="detail-info__value">&nbsp;</span>
        </div>
      </section>

      <section className="detail-facilities" aria-labelledby="facilities-title">
        <h2 className="detail-section-title" id="facilities-title">{t('facilities')}</h2>
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
