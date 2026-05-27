import React, { memo } from 'react';
import { useTranslation } from '../i18n';

const formatEidTime = (time, t) => {
  if (!time) return t('notSet');
  const [hours = '0', minutes = '00'] = time.split(':');
  const numericHours = Number(hours);
  const period = numericHours >= 12 ? t('pm') : t('am');
  const displayHours = numericHours % 12 || 12;
  return `${displayHours}:${minutes} ${period}`;
};

const HeroBanner = memo(function HeroBanner({ stats }) {
  const { t } = useTranslation();
  const eidTimes = Object.keys(stats).sort();
  const totalMasjids = eidTimes.reduce((total, time) => total + (stats[time] ?? 0), 0);

  return (
    <section className="hero" aria-label={t('heroLabel')}>
      <div className="hero__bg-pattern" aria-hidden="true" />
      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__content">
        <p className="hero__arabic">{t('heroArabic')}</p>

        <h1 className="hero__title">
          {t('heroTitlePlace')} <span className="hero__title-accent">{t('heroTitleEvent')}</span>
        </h1>

        <p className="hero__subtitle">
          {t('heroSubtitle')}
        </p>

        <p className="hero__total" aria-live="polite">
          {t('totalMasjids')} <strong>{totalMasjids}</strong>
        </p>

        <div className="hero__pills" role="list" aria-label={t('timeSummary')}>
          {eidTimes.map(time => (
            <div key={time} className="hero__pill" role="listitem">
              <span className="hero__pill-time">{formatEidTime(time, t)}</span>
              <span className="hero__pill-count">
                {t('masjidCount', { count: stats[time] ?? 0 })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default HeroBanner;
