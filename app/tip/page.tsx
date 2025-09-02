import Script from 'next/script';
import TipClient from './TipClient';
import TipGuide from './TipGuide';
import { canonical } from '@/lib/seo';

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Tip Calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    url: canonical('/tip')
  };
  return (
    <>
      <Script id="schema-tip" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>
      <TipClient />
      <TipGuide />
    </>
  );
}
