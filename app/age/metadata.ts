import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Age Calculator — How Old Am I?',
  description: 'Determine your exact age in years, months, days and total days lived using our accurate age calculator.',
  keywords: ['age calculator', 'how old am I', 'date of birth', 'age in days'],
  alternates: { canonical: '/age' },
  openGraph: {
    title: 'Age Calculator — How Old Am I?',
    description: 'Determine your exact age in years, months, days and total days lived using our accurate age calculator.',
    images: [{ url: '/images/age.jpg', width: 1200, height: 630, alt: 'Age calculator' }]
  }
};
