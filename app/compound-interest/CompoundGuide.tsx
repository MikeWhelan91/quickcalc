import React from 'react';

export default function CompoundGuide() {
  return (
    <section className="card" style={{ marginTop: 24 }}>
      <h2>How Compound Interest Works</h2>
      <p>
        Compound interest grows your savings by applying interest on both the original principal and
        the accumulated interest from previous periods.
      </p>
      <h3 style={{ marginTop: 24 }}>Formula</h3>
      <p>
        <code>{"A = P(1 + r/n)^{nt}"}</code> where <code>P</code> is the starting amount, <code>r</code> is
        the annual interest rate, <code>n</code> is the number of compounding periods per year and
        <code>t</code> is the number of years.
      </p>
      <h3 style={{ marginTop: 24 }}>Benefits of regular contributions</h3>
      <p>
        Adding a fixed contribution each period accelerates growth and can significantly increase the
        future value of your investment.
      </p>
      <p className="small">
        Source:{' '}
        <a href="https://en.wikipedia.org/wiki/Compound_interest" target="_blank" rel="noopener">
          Wikipedia
        </a>
      </p>
    </section>
  );
}
