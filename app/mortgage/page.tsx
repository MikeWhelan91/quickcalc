import MortgageClient from './MortgageClient';
import MortgageFAQ from './MortgageFAQ';
import Script from 'next/script';
import type { Metadata } from 'next';
import { canonical } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Mortgage Calculator — Country-Specific Home Loan Estimates',
  description: 'Country-aware mortgage calculator for the US, Canada, UK, Australia, Europe and India with taxes, insurance, fees, upfront costs and a comprehensive mortgage FAQ.',
  keywords: ['mortgage calculator', 'home loan', 'amortization', 'down payment', 'property tax', 'home insurance', 'HOA fees', 'strata fees', 'body corporate fees', 'condo fees', 'ground rent', 'stamp duty', 'CMHC insurance', 'LMI', 'notary fees', 'processing fee', 'mortgage faq', 'home loan faq', 'mortgage questions', 'US', 'Canada', 'UK', 'Australia', 'India', 'Europe'],
  alternates: { canonical: canonical('/mortgage') },
  openGraph: {
    title: 'Mortgage Calculator — Country-Specific Home Loan Estimates',
    description: 'Country-aware mortgage calculator for the US, Canada, UK, Australia, Europe and India with taxes, insurance, fees, upfront costs and a comprehensive mortgage FAQ.',
    url: canonical('/mortgage'),
    images: [{ url: '/images/mortgage.jpg', width: 1200, height: 630, alt: 'Mortgage calculator' }]
  }
};

export default function Page() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is a mortgage?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A mortgage is a loan used to purchase real estate where the property itself serves as collateral. Borrowers repay the loan over a set term through monthly installments that cover principal and interest.'
        }
      },
      {
        '@type': 'Question',
        name: 'How is mortgage interest calculated?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Mortgage interest is typically compounded monthly. Lenders apply the annual percentage rate to the outstanding balance to determine the interest portion of each payment.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is private mortgage insurance (PMI)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PMI is insurance that protects the lender if a borrower defaults on a loan with a down payment below 20%. It can usually be removed once sufficient equity is built in the home.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do property taxes and insurance affect my payment?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Property taxes and homeowners insurance are often escrowed by the lender and added to your monthly mortgage payment, ensuring these obligations are paid on time.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is an amortization schedule?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An amortization schedule outlines each payment over the loan term, showing how much goes toward interest versus principal and the remaining balance after each installment.'
        }
      }
    ]
  };
  return (
    <>
      <Script id="schema-mortgage-faq" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqJsonLd)}
      </Script>
      <MortgageClient />
      <MortgageFAQ />
    </>
  );
}
