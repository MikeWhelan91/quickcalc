import type { Metadata } from 'next';
import { canonical } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Tip Calculator — Visual Bill Splitter',
  description: 'Quickly split restaurant bills, see tip share percentages and cost per person with adjustable percentages.',
  keywords: ['tip calculator', 'bill splitter', 'restaurant tip', 'split bill', 'tip percentage'],
  alternates: { canonical: canonical('/tip') },
  openGraph: {
    title: 'Tip Calculator — Visual Bill Splitter',
    description: 'Quickly split restaurant bills, see tip share percentages and cost per person with adjustable percentages.',
    url: canonical('/tip'),
    images: [{ url: '/images/tips.jpg', width: 1200, height: 630, alt: 'Tip calculator share dial' }]
  }
};
