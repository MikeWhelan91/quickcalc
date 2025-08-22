import type { Metadata } from 'next';
import Script from 'next/script';
import BizDaysClient from './BizDaysClient';

export const metadata: Metadata = {
  title: 'Business Days Calculator — Workdays Between Dates',
  description: 'Count working days between two dates excluding weekends and public holidays.',
  keywords: ['business days calculator','workdays calculator','weekdays calculator','business day count','holiday calculator'],
  alternates: { canonical: '/business-days' },
  openGraph: {
    title: 'Business Days Calculator — Workdays Between Dates',
    description: 'Count working days between two dates excluding weekends and public holidays.',
    images: [{ url: '/images/business.jpg', width: 1200, height: 630, alt: 'Business days calculator' }]
  }
};

export default function Page() {
  const base = process.env.SITE_URL ?? 'https://quickcalc.me';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Business Days Calculator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    url: `${base}/business-days`
  };
  return (
    <>
      <Script id="schema-business-days" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>
      <BizDaysClient />
    </>
  );
}
