import React, { memo } from 'react';
import { useTranslation } from '../i18n';
import './QiblaPreview.css';

const QiblaPreview = memo(function QiblaPreview() {
  const { t } = useTranslation();

  return (
    <section className="qibla-preview" aria-labelledby="qibla-preview-title">
      <div className="qibla-preview__dial" aria-hidden="true">
        <span className="qibla-preview__mark qibla-preview__mark--n">N</span>
        <span className="qibla-preview__mark qibla-preview__mark--e">E</span>
        <span className="qibla-preview__mark qibla-preview__mark--s">S</span>
        <span className="qibla-preview__mark qibla-preview__mark--w">W</span>
        <span className="qibla-preview__needle" />
        <span className="qibla-preview__center" />
        <strong>283.49 deg</strong>
      </div>

      <div className="qibla-preview__content">
        <span>{t('qiblaPreviewEyebrow')}</span>
        <h2 id="qibla-preview-title">{t('qiblaPreviewTitle')}</h2>
        <p>{t('qiblaPreviewText')}</p>
        <a className="qibla-preview__button" href="/qibla">{t('qiblaPreviewButton')}</a>
      </div>
    </section>
  );
});

export default QiblaPreview;
