import Image from 'next/image';

const entries = [
  {
    title: 'What is a mortgage?',
    body:
      'A mortgage is a secured loan used to purchase property. The home is collateral, so the lender can repossess it if the borrower stops paying. Payments are usually monthly and cover interest plus a slice of the original balance.',
    image: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/30_year_mortgage_calculator.webp/640px-30_year_mortgage_calculator.webp.png',
      alt: '30-year mortgage calculator screenshot'
    }
  },
  {
    title: 'How is mortgage interest calculated?',
    body:
      'Most lenders compound interest monthly. They take the annual percentage rate, divide it by 12 and apply it to the outstanding balance. As the balance falls, the interest portion shrinks and more of each payment goes toward principal.',
    image: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Compound_interest_%28English%29.gif/640px-Compound_interest_%28English%29.gif',
      alt: 'Compound interest diagram'
    }
  },
  {
    title: 'What is private mortgage insurance (PMI)?',
    body:
      'PMI protects lenders on loans with small down payments. You pay an extra monthly premium until you build roughly 20% equity, at which point most lenders let you cancel it.'
  },
  {
    title: 'How do property taxes and insurance affect my payment?',
    body:
      'Many lenders escrow taxes, homeowner’s insurance and even HOA fees. They collect one-twelfth of the annual amount with each mortgage payment so big bills are covered automatically.'
  },
  {
    title: 'What is an amortisation schedule?',
    body:
      'An amortisation schedule lists every payment over the loan term, showing interest, principal and the remaining balance. It is useful for budgeting and spotting how extra payments shorten the loan.'
  }
];

export default function MortgageFAQ() {
  return (
    <section className="detail-section">
      <div className="card detail-hero">
        <p className="eyebrow">Mortgage essentials</p>
        <h2>Mortgage FAQs</h2>
        <p>
          Mortgages combine several moving parts—principal, interest, taxes, insurance and fees. Use these FAQs to
          understand the terminology our calculator surfaces so you can negotiate confidently with lenders.
        </p>
      </div>
      <div className="detail-grid">
        {entries.map(item => (
          <article key={item.title} className="card info-card">
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            {item.image && (
              <Image
                src={item.image.src}
                alt={item.image.alt}
                width={640}
                height={360}
                sizes="(max-width: 640px) 100vw, 640px"
                style={{ width: '100%', height: 'auto', borderRadius: 12 }}
              />
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
