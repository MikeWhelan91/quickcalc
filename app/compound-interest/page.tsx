import type { Metadata } from 'next';
import Script from 'next/script';
import CompoundClient from './CompoundClient';
import CompoundGuide from './CompoundGuide';

export const metadata: Metadata = {
  title: 'Compound Interest Calculator — Investment Growth Over Time',
  description: 'Calculate compound interest with optional periodic contributions to see how savings grow.',
  keywords: ['compound interest calculator','investment calculator','savings growth','future value','interest compounding'],
  alternates: { canonical: '/compound-interest' },
  openGraph: {
    title: 'Compound Interest Calculator — Investment Growth Over Time',
    description: 'Calculate compound interest with optional periodic contributions to see how savings grow.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Compound_interest.svg',
        width: 1200,
        height: 630,
        alt: 'Compound interest growth'
      }
    ]
  }
};

export default function Page() {
  const base = process.env.SITE_URL ?? 'https://quickcalc.me';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Compound Interest Calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    url: `${base}/compound-interest`
  };
  return (
    <>
      <Script id="schema-compound" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>
      <CompoundClient />
      <CompoundGuide />
    </>
  );
}
