import type { Metadata } from 'next';
import { canonical } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'BMI & Body Fat Calculator — Healthy Weight Range Tool',
  description: 'Compute your Body Mass Index, estimate body fat and see the ideal weight range for your height with our interactive BMI calculator.',
  keywords: ['BMI calculator', 'body fat calculator', 'healthy weight range', 'body mass index'],
  alternates: { canonical: canonical('/bmi') },
  openGraph: {
    title: 'BMI & Body Fat Calculator — Healthy Weight Range Tool',
    description: 'Compute your Body Mass Index, estimate body fat and see the ideal weight range for your height with our interactive BMI calculator.',
    url: canonical('/bmi'),
    images: [{ url: '/images/bmi.jpg', width: 1200, height: 630, alt: 'BMI calculator with gauge' }],
  },
};
