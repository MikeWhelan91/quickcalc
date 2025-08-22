import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Loan Calculator — Payment Schedule & Interest',
  description: 'Plan your personal or auto loan with monthly payment, total interest and payoff estimates.',
  keywords: ['loan calculator', 'monthly payment', 'interest calculator', 'personal loan', 'auto loan'],
  alternates: { canonical: '/loan' },
  openGraph: {
    title: 'Loan Calculator — Payment Schedule & Interest',
    description: 'Plan your personal or auto loan with monthly payment, total interest and payoff estimates.',
    images: [{ url: '/images/loan.jpg', width: 1200, height: 630, alt: 'Loan calculator' }]
  }
};
