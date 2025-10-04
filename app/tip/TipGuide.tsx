import React from 'react';

export default function TipGuide() {
  return (
    <section className="card" style={{ marginTop: 24 }}>
      <h2>How the Tip Calculator Works</h2>
      <p>
        The tip calculator applies a percentage to the bill total and splits the sum among diners
        when needed.
      </p>
      <h3 style={{ marginTop: 24 }}>Tip formula</h3>
      <p>
        <code>{"Tip = bill \u00d7 (percentage / 100)"}</code>. The total per person is the bill plus
        tip divided by the number of people.
      </p>
      <p>
        The circular share dial in the calculator visualises how much of the final bill is tip.
        Adjusting the percentage updates the dial instantly so you can see whether you are tipping
        below or above common norms.
      </p>
      <h3 style={{ marginTop: 24 }}>Why it matters</h3>
      <p>
        Quickly calculating fair tips helps avoid awkward math at the table and ensures staff
        are properly compensated.
      </p>
      <p className="small">
        Source:{' '}
        <a
          href="https://www.consumer.ftc.gov/articles/tipping-guide"
          target="_blank"
          rel="noopener"
        >
          FTC Consumer Advice
        </a>
      </p>
    </section>
  );
}
