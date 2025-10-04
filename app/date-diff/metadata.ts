import type { Metadata } from 'next';
import { canonical } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Date Difference Calculator — Timeline & Duration Breakdown',
  description: 'Calculate days, weeks, months and view a visual timeline between any two dates.',
  keywords: ['date difference', 'days between dates', 'duration calculator', 'date timeline'],
  alternates: { canonical: canonical('/date-diff') },
  openGraph: {
    title: 'Date Difference Calculator — Timeline & Duration Breakdown',
    description: 'Calculate days, weeks, months and view a visual timeline between any two dates.',
    url: canonical('/date-diff'),
    images: [{ url: '/images/date.jpg', width: 1200, height: 630, alt: 'Date difference calculator timeline' }]
  }
};
