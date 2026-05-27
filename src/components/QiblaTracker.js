import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import INDIA_LOCATIONS from '../data/indiaLocations';
import { useTranslation } from '../i18n';
import './QiblaTracker.css';

const FALLBACK_LOCATION = {
  name: 'Bijapur, Karnataka 586101 fallback',
  lat: 16.8302,
  lng: 75.71,
};

const KAABA_LOCATION = {
  name: 'Masjid al-Haram, Makkah',
  lat: 21.422487,
  lng: 39.826206,
};

const toRad = value => value * (Math.PI / 180);
const toDeg = value => value * (180 / Math.PI);
const normalize = value => (value + 360) % 360;

function calculateBearing(from, to) {
  const lat1 = toRad(from.lat);
  const lat2 = toRad(to.lat);
  const dLng = toRad(to.lng - from.lng);
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);

  return normalize(toDeg(Math.atan2(y, x)));
}

function formatDirection(degrees, t) {
  const directions = ['north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest'];
  return t(directions[Math.round(degrees / 45) % directions.length]);
}

const QiblaTracker = memo(function QiblaTracker({
  compact = false,
  location: providedLocation = null,
  locationError = '',
  locationLoading = false,
  onRequestLocation,
}) {
  const { t } = useTranslation();
  const [localLocation, setLocalLocation] = useState(null);
  const [localError, setLocalError] = useState('');
  const [heading, setHeading] = useState(null);
  const [compassError, setCompassError] = useState('');
  const [selectedState, setSelectedState] = useState('live');
  const [selectedCity, setSelectedCity] = useState('');

  const selectedStateData = useMemo(
    () => INDIA_LOCATIONS.find(item => item.state === selectedState) || null,
    [selectedState]
  );

  const selectedManualLocation = useMemo(() => {
    if (!selectedStateData) return null;
    return selectedStateData.cities.find(city => city.name === selectedCity) || selectedStateData.cities[0] || null;
  }, [selectedCity, selectedStateData]);

  useEffect(() => {
    if (providedLocation || onRequestLocation || !navigator.geolocation) return undefined;

    const watchId = navigator.geolocation.watchPosition(
      pos => {
        setLocalLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        });
        setLocalError('');
      },
      err => {
        setLocalError(
          err.code === 1
            ? t('locationPermissionNeeded')
            : t('locationFallback')
        );
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [onRequestLocation, providedLocation, t]);

  useEffect(() => {
    if (selectedManualLocation || providedLocation || localLocation || !onRequestLocation || locationLoading) return;
    onRequestLocation();
  }, [localLocation, locationLoading, onRequestLocation, providedLocation, selectedManualLocation]);

  const handleOrientation = useCallback(event => {
    const nextHeading = typeof event.webkitCompassHeading === 'number'
      ? event.webkitCompassHeading
      : typeof event.absolute === 'boolean' && event.absolute && typeof event.alpha === 'number'
        ? normalize(360 - event.alpha)
      : typeof event.alpha === 'number'
        ? normalize(360 - event.alpha)
        : null;

    if (nextHeading !== null) {
      setHeading(nextHeading);
      setCompassError('');
    }
  }, []);

  const enableCompass = useCallback(async () => {
    if (!window.DeviceOrientationEvent) {
      setCompassError(t('compassUnsupported'));
      return;
    }

    try {
      if (typeof window.DeviceOrientationEvent.requestPermission === 'function') {
        const result = await window.DeviceOrientationEvent.requestPermission();
        if (result !== 'granted') {
          setCompassError(t('compassDenied'));
          return;
        }
      }

      window.addEventListener('deviceorientation', handleOrientation, true);
      window.addEventListener('deviceorientationabsolute', handleOrientation, true);
      setCompassError(t('compassCalibration'));
    } catch {
      setCompassError(t('compassCouldNotOpen'));
    }
  }, [handleOrientation, t]);

  const handleStateSelect = useCallback(e => {
    const nextState = e.target.value;
    setSelectedState(nextState);
    const stateData = INDIA_LOCATIONS.find(item => item.state === nextState);
    setSelectedCity(stateData?.cities[0]?.name || '');
  }, []);

  const handleCitySelect = useCallback(e => {
    setSelectedCity(e.target.value);
  }, []);

  const handleUseCurrentLocation = useCallback(() => {
    setSelectedState('live');
    setSelectedCity('');
    if (onRequestLocation) onRequestLocation();
  }, [onRequestLocation]);

  useEffect(() => {
    if (!window.DeviceOrientationEvent) return undefined;
    window.addEventListener('deviceorientation', handleOrientation, true);
    window.addEventListener('deviceorientationabsolute', handleOrientation, true);
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
      window.removeEventListener('deviceorientationabsolute', handleOrientation, true);
    };
  }, [handleOrientation]);

  const activeLocation = selectedManualLocation || providedLocation || localLocation || FALLBACK_LOCATION;
  const isFallback = activeLocation === FALLBACK_LOCATION;
  const isManual = Boolean(selectedManualLocation);
  const qiblaBearing = useMemo(() => calculateBearing(activeLocation, KAABA_LOCATION), [activeLocation]);
  const needleRotation = heading === null ? qiblaBearing : normalize(qiblaBearing - heading);
  const displayBearing = qiblaBearing.toFixed(2);
  const displayNeedle = needleRotation.toFixed(2);
  const directionLabel = formatDirection(qiblaBearing, t);
  const activeError = locationError || localError;

  return (
    <section className={compact ? 'qibla qibla--compact' : 'qibla'} aria-labelledby="qibla-title">
      <div className="qibla__content">
        <span className="qibla__eyebrow">{t('qiblaEyebrow')}</span>
        <h2 id="qibla-title">{t('qiblaTitle')}</h2>
        <p>
          {t('qiblaInstruction', {
            bearing: displayBearing,
            direction: directionLabel,
            needle: heading !== null ? displayNeedle : '',
          })}
        </p>

        <dl className="qibla__facts">
          <div>
            <dt>{t('currentLocation')}</dt>
            <dd>
              {activeLocation.lat.toFixed(4)} deg N, {activeLocation.lng.toFixed(4)} deg E
              {isManual ? ` (${activeLocation.name}, ${selectedState})` : isFallback ? t('fallbackSuffix') : ''}
              {activeLocation.accuracy ? `, +/- ${Math.round(activeLocation.accuracy)} m` : ''}
            </dd>
          </div>
          <div>
            <dt>{t('destination')}</dt>
            <dd>{KAABA_LOCATION.name}</dd>
          </div>
        </dl>

        <div className="qibla__selectors">
          <label className="qibla__select">
            <span>{t('selectState')}</span>
            <select value={selectedState} onChange={handleStateSelect}>
              <option value="live">{t('automaticLocation')}</option>
              {INDIA_LOCATIONS.map(item => (
                <option key={item.state} value={item.state}>{item.state}</option>
              ))}
            </select>
          </label>

          <label className="qibla__select">
            <span>{t('selectCity')}</span>
            <select value={selectedCity} onChange={handleCitySelect} disabled={!selectedStateData}>
              {!selectedStateData ? (
                <option value="">{t('chooseStateFirst')}</option>
              ) : (
                selectedStateData.cities.map(city => (
                  <option key={city.name} value={city.name}>{city.name}</option>
                ))
              )}
            </select>
          </label>
        </div>

        <div className="qibla__actions">
          {onRequestLocation && (
            <button type="button" onClick={handleUseCurrentLocation} disabled={locationLoading}>
              {locationLoading ? t('locating') : t('useMyLocation')}
            </button>
          )}
          <button type="button" onClick={enableCompass}>{t('enableCompass')}</button>
        </div>

        {(activeError || compassError) && (
          <p className="qibla__status">{activeError || compassError}</p>
        )}
      </div>

      <div className="qibla__dial" aria-label={t('qiblaDialLabel', { bearing: displayBearing })}>
        <span className="qibla__mark qibla__mark--n">N</span>
        <span className="qibla__mark qibla__mark--e">E</span>
        <span className="qibla__mark qibla__mark--s">S</span>
        <span className="qibla__mark qibla__mark--w">W</span>
        <span className="qibla__needle" style={{ transform: `rotate(${needleRotation}deg)` }}>
          <span />
        </span>
        <span className="qibla__center" />
        <strong className="qibla__degree">{displayBearing} deg</strong>
        {heading !== null && <span className="qibla__heading">{t('facing', { heading: heading.toFixed(0) })}</span>}
      </div>
    </section>
  );
});

export default QiblaTracker;
