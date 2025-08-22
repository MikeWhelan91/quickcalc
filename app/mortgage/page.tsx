import MortgageClient from './MortgageClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mortgage Calculator — Country-Specific Home Loan Estimates',
  description: 'Country-aware mortgage calculator for the US, Canada, UK, Australia, Europe and India with taxes, insurance, fees and upfront costs.',
  keywords: ['mortgage calculator', 'home loan', 'amortization', 'down payment', 'property tax', 'home insurance', 'HOA fees', 'strata fees', 'condo fees', 'ground rent', 'stamp duty', 'CMHC insurance', 'LMI', 'notary fees', 'processing fee', 'US', 'Canada', 'UK', 'Australia', 'India', 'Europe'],
  alternates: { canonical: '/mortgage' },
  openGraph: {
    title: 'Mortgage Calculator — Country-Specific Home Loan Estimates',
    description: 'Country-aware mortgage calculator for the US, Canada, UK, Australia, Europe and India with taxes, insurance, fees and upfront costs.',
    images: [{ url: '/images/mortgage.jpg', width: 1200, height: 630, alt: 'Mortgage calculator' }]
  }
};

export default function Page() {
  return <MortgageClient />;
}
