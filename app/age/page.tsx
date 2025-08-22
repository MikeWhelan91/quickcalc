import type { Metadata } from 'next';
import Script from 'next/script';
import AgeClient from './AgeClient';

export const metadata: Metadata = {
  title: 'Age Calculator — Exact Age in Years, Months, and Days',
  description: 'Calculate your precise age and total days lived from your birth date.',
  keywords: ['age calculator','how old am I','date of birth calculator','days lived','exact age'],
  alternates: { canonical: '/age' },
  openGraph: {
    title: 'Age Calculator — Exact Age in Years, Months, and Days',
    description: 'Calculate your precise age and total days lived from your birth date.',
    images: [{ url: '/images/age.jpg', width: 1200, height: 630, alt: 'Age calculator' }]
  }
};

export default function Page() {
  const base = process.env.SITE_URL ?? 'https://quickcalc.me';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Age Calculator',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    url: `${base}/age`
  };
  return (
    <>
      <Script id="schema-age" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>
      <AgeClient />
    </>
  );
}
