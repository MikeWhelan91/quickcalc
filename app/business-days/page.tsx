import Script from 'next/script';
import BizDaysClient from './BizDaysClient';
import BizDaysGuide from './BizDaysGuide';
import { canonical } from '@/lib/seo';

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Business Days Calculator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    url: canonical('/business-days')
  };
  return (
    <>
      <Script id="schema-business-days" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>
      <BizDaysClient />
      <BizDaysGuide />
    </>
  );
}
