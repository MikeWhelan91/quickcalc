import type { Metadata } from 'next';
import Script from 'next/script';
import CompoundClient from './CompoundClient';
import CompoundGuide from './CompoundGuide';
import { canonical } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Compound Interest Calculator — Investment Growth Over Time',
  description: 'Calculate compound interest with optional periodic contributions and visual growth charts for your savings.',
  keywords: ['compound interest calculator','investment calculator','savings growth','future value','interest compounding'],
  alternates: { canonical: canonical('/compound-interest') },
  openGraph: {
    title: 'Compound Interest Calculator — Investment Growth Over Time',
    description: 'Calculate compound interest with optional periodic contributions and visual growth charts for your savings.',
    url: canonical('/compound-interest'),
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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Compound Interest Calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    url: canonical('/compound-interest')
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
