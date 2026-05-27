import React, { memo } from 'react';
import { useTranslation } from '../i18n';

const PRAYER_ROWS = [
  { key: 'eidTime', labelKey: 'eidNamaz', highlight: true },
];

function formatTime(time) {
  const [hourText, minuteText] = time.split(':');
  const hour = Number(hourText);
  const minute = Number(minuteText);
  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${String(minute).padStart(2, '0')} ${period}`;
}

const PrayerTimingCard = memo(function PrayerTimingCard({ masjid }) {
  const { t } = useTranslation();

  return (
    <section className="detail-timing" aria-labelledby="combined-timing-title">
      <div className="detail-timing__head">
        <h3 className="detail-timing__title" id="combined-timing-title">{t('prayerTimings')}</h3>
      </div>

      <div className="detail-timing__rows">
        <div className="detail-timing__row detail-timing__row--header">
          <span>{t('prayer')}</span>
          <span>{t('time')}</span>
        </div>

        {PRAYER_ROWS.map(row => {
          const prayerTime = masjid[row.key];

          return (
            <div
              key={row.key}
              className={`detail-timing__row${row.highlight ? ' detail-timing__row--highlight' : ''}`}
            >
              <span className="detail-timing__name">{t(row.labelKey)}</span>
              <time className="detail-timing__time" dateTime={prayerTime}>{formatTime(prayerTime)}</time>
            </div>
          );
        })}
      </div>
    </section>
  );
});

export default PrayerTimingCard;
