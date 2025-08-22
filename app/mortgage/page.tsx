import MortgageClient from './MortgageClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mortgage Calculator — Global Home Loan Estimates',
  description: 'Calculate mortgage payments worldwide with clear sections for loan basics, recurring charges and one-off fees in your chosen currency.',
  keywords: ['mortgage calculator', 'home loan', 'amortization', 'property tax', 'home insurance', 'stamp duty', 'upfront fees'],
  alternates: { canonical: '/mortgage' },
  openGraph: {
    title: 'Mortgage Calculator — Global Home Loan Estimates',
    description: 'Calculate mortgage payments worldwide with clear sections for loan basics, recurring charges and one-off fees in your chosen currency.',
    images: [{ url: '/images/mortgage.jpg', width: 1200, height: 630, alt: 'Mortgage calculator' }]
  }
};

export default function Page() {
  return <MortgageClient />;
}
