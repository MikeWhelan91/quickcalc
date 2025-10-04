import React from 'react';

export default function AgeGuide() {
  return (
    <section className="card" style={{ marginTop: 24 }}>
      <h2>How the Age Calculator Works</h2>
      <p>
        The age calculator determines your exact chronological age by finding the time between your
        date of birth and the current date. It breaks the span into years, months and days for
        precise results.
      </p>
      <h3 style={{ marginTop: 24 }}>Manual calculation</h3>
      <p>
        To compute age by hand, subtract the birth date from today’s date. If the current month and
        day precede your birthday, borrow months and days to adjust the difference.
      </p>
      <p>
        The live countdown in the calculator uses the next occurrence of your birth date to show the
        remaining days until you celebrate again. We assume a global life expectancy of 82 years to
        visualise the dial—this can be compared against your own goals or national averages.
      </p>
      <h3 style={{ marginTop: 24 }}>Why knowing your age matters</h3>
      <p>
        Exact age is often required for legal documents, health screenings and milestone planning
        such as retirement or educational enrollment.
      </p>
      <p className="small">
        Source:{' '}
        <a
          href="https://en.wikipedia.org/wiki/Chronological_age"
          target="_blank"
          rel="noopener"
        >
          Wikipedia
        </a>
      </p>
    </section>
  );
}
