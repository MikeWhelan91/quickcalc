import React from 'react';

export default function DateDiffGuide() {
  return (
    <section className="card" style={{ marginTop: 24 }}>
      <h2>How the Date Difference Calculator Works</h2>
      <p>
        The calculator finds the time between two dates by converting them to UTC and
        subtracting the start from the end. The result is broken into days, weeks and years.
      </p>
      <h3 style={{ marginTop: 24 }}>Manual calculation</h3>
      <p>
        Count the number of days between the dates and divide as needed: 7 days per week and
        365 days per year (taking leap years into account).
      </p>
      <h3 style={{ marginTop: 24 }}>Why it matters</h3>
      <p>
        Knowing exact gaps between dates is useful for project planning, age tracking and
        legal deadlines.
      </p>
      <p className="small">
        Source:{' '}
        <a
          href="https://en.wikipedia.org/wiki/ISO_8601"
          target="_blank"
          rel="noopener"
        >
          ISO 8601
        </a>
      </p>
    </section>
  );
}
