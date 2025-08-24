import type { Metadata } from 'next';
import { canonical } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Business Days Calculator — Workday Counter',
  description: 'Count business days between dates excluding weekends and public holidays for multiple countries.',
  keywords: ['business days calculator', 'working days', 'workday calculator', 'public holidays', 'business day counter'],
  alternates: { canonical: canonical('/business-days') },
  openGraph: {
    title: 'Business Days Calculator — Workday Counter',
    description: 'Count business days between dates excluding weekends and public holidays for multiple countries.',
    url: canonical('/business-days'),
    images: [{ url: '/images/business.jpg', width: 1200, height: 630, alt: 'Business days calculator' }]
  }
};
