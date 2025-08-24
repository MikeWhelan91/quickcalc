import Script from 'next/script';
import DateDiffClient from './DateDiffClient';
import { canonical } from '@/lib/seo';

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Date Difference Calculator',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    url: canonical('/date-diff')
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
