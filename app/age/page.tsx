import Script from 'next/script';
import AgeClient from './AgeClient';
import AgeGuide from './AgeGuide';
import { canonical } from '@/lib/seo';

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Age Calculator',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    url: canonical('/age')
  };
  return (
    <>
      <Script id="schema-age" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>
      <AgeClient />
      <AgeGuide />
    </>
  );
}
