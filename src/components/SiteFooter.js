import React, { memo } from 'react';

const SiteFooter = memo(function SiteFooter() {
  return (
    <footer className="site-footer" role="contentinfo">
      <p className="site-footer__arabic">Taqabbal Allahu minna wa minkum</p>
      <p className="site-footer__trans">May Allah accept from us and from you</p>
      <div className="site-footer__divider" aria-hidden="true" />
      <p className="site-footer__sub">Vijayapura Eid Namaz Guide | {new Date().getFullYear()}</p>
    </footer>
  );
});

export default SiteFooter;
