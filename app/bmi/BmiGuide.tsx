import React from 'react';

export default function BmiGuide() {
  return (
    <section className="card" style={{ marginTop: 24 }}>
      <h2>Understanding Body Mass Index</h2>
      <p>
        Body Mass Index (BMI) estimates body fat by comparing your weight to your height.
        It uses a simple formula to categorize weight ranges.
      </p>
      <h3 style={{ marginTop: 24 }}>BMI formula</h3>
      <p>
        <code>{"BMI = weight / height^2"}</code> where weight is in kilograms and height in meters.
      </p>
      <h3 style={{ marginTop: 24 }}>Why it matters</h3>
      <p>
        BMI is a quick screening tool for identifying potential weight problems but it does not
        directly measure body fat or account for muscle mass.
      </p>
      <p className="small">
        Source:{' '}
        <a
          href="https://www.cdc.gov/healthyweight/assessing/bmi/index.html"
          target="_blank"
          rel="noopener"
        >
          Centers for Disease Control and Prevention
        </a>
      </p>
    </section>
  );
}
