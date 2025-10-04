import type { Metadata } from 'next';
import { canonical } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Age Calculator — Countdown to Your Next Birthday',
  description: 'Find your exact age in years, months and days, track time lived and see the live countdown to your next birthday.',
  keywords: ['age calculator', 'how old am I', 'next birthday countdown', 'age in days'],
  alternates: { canonical: canonical('/age') },
  openGraph: {
    title: 'Age Calculator — Countdown to Your Next Birthday',
    description: 'Find your exact age in years, months and days, track time lived and see the live countdown to your next birthday.',
    url: canonical('/age'),
    images: [{ url: '/images/age.jpg', width: 1200, height: 630, alt: 'Age calculator with countdown dial' }]
  }
};
