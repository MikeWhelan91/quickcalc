export default function TipGuide() {
  return (
    <section className="detail-section">
      <div className="card detail-hero">
        <p className="eyebrow">Guide</p>
        <h2>How the Tip Calculator Works</h2>
        <p>
          Enter the bill total, choose a tip percentage and optionally split the bill between diners. QuickCalc instantly
          recomputes the tip amount, grand total and per-person split while the dial shows what share of the bill is tip.
        </p>
        <ul className="detail-list">
          <li>Percentage slider for common tipping ranges.</li>
          <li>Instant per-person totals including food vs. tip breakdown.</li>
          <li>Visual dial shows how generous the tip is compared to the subtotal.</li>
        </ul>
      </div>
      <div className="detail-grid">
        <article className="card info-card">
          <h3>Tip formula</h3>
          <p>
            Tip amount is <code>{'bill × (percentage / 100)'}</code>. Total due equals bill plus tip, and the per-person cost is
            that total divided by the number of diners. We keep values to two decimals for easy settlement.
          </p>
        </article>
        <article className="card info-card">
          <h3>Splitting bills</h3>
          <p>
            Adjust the people field to share both the food cost and the tip evenly. We also display how much of the per-person
            total is food versus tip so you can settle up with friends who round differently.
          </p>
        </article>
        <article className="card info-card">
          <h3>Etiquette cues</h3>
          <p>
            The dial makes it obvious when you are below, within or above common tipping norms. Increase or decrease the
            percentage until the tip share feels right for the service received.
          </p>
          <p className="small">
            Source:{' '}
            <a href="https://www.consumer.ftc.gov/articles/tipping-guide" target="_blank" rel="noopener">
              FTC Consumer Advice – Tipping guide
            </a>
          </p>
        </article>
      </div>
    </section>
  );
}
