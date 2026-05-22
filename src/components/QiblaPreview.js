import React, { memo } from 'react';
import './QiblaPreview.css';

const QiblaPreview = memo(function QiblaPreview() {
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
        <span>Qibla Direction</span>
        <h2 id="qibla-preview-title">Find Qibla From Your City</h2>
        <p>Select any Indian state and city, or use live location with compass movement.</p>
        <a className="qibla-preview__button" href="/qibla">Open Qibla Direction</a>
      </div>
    </section>
  );
});

export default QiblaPreview;
