'use client';

import { useEffect, useState } from 'react';

export default function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('qc-consent');
    if (!consent) {
      setShow(true);
    } else if (consent === 'granted') {
      (window as any).gtag?.('consent', 'update', {
        ad_storage: 'granted',
        analytics_storage: 'granted',
        functionality_storage: 'granted',
        personalization_storage: 'granted'
      });
    }
  }, []);

  const accept = () => {
    localStorage.setItem('qc-consent', 'granted');
    (window as any).gtag?.('consent', 'update', {
      ad_storage: 'granted',
      analytics_storage: 'granted',
      functionality_storage: 'granted',
      personalization_storage: 'granted'
    });
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem('qc-consent', 'denied');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="consent-banner">
      <span>We use cookies for analytics. Do you accept?</span>
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="btn btn-primary" onClick={accept}>Accept</button>
        <button className="btn btn-ghost" onClick={decline}>Decline</button>
      </div>
    </div>
  );
}
