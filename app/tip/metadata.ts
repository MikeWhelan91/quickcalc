import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tip Calculator — Split Bills & Tips',
  description: 'Quickly split restaurant bills and tips per person with adjustable percentages.',
  keywords: ['tip calculator', 'bill splitter', 'restaurant tip', 'split bill', 'gratuity'],
  alternates: { canonical: '/tip' },
  openGraph: {
    title: 'Tip Calculator — Split Bills & Tips',
    description: 'Quickly split restaurant bills and tips per person with adjustable percentages.',
    images: [{ url: '/images/tips.jpg', width: 1200, height: 630, alt: 'Tip calculator' }]
  }
};
