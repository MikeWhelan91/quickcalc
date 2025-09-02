import Link from 'next/link';
import type { Metadata } from 'next';
import { canonical } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'QuickCalc Guides – Learn the Math Behind the Answers',
  description:
    'In-depth guides explaining how our calculators work and the formulas they use.',
  keywords: [
    'calculator guides',
    'mortgage guide',
    'loan guide',
    'age calculator help',
    'compound interest guide'
  ],
  alternates: { canonical: canonical('/guides') },
  openGraph: {
    title: 'QuickCalc Guides – Learn the Math Behind the Answers',
    description:
      'In-depth guides explaining how our calculators work and the formulas they use.',
    url: canonical('/guides'),
    images: [
      { url: '/logos/social-1200.png', width: 1200, height: 1200, alt: 'QuickCalc logo' }
    ]
  }
};

const guides = [
  {
    href: '/loan',
    title: 'Loan Calculator Guide',
    desc: 'Understand amortization and payment schedules.'
  },
  {
    href: '/age',
    title: 'Age Calculator Guide',
    desc: 'See how we compute exact age in years, months and days.'
  },
  {
    href: '/compound-interest',
    title: 'Compound Interest Guide',
    desc: 'Learn the formula behind growing investments.'
  }
];

export default function Page() {
  return (
    <section className="card" style={{ marginTop: 24 }}>
      <h1>Calculator Guides</h1>
      <p>
        Each QuickCalc tool comes with an explanation so you know what the numbers mean.
        Start learning:
      </p>
      <ul>
        {guides.map(g => (
          <li key={g.href} style={{ marginTop: 12 }}>
            <Link className="fancy-link" href={g.href}>{g.title}</Link> – {g.desc}
          </li>
        ))}
      </ul>
    </section>
  );
}
