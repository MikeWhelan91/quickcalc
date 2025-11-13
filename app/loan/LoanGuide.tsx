export default function LoanGuide() {
  return (
    <section className="detail-section">
      <div className="card detail-hero">
        <p className="eyebrow">Guide</p>
        <h2>Understanding Loan Payments</h2>
        <p>
          QuickCalc uses the standard amortisation formula to show how much you owe each month, how much of that payment is
          interest and how quickly the balance declines. Adjust the rate or term to see the trade-offs instantly.
        </p>
        <ul className="detail-list">
          <li>Fixed-payment amortisation for any loan size and rate.</li>
          <li>First-year bars highlight the principal vs. interest mix.</li>
          <li>Interest share ring reveals how expensive the loan really is.</li>
        </ul>
      </div>
      <div className="detail-grid">
        <article className="card info-card">
          <h3>The equation</h3>
          <p>
            Payments follow <code>{'Payment = P × r / (1 - (1 + r)^{-n})'}</code> where <code>P</code> is principal,
            <code>r</code> is the periodic interest rate and <code>n</code> is the number of payments. We convert annual
            rates to monthly before running the math.
          </p>
        </article>
        <article className="card info-card">
          <h3>Interpreting the visuals</h3>
          <p>
            The circular meter shows how much of the total paid over the life of the loan goes to interest. The bar chart plots
            the first 12 months, making it easy to see how principal share grows as the balance shrinks.
          </p>
        </article>
        <article className="card info-card">
          <h3>Planning decisions</h3>
          <p>
            Shorter terms cost more each month but save interest. Longer terms lower the payment but increase interest share.
            Use the calculator to test terms, rates and extra payments before signing paperwork.
          </p>
          <p className="small">
            Source:{' '}
            <a
              href="https://www.consumerfinance.gov/ask-cfpb/what-is-a-loan-amortization-schedule-en-1877/"
              target="_blank"
              rel="noopener"
            >
              CFPB – Loan amortisation schedules
            </a>
          </p>
        </article>
      </div>
    </section>
  );
}
