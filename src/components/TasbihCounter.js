import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import QiblaTracker from './QiblaTracker';
import SiteFooter from './SiteFooter';
import { useTranslation } from '../i18n';
import './TasbihCounter.css';

const PHRASES = [
  { label: 'SubhanAllah', target: 33 },
  { label: 'Alhamdulillah', target: 33 },
  { label: 'Allahu Akbar', target: 34 },
  { label: 'La ilaha illallah', target: 100 },
];

const STORAGE_KEY = 'masjid-finder-tasbih';

const TasbihCounter = memo(function TasbihCounter() {
  const { t } = useTranslation();
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(PHRASES[0].target);
  const [phrase, setPhrase] = useState(PHRASES[0].label);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      if (Number.isFinite(saved.count)) setCount(saved.count);
      if (Number.isFinite(saved.target)) setTarget(saved.target);
      if (saved.phrase) setPhrase(saved.phrase);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ count, target, phrase }));
  }, [count, target, phrase]);

  const progress = useMemo(() => {
    if (!target) return 0;
    return Math.min(100, Math.round((count / target) * 100));
  }, [count, target]);

  const increment = useCallback(() => {
    setCount(value => value + 1);
  }, []);

  const decrement = useCallback(() => {
    setCount(value => Math.max(0, value - 1));
  }, []);

  const reset = useCallback(() => {
    setCount(0);
  }, []);

  const handlePhrase = useCallback(e => {
    const next = PHRASES.find(item => item.label === e.target.value);
    if (!next) return;
    setPhrase(next.label);
    setTarget(next.target);
    setCount(0);
  }, []);

  const handleTarget = useCallback(e => {
    setTarget(Math.max(1, Number(e.target.value || 1)));
  }, []);

  return (
    <>
      <main className="tasbih" aria-labelledby="tasbih-title">
        <section className="tasbih__panel">
          <div className="tasbih__intro">
            <span className="tasbih__eyebrow">{t('tasbihEyebrow')}</span>
            <h1 id="tasbih-title">{t('tasbihTitle')}</h1>
            <p>{t('tasbihIntro')}</p>
          </div>

          <div className="tasbih__counter" aria-live="polite">
            <div className="tasbih__device" aria-hidden="true">
              <div className="tasbih__screen">
                <span>{t('tasbeeh')}</span>
                <strong>{count}</strong>
              </div>
              <div className="tasbih__device-row">
                <span>{t('countLabel')}</span>
                <span>{t('resetLabel')}</span>
              </div>
              <div className="tasbih__button-mark">{t('allah')}</div>
            </div>
            <div className="tasbih__readout">
              <span className="tasbih__phrase">{phrase}</span>
              <strong>{count}</strong>
              <span className="tasbih__target">{t('ofTarget', { target })}</span>
            </div>
          </div>

          <div className="tasbih__progress" aria-label={t('progressComplete', { progress })}>
            <span style={{ width: `${progress}%` }} />
          </div>

          <button className="tasbih__tap" type="button" onClick={increment}>
            {t('count')}
          </button>

          <div className="tasbih__actions">
            <button type="button" onClick={decrement}>{t('minus')}</button>
            <button type="button" onClick={reset}>{t('reset')}</button>
          </div>

          <div className="tasbih__settings">
            <label>
              <span>{t('dhikr')}</span>
              <select value={phrase} onChange={handlePhrase}>
                {PHRASES.map(item => (
                  <option key={item.label} value={item.label}>{item.label}</option>
                ))}
              </select>
            </label>
            <label>
              <span>{t('target')}</span>
              <input type="number" min="1" max="10000" value={target} onChange={handleTarget} />
            </label>
          </div>

          <QiblaTracker compact />
        </section>
      </main>
      <SiteFooter />
    </>
  );
});

export default TasbihCounter;
