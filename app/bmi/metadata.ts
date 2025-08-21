import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BMI Calculator — Body Mass Index',
  description: 'Compute your Body Mass Index and learn about BMI categories, formula and limitations.',
  keywords: ['BMI', 'Body Mass Index', 'BMI calculator', 'health'],
  openGraph: {
    title: 'BMI Calculator — Body Mass Index',
    description: 'Compute your Body Mass Index and learn about BMI categories, formula and limitations.',
    images: [{ url: '/images/bmi.jpg', width: 1200, height: 630, alt: 'BMI calculator' }],
  },
};
