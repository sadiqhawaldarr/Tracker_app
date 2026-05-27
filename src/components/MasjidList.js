import React, { memo, useCallback, useState } from 'react';
import HeroBanner from './HeroBanner';
import MasjidDetailsPage from './MasjidDetailsPage';
import QuerySection from './QuerySection';
import SiteFooter from './SiteFooter';
import { getLocalizedMasjidName, useTranslation } from '../i18n';
import './MasjidList.css';

const formatEidTime = (time, t) => {
  if (!time) return t('notSet');
  const [hours = '0', minutes = '00'] = time.split(':');
  const numericHours = Number(hours);
  const period = numericHours >= 12 ? t('pm') : t('am');
  const displayHours = numericHours % 12 || 12;
  return `${displayHours}:${minutes} ${period}`;
};

const publicAsset = path => `${process.env.PUBLIC_URL || ''}${path}`;

const MasjidList = memo(function MasjidList({
  masjids,
  stats,
  locationError,
  selectedMasjid,
  onOpenMasjid,
  onCloseMasjid,
}) {
  const { language, t } = useTranslation();
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

      <main className="masjid-list" id="masjid-list" aria-label={t('listingsLabel')}>
        <section className="masjid-list__audio" aria-label={t('audioLabel')}>
          <div>
            <span className="masjid-list__audio-label">{t('audioName')}</span>
            <h2 className="masjid-list__audio-title">{t('audioTitle')}</h2>
          </div>
          <audio className="masjid-list__audio-player" controls preload="metadata">
            <source src={publicAsset('/eid-takbeer.mp3')} type="audio/mpeg" />
            {t('audioUnsupported')}
          </audio>
        </section>

        {locationError && (
          <div className="masjid-list__alert" role="alert">
            {locationError}
          </div>
        )}

        {masjids.length === 0 ? (
          <div className="masjid-list__empty" role="status">
            <span className="masjid-list__empty-icon" aria-hidden="true">{t('noResults')}</span>
            <h2 className="masjid-list__empty-title">{t('noMasjidsFound')}</h2>
            <p className="masjid-list__empty-sub">{t('emptySub')}</p>
          </div>
        ) : (
          <div className="masjid-list__table-wrap">
            <table className="masjid-list__table">
              <thead>
                <tr>
                  <th className="masjid-list__count-head" scope="col">{t('no')}</th>
                  <th scope="col">{t('masjidName')}</th>
                  <th scope="col">{t('address')}</th>
                  <th scope="col">{t('eidTime')}</th>
                </tr>
              </thead>
              <tbody>
                {masjids.map((masjid, index) => {
                  const masjidName = getLocalizedMasjidName(masjid, language);

                  return (
                  <React.Fragment key={masjid.id}>
                    <tr>
                      <td className="masjid-list__count" data-label={t('no')}>
                        {index + 1}
                      </td>
                      <td data-label={t('masjidName')}>
                        <button
                          className="masjid-list__name-button"
                          type="button"
                          onClick={() => onOpenMasjid(masjid)}
                        >
                          {masjidName}
                        </button>
                        <span className="masjid-list__area">{masjid.area}</span>
                      </td>
                      <td data-label={t('address')}>
                        <button
                          className="masjid-list__address-button"
                          type="button"
                          onClick={() => handleAddressToggle(masjid.id)}
                          aria-expanded={openAddressId === masjid.id}
                        >
                          {t('address')}
                        </button>
                      </td>
                      <td data-label={t('eidTime')}>
                        <time className="masjid-list__eid-time" dateTime={masjid.eidTime}>
                          {formatEidTime(masjid.eidTime, t)}
                        </time>
                      </td>
                    </tr>
                    {openAddressId === masjid.id && (
                      <tr className="masjid-list__address-row">
                        <td colSpan="4">
                          <span className="masjid-list__address-label">{t('address')}</span>
                          {masjid.address}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <QuerySection />
      </main>

      <SiteFooter />
    </>
  );
});

export default MasjidList;
