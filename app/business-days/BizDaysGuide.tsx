export default function BizDaysGuide() {
  return (
    <section className="detail-section">
      <div className="card detail-hero">
        <p className="eyebrow">Guide</p>
        <h2>How the Business Days Calculator Works</h2>
        <p>
          Business days are counted by skipping weekends and optional public holidays between two dates. QuickCalc lets you pick
          a country calendar so local observances are automatically excluded.
        </p>
        <ul className="detail-list">
          <li>Counts weekdays only and subtracts configured holidays.</li>
          <li>Shows a coloured bar for workdays, weekends and holidays.</li>
          <li>Breaks out totals so you can justify schedules to stakeholders.</li>
        </ul>
      </div>
      <div className="detail-grid">
        <article className="card info-card">
          <h3>Counting rules</h3>
          <p>
            Starting from the first date, we iterate day by day and add to the business-day total only when the day is Monday–Friday
            and not on the selected holiday list. This mirrors how HR teams count service levels.
          </p>
        </article>
        <article className="card info-card">
          <h3>Holidays & countries</h3>
          <p>
            Choose a supported country to automatically exclude national holidays. You can still override weekends or include
            custom closures by toggling the relevant options before running the count.
          </p>
        </article>
        <article className="card info-card">
          <h3>Why it matters</h3>
          <p>
            Shipping timelines, payment terms and compliance deadlines are usually defined in business days. Having a transparent
            breakdown avoids disputes and keeps teams aligned on what the calendar really allows.
          </p>
          <p className="small">
            Source:{' '}
            <a href="https://en.wikipedia.org/wiki/Business_day" target="_blank" rel="noopener">
              Business day – Wikipedia
            </a>
          </p>
        </article>
      </div>
    </section>
  );
}
