import type { Metadata } from 'next';
import { canonical } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'BMI & Body Fat Calculator — Body Mass Index',
  description: 'Compute your Body Mass Index with our interactive and stylish calculator, estimate body fat percentage and learn about BMI categories, formula and limitations.',
  keywords: ['BMI', 'Body Mass Index', 'body fat', 'BMI calculator', 'body fat calculator', 'health'],
  alternates: { canonical: canonical('/bmi') },
  openGraph: {
    title: 'BMI & Body Fat Calculator — Body Mass Index',
    description: 'Compute your Body Mass Index with our interactive and stylish calculator, estimate body fat percentage and learn about BMI categories, formula and limitations.',
    url: canonical('/bmi'),
    images: [{ url: '/images/bmi.jpg', width: 1200, height: 630, alt: 'BMI calculator' }],
  },
};
