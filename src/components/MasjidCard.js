// src/components/MasjidCard.js
import React, { memo, useCallback } from 'react';
import './MasjidCard.css';

const PinIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

/**
 * MasjidCard
 * ──────────
 * Single masjid listing card.
 *
 * Props:
 *   masjid         object
 *   animationDelay number  (seconds, staggered entry)
 *   onOpenModal    fn(masjid)
 *   onNavigate     fn(masjid)
 *
 * Optimisation:
 *   • memo         → skips re-render when parent re-renders but this masjid didn't change.
 *   • useCallback  → stable event handler refs, prevents child btn re-renders.
 */
const MasjidCard = memo(function MasjidCard({ masjid, animationDelay, onOpenModal, onNavigate }) {
  const handleDetails  = useCallback(e  => { e.stopPropagation(); onOpenModal(masjid); },  [masjid, onOpenModal]);
  const handleNavigate = useCallback(e  => { e.stopPropagation(); onNavigate(masjid);  },  [masjid, onNavigate]);
  const titleId = `masjid-card-title-${masjid.id}`;

  return (
    <article
      className="masjid-card"
      style={{ animationDelay: `${animationDelay}s` }}
      role="listitem"
      aria-labelledby={titleId}
    >
      {/* ── Image ── */}
      <div className="masjid-card__img-wrap">
        <img
          className="masjid-card__img"
          src={masjid.photo}
          alt={`${masjid.name} masjid exterior`}
          loading="lazy"
          decoding="async"
        />
        <div className="masjid-card__img-overlay" aria-hidden="true" />

        {/* Eid time badge */}
        <span className="masjid-card__eid-badge" aria-label={`Eid prayer at ${masjid.eidTime}`}>
          Eid {masjid.eidTime}
        </span>

        {/* Name over image */}
        <div className="masjid-card__name-block">
          <h3 className="masjid-card__name" id={titleId}>{masjid.name}</h3>
          <p  className="masjid-card__area">{masjid.area}</p>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="masjid-card__body">

        {/* Distance + Capacity */}
        <div className="masjid-card__meta">
          <span className="masjid-card__meta-item">
            <PinIcon /> {masjid.distance} km away
          </span>
          <span className="masjid-card__meta-item">
            Capacity {masjid.capacity.toLocaleString()}
          </span>
        </div>

        {/* Amenity tags — max 3 */}
        <div className="masjid-card__tags" aria-label="Amenities">
          {masjid.amenities.slice(0, 3).map(tag => (
            <span key={tag} className="masjid-card__tag">{tag}</span>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="masjid-card__actions">
          <button
            className="masjid-card__btn masjid-card__btn--details"
            onClick={handleDetails}
            aria-label={`View details for ${masjid.name}`}
          >
            Details
          </button>
          <button
            className="masjid-card__btn masjid-card__btn--nav"
            onClick={handleNavigate}
            aria-label={`Get directions to ${masjid.name}`}
          >
            Navigate
          </button>
        </div>
      </div>
    </article>
  );
});

export default MasjidCard;
