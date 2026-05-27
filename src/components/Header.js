import React, { memo, useCallback } from 'react';
import { useTranslation } from '../i18n';
import './Header.css';

const LocationIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
  </svg>
);

const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const Header = memo(function Header({
  location,
  locationLoading,
  onRequestLocation,
  currentView = 'user',
}) {
  const isLocated = Boolean(location);
  const { language, languages, setLanguage, t } = useTranslation();

  const handleClick = useCallback(() => {
    if (!locationLoading) onRequestLocation();
  }, [locationLoading, onRequestLocation]);

  return (
    <header className="header" role="banner">
      <div className="header__inner">
        <a className="header__logo" href="/" aria-label={t('brandHome')}>
          <span className="header__crescent" aria-hidden="true">☪</span>
          <div className="header__brand">
            <span className="header__brand-title">{t('brandTitle')}</span>
            <span className="header__brand-sub">{t('brandSub')}</span>
          </div>
        </a>

        <div className="header__actions">
          <nav className="header__nav" aria-label={t('navLabel')}>
            <a className={currentView === 'user' ? 'header__nav-link header__nav-link--active' : 'header__nav-link'} href="/">
              {t('navUser')}
            </a>
            <a className={currentView === 'tasbih' ? 'header__nav-link header__nav-link--active' : 'header__nav-link'} href="/tasbih">
              {t('navTasbih')}
            </a>
            <a className={currentView === 'qibla' ? 'header__nav-link header__nav-link--active' : 'header__nav-link'} href="/qibla">
              {t('navQibla')}
            </a>
          </nav>

          <label className="header__language">
            <span>{t('language')}</span>
            <select value={language} onChange={event => setLanguage(event.target.value)}>
              {languages.map(item => (
                <option key={item.code} value={item.code}>{item.label}</option>
              ))}
            </select>
          </label>

          {currentView === 'user' && (
            <button
              className={`header__geo-btn${isLocated ? ' header__geo-btn--active' : ''}`}
              onClick={handleClick}
              disabled={locationLoading}
              aria-label={isLocated ? t('locationSetLabel') : t('useLocationLabel')}
            >
              {isLocated ? <CheckIcon /> : <LocationIcon />}
              <span className="header__geo-label">
                {locationLoading ? t('locating') : isLocated ? t('locationSet') : t('useMyLocation')}
              </span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
});

export default Header;
