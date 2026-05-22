import React, { memo } from 'react';

const PRAYER_ROWS = [
  { key: 'fajr', label: 'Fajr', azanOffset: -20 },
  { key: 'zuhr', label: 'Zuhr', azanOffset: -15 },
  { key: 'asr', label: 'Asr', azanOffset: -15 },
  { key: 'maghrib', label: 'Maghrib', azanOffset: 0 },
  { key: 'isha', label: 'Isha', azanOffset: -15 },
  { key: 'eidTime', label: 'Eid Namaz', azanOffset: 0, highlight: true },
];

function formatTime(time) {
  const [hourText, minuteText] = time.split(':');
  const hour = Number(hourText);
  const minute = Number(minuteText);
  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${String(minute).padStart(2, '0')} ${period}`;
}

function addMinutes(time, minutesToAdd) {
  const [hourText, minuteText] = time.split(':');
  const total = Number(hourText) * 60 + Number(minuteText) + minutesToAdd;
  const wrapped = ((total % 1440) + 1440) % 1440;
  const hour = Math.floor(wrapped / 60);
  const minute = wrapped % 60;
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

const PrayerTimingCard = memo(function PrayerTimingCard({ masjid }) {
  return (
    <section className="detail-timing" aria-labelledby="combined-timing-title">
      <div className="detail-timing__head">
        <h3 className="detail-timing__title" id="combined-timing-title">Prayer Timings</h3>
      </div>

      <div className="detail-timing__rows">
        <div className="detail-timing__row detail-timing__row--header">
          <span>Prayer</span>
          <span>Azan</span>
          <span>Jamaath</span>
        </div>

        {PRAYER_ROWS.map(row => {
          const azanTime = addMinutes(masjid[row.key], row.azanOffset);
          const jamaathTime = masjid[row.key];

          return (
            <div
              key={row.key}
              className={`detail-timing__row${row.highlight ? ' detail-timing__row--highlight' : ''}`}
            >
              <span className="detail-timing__name">{row.label}</span>
              <time className="detail-timing__time" dateTime={azanTime}>{formatTime(azanTime)}</time>
              <time className="detail-timing__time" dateTime={jamaathTime}>{formatTime(jamaathTime)}</time>
            </div>
          );
        })}
      </div>
    </section>
  );
});

export default PrayerTimingCard;
