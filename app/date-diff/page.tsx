import type { Metadata } from 'next';
import Script from 'next/script';
import DateDiffClient from './DateDiffClient';

export const metadata: Metadata = {
  title: 'Date Difference Calculator — Days & Weeks Between Dates',
  description: 'Find the number of days and weeks between two dates instantly.',
  keywords: ['date difference calculator','days between dates','weeks between dates','duration calculator','time between dates'],
  alternates: { canonical: '/date-diff' },
  openGraph: {
    title: 'Date Difference Calculator — Days & Weeks Between Dates',
    description: 'Find the number of days and weeks between two dates instantly.',
    images: [{ url: '/images/date.jpg', width: 1200, height: 630, alt: 'Date difference calculator' }]
  }
};

export default function Page() {
  const base = process.env.SITE_URL ?? 'https://quickcalc.me';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Date Difference Calculator',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    url: `${base}/date-diff`
  };
  return (
    <>
      <Script id="schema-date-diff" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>
      <DateDiffClient />
    </>
  );
}
