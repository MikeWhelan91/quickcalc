export default function DateDiffGuide() {
  return (
    <section className="detail-section">
      <div className="card detail-hero">
        <p className="eyebrow">Guide</p>
        <h2>How the Date Difference Calculator Works</h2>
        <p>
          We convert both dates to UTC, subtract the start from the end and then present the result in days, weeks, months and
          years. The visual timeline helps you understand how large the span is relative to a calendar year.
        </p>
        <ul className="detail-list">
          <li>Handles leap years and daylight-saving changes by using UTC.</li>
          <li>Shows timeline fill so you can compare spans at a glance.</li>
          <li>Breaks totals into smaller units for planning and documentation.</li>
        </ul>
      </div>
      <div className="detail-grid">
        <article className="card info-card">
          <h3>Manual counting</h3>
          <p>
            Count the number of days between the dates, then divide by 7 for weeks or by 30/365 for months and years. We do the
            same thing programmatically so you can trust the display even for long spans.
          </p>
        </article>
        <article className="card info-card">
          <h3>Timeline bar</h3>
          <p>
            The highlighted bar caps at one calendar year so you can quickly see whether the span is short (less than a month)
            or stretches across seasons. For longer spans we still show total days, weeks and months numerically.
          </p>
        </article>
        <article className="card info-card">
          <h3>Why it matters</h3>
          <p>
            Duration math powers project plans, legal deadlines, visa applications and personal milestones. Knowing the exact
            span prevents missed filings and gives stakeholders a single reference point.
          </p>
          <p className="small">
            Source:{' '}
            <a href="https://en.wikipedia.org/wiki/ISO_8601" target="_blank" rel="noopener">
              ISO 8601 – Date and time notation
            </a>
          </p>
        </article>
      </div>
    </section>
  );
}
