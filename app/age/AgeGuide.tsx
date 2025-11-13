export default function AgeGuide() {
  return (
    <section className="detail-section">
      <div className="card detail-hero">
        <p className="eyebrow">Guide</p>
        <h2>How the Age Calculator Works</h2>
        <p>
          The calculator measures the exact time between your date of birth and the current moment, then breaks that
          span into years, months and days. It also locates your next birthday and plots life expectancy progress so
          you can see where you stand.
        </p>
        <ul className="detail-list">
          <li>Accurate chronological age based on calendar math.</li>
          <li>Countdown to the next birthday and milestone years.</li>
          <li>Life expectancy dial to visualise long-term progress.</li>
        </ul>
      </div>
      <div className="detail-grid">
        <article className="card info-card">
          <h3>Manual calculation</h3>
          <p>
            Subtract the birth date from today. If the current month/day is before your birthday, borrow a month and the
            matching number of days from the previous month to keep the values positive. That yields the familiar Y/M/D
            breakdown we show in the UI.
          </p>
        </article>
        <article className="card info-card">
          <h3>Milestones & countdowns</h3>
          <p>
            We compute the next birthday and milestones like 40 and 65 by adding fixed year offsets to your birth date.
            The progress bars compare days lived to the days required to reach each milestone, giving a quick glance at
            how close you are.
          </p>
        </article>
        <article className="card info-card">
          <h3>Why it matters</h3>
          <p>
            Precise age is required for passports, medical screenings, benefits eligibility and planning for retirement
            or schooling. Seeing the countdown encourages proactive planning rather than reacting when deadlines appear.
          </p>
          <p className="small">
            Source:{' '}
            <a href="https://en.wikipedia.org/wiki/Chronological_age" target="_blank" rel="noopener">
              Chronological age – Wikipedia
            </a>
          </p>
        </article>
      </div>
    </section>
  );
}
