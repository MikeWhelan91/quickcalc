import React from 'react';

export default function LoanGuide() {
  return (
    <section className="card" style={{ marginTop: 24 }}>
      <h2>Understanding Loan Payments</h2>
      <p>
        Loan calculators use the amortization formula to figure out fixed payments needed to pay off a
        balance over time. Each payment covers interest and reduces the principal.
      </p>
      <h3 style={{ marginTop: 24 }}>Amortization formula</h3>
      <p>
        <code>{"Payment = P \\times r / (1 - (1 + r)^{-n})"}</code> where <code>P</code> is the loan amount,
        <code>r</code> is the periodic interest rate and <code>n</code> is the total number of payments.
      </p>
      <h3 style={{ marginTop: 24 }}>Why it matters</h3>
      <p>
        Understanding amortization helps you compare loans and budget effectively by showing how much
        interest you’ll pay over the life of the loan.
      </p>
      <p>
        The visual bars in the calculator highlight the principal and interest mix for the first
        year so you can see how quickly the balance starts to fall.
      </p>
      <p className="small">
        Source:{' '}
        <a
          href="https://www.consumerfinance.gov/ask-cfpb/what-is-a-loan-amortization-schedule-en-1877/"
          target="_blank"
          rel="noopener"
        >
          Consumer Financial Protection Bureau
        </a>
      </p>
    </section>
  );
}
