import Link from 'next/link';
import type { Metadata } from 'next';
import { canonical } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'QuickCalc Guides – Learn the Math Behind the Answers',
  description:
    'In-depth guides explaining how our calculators work and the formulas they use.',
  keywords: [
    'calculator guides',
    'loan guide',
    'age calculator help',
    'compound interest guide',
    'bmi guide',
    'date difference guide',
    'tip guide',
    'business days guide'
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
    desc: 'Understand amortisation math before you sign a personal, car or student loan.',
    category: 'Borrowing',
    bullets: ['Monthly repayment formula', 'Interest vs principal over time', 'How term length changes totals']
  },
  {
    href: '/age',
    title: 'Age Calculator Guide',
    desc: 'See how we compute exact age in years, months, days and countdown to the next birthday.',
    category: 'Life planning',
    bullets: ['Calendar-based Y/M/D maths', 'Countdown to milestones', 'Life expectancy visualisation']
  },
  {
    href: '/compound-interest',
    title: 'Compound Interest Guide',
    desc: 'Learn the compounding formula and the impact of recurring deposits on future value.',
    category: 'Investing',
    bullets: ['A = P(1 + r/n)^{nt}', 'Contribution growth vs. interest', 'Comparing compounding frequencies']
  },
  {
    href: '/bmi',
    title: 'BMI Calculator Guide',
    desc: 'Understand the BMI equation, body-fat estimate and how to interpret categories.',
    category: 'Health',
    bullets: ['Metric and imperial inputs', 'Body-fat approximation', 'Healthy weight ranges']
  },
  {
    href: '/date-diff',
    title: 'Date Difference Guide',
    desc: 'Learn the ISO 8601 rules we use to count exact days, weeks and months.',
    category: 'Scheduling',
    bullets: ['UTC-safe date maths', 'Timeline visual cues', 'Handling leap years']
  },
  {
    href: '/tip',
    title: 'Tip Calculator Guide',
    desc: 'Get the tipping formula plus etiquette guidance for group bills.',
    category: 'Everyday money',
    bullets: ['Tip percentage math', 'Per-person splits', 'Regional tipping norms']
  },
  {
    href: '/business-days',
    title: 'Business Days Guide',
    desc: 'See how we skip weekends and optional holidays to get accurate workday counts.',
    category: 'Operations',
    bullets: ['Weekend + holiday removal', 'Country-aware calendars', 'Timeline breakdowns']
  }
];

export default function Page() {
  return (
    <section className="detail-section">
      <div className="card detail-hero">
        <p className="eyebrow">Guidance</p>
        <h1>Calculator Guides</h1>
        <p>
          Every calculator on QuickCalc ships with a plain-language explainer covering the inputs, formulas and
          best practices for interpreting the output. Use the guides below to understand the maths before you make
          a financial, health or planning decision.
        </p>
        <ul className="detail-list">
          <li>Step-by-step walkthroughs of the exact equations we implement.</li>
          <li>Use-case tips so you can apply the result in the real world.</li>
          <li>Links back to each calculator for instant hands-on practice.</li>
        </ul>
      </div>
      <div className="guide-grid">
        {guides.map(guide => (
          <article key={guide.href} className="card info-card">
            <p className="eyebrow">{guide.category}</p>
            <h3>{guide.title}</h3>
            <p>{guide.desc}</p>
            <ul className="detail-list">
              {guide.bullets.map(point => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <p style={{ marginTop: 16 }}>
              <Link className="fancy-link" href={guide.href}>Open calculator</Link>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
