import type { Metadata } from 'next';
import Script from 'next/script';
import LoanClient from './LoanClient';

export const metadata: Metadata = {
  title: 'Loan Calculator — Monthly Payment & Interest Estimator',
  description: 'Calculate loan repayments, total interest and payoff costs for personal or auto loans.',
  keywords: ['loan calculator','payment calculator','interest calculator','amortization','personal loan','auto loan'],
  alternates: { canonical: '/loan' },
  openGraph: {
    title: 'Loan Calculator — Monthly Payment & Interest Estimator',
    description: 'Calculate loan repayments, total interest and payoff costs for personal or auto loans.',
    images: [{ url: '/images/loan.jpg', width: 1200, height: 630, alt: 'Loan calculator' }]
  }
};

export default function Page() {
  const base = process.env.SITE_URL ?? 'https://quickcalc.me';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Loan Calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    url: `${base}/loan`
  };
  return (
    <>
      <Script id="schema-loan" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>
      <LoanClient />
    </>
  );
}
