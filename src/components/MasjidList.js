import React, { memo, useCallback } from 'react';
import HeroBanner from './HeroBanner';
import MasjidCard from './MasjidCard';
import MasjidDetailsPage from './MasjidDetailsPage';
import SiteFooter from './SiteFooter';
import './MasjidList.css';

const MasjidList = memo(function MasjidList({
  masjids,
  stats,
  locationError,
  selectedMasjid,
  onOpenMasjid,
  onCloseMasjid,
}) {
  const handleNavigate = useCallback(masjid => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${masjid.lat},${masjid.lng}&travelmode=walking`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  if (selectedMasjid) {
    return (
      <>
        <MasjidDetailsPage masjid={selectedMasjid} onBack={onCloseMasjid} />
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <HeroBanner stats={stats} />

      <main className="masjid-list" id="masjid-list" aria-label="Masjid listings">
        {locationError && (
          <div className="masjid-list__alert" role="alert">
            {locationError}
          </div>
        )}

        {masjids.length === 0 ? (
          <div className="masjid-list__empty" role="status">
            <span className="masjid-list__empty-icon" aria-hidden="true">No results</span>
            <h2 className="masjid-list__empty-title">No Masjids Found</h2>
            <p className="masjid-list__empty-sub">Try adjusting your search or removing a filter.</p>
          </div>
        ) : (
          <div className="masjid-list__grid" role="list">
            {masjids.map((masjid, idx) => (
              <MasjidCard
                key={masjid.id}
                masjid={masjid}
                animationDelay={idx * 0.07}
                onOpenModal={onOpenMasjid}
                onNavigate={handleNavigate}
              />
            ))}
          </div>
        )}
      </main>

      <SiteFooter />
    </>
  );
});

export default MasjidList;
