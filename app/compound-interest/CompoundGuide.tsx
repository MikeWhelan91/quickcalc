export default function CompoundGuide() {
  return (
    <section className="detail-section">
      <div className="card detail-hero">
        <p className="eyebrow">Guide</p>
        <h2>How Compound Interest Works</h2>
        <p>
          Compound interest grows your savings by applying interest to both the original principal and the interest that has
          already accrued. Our calculator lets you add recurring contributions so you can see when your deposits get overtaken
          by growth.
        </p>
        <ul className="detail-list">
          <li>Supports any compounding frequency and contribution schedule.</li>
          <li>Plots total balance vs. total contributions for clarity.</li>
          <li>Shows future value, total interest earned and total contributions.</li>
        </ul>
      </div>
      <div className="detail-grid">
        <article className="card info-card">
          <h3>The formula</h3>
          <p>
            We apply <code>{'A = P(1 + r/n)^{nt}'}</code> where <code>P</code> is the starting amount, <code>r</code> is the
            annual rate, <code>n</code> is compounding periods per year and <code>t</code> is years. Contributions are added by
            treating each deposit as its own compounding series.
          </p>
        </article>
        <article className="card info-card">
          <h3>Contribution impact</h3>
          <p>
            Setting a recurring contribution shows how much of the final balance came from your deposits versus growth. This
            helps you decide whether to increase deposits, chase higher rates or extend the time horizon.
          </p>
        </article>
        <article className="card info-card">
          <h3>Reading the chart</h3>
          <p>
            The solid line is projected balance while the dashed line is total contributions. When the solid line moves above
            the dashed line, compound interest has overtaken the money you put in—a key milestone for long-term investors.
          </p>
          <p className="small">
            Source:{' '}
            <a href="https://en.wikipedia.org/wiki/Compound_interest" target="_blank" rel="noopener">
              Compound interest – Wikipedia
            </a>
          </p>
        </article>
      </div>
    </section>
  );
}
