import React from 'react';

export default function BizDaysGuide() {
  return (
    <section className="card" style={{ marginTop: 24 }}>
      <h2>How the Business Days Calculator Works</h2>
      <p>
        Business days are counted by skipping weekends and optional holidays between two dates.
        The calculator iterates day by day and increases the count only for qualifying weekdays.
      </p>
      <h3 style={{ marginTop: 24 }}>Manual calculation</h3>
      <p>
        List every day in the range, exclude Saturdays, Sundays and any holidays, then count the
        remaining days.
      </p>
      <p>
        The visual breakdown in the calculator mirrors this process by separating weekends,
        public holidays and true business days so you can immediately see which parts of the
        timeline remove working time.
      </p>
      <h3 style={{ marginTop: 24 }}>Why it matters</h3>
      <p>
        Business day counts are vital for project timelines, shipping estimates and legal notice
        periods.
      </p>
      <p className="small">
        Source:{' '}
        <a
          href="https://en.wikipedia.org/wiki/Business_day"
          target="_blank"
          rel="noopener"
        >
          Wikipedia
        </a>
      </p>
    </section>
  );
}
