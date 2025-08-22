import MortgageClient from './MortgageClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mortgage Calculator — Global Home Loan Estimates',
  description: 'Calculate mortgage payments worldwide with taxes, insurance and fees in multiple currencies.',
  keywords: ['mortgage calculator', 'home loan', 'amortization', 'property tax', 'home insurance'],
  alternates: { canonical: '/mortgage' },
  openGraph: {
    title: 'Mortgage Calculator — Global Home Loan Estimates',
    description: 'Calculate mortgage payments worldwide with taxes, insurance and fees in multiple currencies.',
    images: [{ url: '/images/mortgage.jpg', width: 1200, height: 630, alt: 'Mortgage calculator' }]
  }
};

export default function Page() {
  return <MortgageClient />;
}
