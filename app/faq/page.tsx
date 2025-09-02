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
    answer: 'Yes, all calculators on QuickCalc are completely free with no sign-up required.'
  },
  {
    question: 'Are your calculators accurate?',
    answer:
      'Our tools use well-known formulas and are tested against trusted references, but results should be verified for critical decisions.'
  },
  {
    question: 'Do you store my data?',
    answer: 'No personal data is stored. All calculations happen in your browser for privacy.'
  },
  {
    question: 'Can I use QuickCalc on mobile?',
    answer: 'Absolutely. The site is fully responsive and works on phones, tablets and desktops.'
  },
  {
    question: 'How can I report a problem or suggest a calculator?',
    answer:
      'Reach out via the project issue tracker on GitHub or contact us at support@quickcalc.me.'
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
      <section className="card faq">
        <h1>Frequently Asked Questions</h1>
        {faqs.map(f => (
          <div key={f.question}>
            <h3>{f.question}</h3>
            <p>{f.answer}</p>
          </div>
        ))}
      </section>
    </>
  );
}
