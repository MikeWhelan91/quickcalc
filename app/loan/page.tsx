import Script from 'next/script';
import LoanClient from './LoanClient';
import LoanGuide from './LoanGuide';
import { canonical } from '@/lib/seo';

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Loan Calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    url: canonical('/loan')
  };
  return (
    <>
      <Script id="schema-loan" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>
      <LoanClient />
      <LoanGuide />
    </>
  );
}
