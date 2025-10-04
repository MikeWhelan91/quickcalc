import type { Metadata } from 'next';
import { canonical } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Loan Calculator — Interactive Amortisation & Interest Share',
  description: 'Plan your personal or auto loan with monthly payments, interest share ring and first-year amortisation bars.',
  keywords: ['loan calculator', 'monthly payment', 'interest share', 'amortisation schedule', 'personal loan'],
  alternates: { canonical: canonical('/loan') },
  openGraph: {
    title: 'Loan Calculator — Interactive Amortisation & Interest Share',
    description: 'Plan your personal or auto loan with monthly payments, interest share ring and first-year amortisation bars.',
    url: canonical('/loan'),
    images: [{ url: '/images/loan.jpg', width: 1200, height: 630, alt: 'Loan calculator amortisation' }]
  }
};
