import React, { memo, useCallback, useState } from 'react';
import HeroBanner from './HeroBanner';
import MasjidDetailsPage from './MasjidDetailsPage';
import SiteFooter from './SiteFooter';
import './MasjidList.css';

const formatEidTime = time => {
  if (!time) return 'Not set';
  const [hours = '0', minutes = '00'] = time.split(':');
  const numericHours = Number(hours);
  const period = numericHours >= 12 ? 'PM' : 'AM';
  const displayHours = numericHours % 12 || 12;
  return `${displayHours}:${minutes} ${period}`;
};

const MasjidList = memo(function MasjidList({
  masjids,
  stats,
  locationError,
  selectedMasjid,
  onOpenMasjid,
  onCloseMasjid,
}) {
  const [openAddressId, setOpenAddressId] = useState(null);

  const handleAddressToggle = useCallback(id => {
    setOpenAddressId(currentId => (currentId === id ? null : id));
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
        <section className="masjid-list__audio" aria-label="Eid takbeer audio">
          <div>
            <span className="masjid-list__audio-label">Eid Takbeer</span>
            <h2 className="masjid-list__audio-title">Listen before checking namaz timings</h2>
          </div>
          <audio className="masjid-list__audio-player" controls preload="metadata">
            <source src="/eid-takbeer.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </section>

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
          <div className="masjid-list__table-wrap">
            <table className="masjid-list__table">
              <thead>
                <tr>
                  <th scope="col">Masjid Name</th>
                  <th scope="col">Address</th>
                  <th scope="col">Eid Time</th>
                </tr>
              </thead>
              <tbody>
                {masjids.map(masjid => (
                  <React.Fragment key={masjid.id}>
                    <tr>
                      <td data-label="Masjid Name">
                        <button
                          className="masjid-list__name-button"
                          type="button"
                          onClick={() => onOpenMasjid(masjid)}
                        >
                          {masjid.name}
                        </button>
                        <span className="masjid-list__area">{masjid.area}</span>
                      </td>
                      <td data-label="Address">
                        <button
                          className="masjid-list__address-button"
                          type="button"
                          onClick={() => handleAddressToggle(masjid.id)}
                          aria-expanded={openAddressId === masjid.id}
                        >
                          Address
                        </button>
                      </td>
                      <td data-label="Eid Time">
                        <time className="masjid-list__eid-time" dateTime={masjid.eidTime}>
                          {formatEidTime(masjid.eidTime)}
                        </time>
                      </td>
                    </tr>
                    {openAddressId === masjid.id && (
                      <tr className="masjid-list__address-row">
                        <td colSpan="3">
                          <span className="masjid-list__address-label">Address</span>
                          {masjid.address}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <SiteFooter />
    </>
  );
});

export default MasjidList;
