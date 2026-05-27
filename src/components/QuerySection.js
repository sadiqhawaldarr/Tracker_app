import React, { memo } from 'react';
import './QuerySection.css';

const QUERY_EMAIL = 'teamfisabilillahbijapur@gmail.com';
const queryMailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${QUERY_EMAIL}&su=Masjid%20Tracker%20Query`;

const QuerySection = memo(function QuerySection() {
  return (
    <section className="query-section" aria-labelledby="query-title">
      <div className="query-section__head">
        <span className="query-section__eyebrow">Help Desk</span>
        <h2 className="query-section__title" id="query-title">Send Query</h2>
      </div>

      <div className="query-contact">
        <p className="query-contact__text">Share any query through Gmail.</p>
        <a className="query-contact__button" href={queryMailLink} target="_blank" rel="noreferrer">
          teamfisabilillahbijapur@gmail.com
        </a>
      </div>
    </section>
  );
});

export default QuerySection;
