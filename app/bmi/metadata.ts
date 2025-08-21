import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BMI & Body Fat Calculator — Body Mass Index',
  description: 'Compute your Body Mass Index, estimate body fat percentage and learn about BMI categories, formula and limitations.',
  keywords: ['BMI', 'Body Mass Index', 'body fat', 'BMI calculator', 'health'],
  openGraph: {
    title: 'BMI & Body Fat Calculator — Body Mass Index',
    description: 'Compute your Body Mass Index, estimate body fat percentage and learn about BMI categories, formula and limitations.',
    images: [{ url: '/images/bmi.jpg', width: 1200, height: 630, alt: 'BMI calculator' }],
  },
};
