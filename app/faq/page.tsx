import Script from 'next/script';
import type { Metadata } from 'next';
import { canonical } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'QuickCalc FAQs – Answers to Common Questions',
  description: 'Find answers about QuickCalc pricing, accuracy, privacy and device support.',
  keywords: [
    'quickcalc faq',
    'calculator help',
    'is quickcalc free',
    'calculator accuracy',
    'privacy'
  ],
  alternates: { canonical: canonical('/faq') },
  openGraph: {
    title: 'QuickCalc FAQs – Answers to Common Questions',
    description: 'Find answers about QuickCalc pricing, accuracy, privacy and device support.',
    url: canonical('/faq'),
    images: [
      { url: '/logos/social-1200.png', width: 1200, height: 1200, alt: 'QuickCalc logo' }
    ]
  }
};

const faqs = [
  {
    question: 'Is QuickCalc free to use?',
    answer: 'Yes, every calculator is free with no sign-up, ads or paywalls so you can run as many scenarios as you need.'
  },
  {
    question: 'Are your calculators accurate?',
    answer:
      'Each tool is built on well-documented formulas and is regression-tested against trusted references. Still, you should double-check any output that affects legal, medical or financial commitments.'
  },
  {
    question: 'Do you store my data?',
    answer: 'No personal inputs are persisted on our servers. Calculations run entirely in your browser and you can clear results by refreshing the page.'
  },
  {
    question: 'Can I use QuickCalc on mobile?',
    answer: 'Absolutely. The responsive layout is tuned for small screens, keyboards and screen readers so you can run calculations on the go.'
  },
  {
    question: 'Can I embed QuickCalc on my site or wiki?',
    answer: 'Yes, you can link directly to any calculator with preset query parameters. Full embeddable widgets are coming soon—reach out if you would like early access.'
  },
  {
    question: 'How can I report a problem or suggest a calculator?',
    answer:
      'Open an issue on GitHub or email support@quickcalc.me with the steps to reproduce your issue or details about the calculator you would like to see.'
  }
];

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer }
    }))
  };

  return (
    <>
      <Script id="schema-faq" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>
      <section className="detail-section">
        <div className="card detail-hero">
          <p className="eyebrow">Support</p>
          <h1>Frequently Asked Questions</h1>
          <p>
            Whether you care about cost, privacy or device support, this FAQ covers the most common QuickCalc
            questions. All calculators share the same principles: instant math, no accounts and SEO-friendly content
            you can reference anywhere.
          </p>
          <ul className="detail-list">
            <li>Transparent pricing (it is free).</li>
            <li>Clear data practices and security.</li>
            <li>Ways to extend QuickCalc with embeds and feature requests.</li>
          </ul>
        </div>
        <div className="faq-grid">
          {faqs.map(f => (
            <article key={f.question} className="card faq-item">
              <h3>{f.question}</h3>
              <p>{f.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
