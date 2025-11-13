export default function BmiGuide() {
  return (
    <section className="detail-section">
      <div className="card detail-hero">
        <p className="eyebrow">Guide</p>
        <h2>Understanding Body Mass Index</h2>
        <p>
          BMI compares weight to height to estimate body fat. QuickCalc supports metric, US customary and stone inputs, then
          converts everything into the universal BMI formula so you can benchmark yourself against WHO categories.
        </p>
        <ul className="detail-list">
          <li>Supports metric, imperial and st/lb conversions automatically.</li>
          <li>Calculates BMI, estimated body-fat percentage and healthy weight ranges.</li>
          <li>Highlights the category you fall into with context-sensitive advice.</li>
        </ul>
      </div>
      <div className="detail-grid">
        <article className="card info-card">
          <h3>The BMI formula</h3>
          <p>
            We apply <code>{'BMI = weight / height^2'}</code> with weight in kilograms and height in metres. Imperial and
            stone inputs are converted behind the scenes before applying the calculation so you always get a consistent result.
          </p>
        </article>
        <article className="card info-card">
          <h3>Body-fat estimate & ranges</h3>
          <p>
            Using the Deurenberg equation, we approximate body-fat percentage based on BMI, age and gender. We also show the
            healthy weight span that corresponds to a BMI between 18.5 and 24.9 so you can see realistic targets.
          </p>
        </article>
        <article className="card info-card">
          <h3>Limitations</h3>
          <p>
            BMI is a screening tool—it does not account for muscle mass or body composition. Always consult a healthcare
            professional before making major changes. Use BMI as a conversation starter, not a diagnosis.
          </p>
          <p className="small">
            Source:{' '}
            <a href="https://www.cdc.gov/healthyweight/assessing/bmi/index.html" target="_blank" rel="noopener">
              CDC Healthy Weight – BMI
            </a>
          </p>
        </article>
      </div>
    </section>
  );
}
