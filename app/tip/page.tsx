import type { Metadata } from 'next';
import Script from 'next/script';
import TipClient from './TipClient';

export const metadata: Metadata = {
  title: 'Tip Calculator — Split Bills & Tips Fast',
  description: 'Figure out restaurant tips, totals and per-person shares instantly.',
  keywords: ['tip calculator','bill splitter','gratuity calculator','restaurant tip','split bill'],
  alternates: { canonical: '/tip' },
  openGraph: {
    title: 'Tip Calculator — Split Bills & Tips Fast',
    description: 'Figure out restaurant tips, totals and per-person shares instantly.',
    images: [{ url: '/images/tips.jpg', width: 1200, height: 630, alt: 'Tip calculator' }]
  }
};

export default function Page() {
  const base = process.env.SITE_URL ?? 'https://quickcalc.me';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Tip Calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    url: `${base}/tip`
  };
  return (
    <>
      <Script id="schema-tip" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>
      <TipClient />
    </>
  );
}
