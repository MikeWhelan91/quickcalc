import Script from 'next/script';
import BmiClient from './BmiClient';
import { canonical } from '@/lib/seo';

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'BMI Calculator',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Any',
    url: canonical('/bmi')
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
