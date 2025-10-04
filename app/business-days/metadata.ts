import type { Metadata } from 'next';
import { canonical } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Business Days Calculator — Workday Timeline & Breakdown',
  description: 'Count business days between dates, see weekend and public holiday breakdowns and support multiple countries.',
  keywords: ['business days calculator', 'working days', 'workday calculator', 'public holidays', 'business day breakdown'],
  alternates: { canonical: canonical('/business-days') },
  openGraph: {
    title: 'Business Days Calculator — Workday Timeline & Breakdown',
    description: 'Count business days between dates, see weekend and public holiday breakdowns and support multiple countries.',
    url: canonical('/business-days'),
    images: [{ url: '/images/business.jpg', width: 1200, height: 630, alt: 'Business days calculator interface' }]
  }
};
