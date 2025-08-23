import React from 'react';

export default function MortgageGuide() {
  return (
    <section className="card" style={{ marginTop: 24 }}>
      <h2>Mortgage Basics</h2>
      <p>
        A mortgage is a long‑term loan used to purchase property. The home itself serves as
        collateral and payments typically include both principal and interest.
      </p>
      <h3 style={{ marginTop: 24 }}>Key factors</h3>
      <ul>
        <li>Principal – the amount borrowed</li>
        <li>Interest rate – the cost of borrowing</li>
        <li>Term – how long you have to repay the loan</li>
      </ul>
      <h3 style={{ marginTop: 24 }}>Why it matters</h3>
      <p>
        Understanding these elements helps you estimate total costs and choose the right mortgage for
        your budget.
      </p>
      <p className="small">
        Source:{' '}
        <a href="https://en.wikipedia.org/wiki/Mortgage_loan" target="_blank" rel="noopener">
          Wikipedia
        </a>
      </p>
    </section>
  );
}
