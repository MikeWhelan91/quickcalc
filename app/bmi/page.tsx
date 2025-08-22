import type { Metadata } from 'next';
import Script from 'next/script';
import BmiClient from './BmiClient';

export const metadata: Metadata = {
  title: 'BMI Calculator — Body Mass Index & Fat Percentage',
  description: 'Compute your BMI and body fat using metric or imperial units.',
  keywords: ['bmi calculator','body mass index','body fat','metric bmi','imperial bmi'],
  alternates: { canonical: '/bmi' },
  openGraph: {
    title: 'BMI Calculator — Body Mass Index & Fat Percentage',
    description: 'Compute your BMI and body fat using metric or imperial units.',
    images: [{ url: '/images/bmi.jpg', width: 1200, height: 630, alt: 'BMI calculator' }]
  }
};

export default function Page() {
  const base = process.env.SITE_URL ?? 'https://quickcalc.me';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'BMI Calculator',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Any',
    url: `${base}/bmi`
  };
  return (
    <>
      <Script id="schema-bmi" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>
      <BmiClient />
    </>
  );
}
