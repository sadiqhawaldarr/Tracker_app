import React, { memo } from 'react';
import { useTranslation } from '../i18n';

const SiteFooter = memo(function SiteFooter() {
  const { t } = useTranslation();

  return (
    <footer className="site-footer" role="contentinfo">
      <p className="site-footer__arabic">{t('footerArabic')}</p>
      <p className="site-footer__trans">{t('footerTrans')}</p>
      <div className="site-footer__divider" aria-hidden="true" />
      <p className="site-footer__sub">{t('footerSub')} | {new Date().getFullYear()}</p>
      <p className="site-footer__team">{t('footerTeam')}</p>
    </footer>
  );
});

export default SiteFooter;
