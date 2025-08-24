import type { Metadata } from 'next';
import { canonical } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Date Difference Calculator — Days Between Dates',
  description: 'Calculate days and weeks between two dates instantly.',
  keywords: ['date difference', 'days between dates', 'date calculator', 'duration calculator'],
  alternates: { canonical: canonical('/date-diff') },
  openGraph: {
    title: 'Date Difference Calculator — Days Between Dates',
    description: 'Calculate days and weeks between two dates instantly.',
    url: canonical('/date-diff'),
    images: [{ url: '/images/date.jpg', width: 1200, height: 630, alt: 'Date difference calculator' }]
  }
};
