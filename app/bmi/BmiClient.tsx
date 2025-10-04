'use client';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import CalcShell from '../components/CalcShell';
import BmiGauge from '../components/BmiGauge';
import './styles.css';

type Unit = 'metric' | 'us' | 'uk';

type Gender = 'male' | 'female';

const AGE_LIMITS = { min: 2, max: 120 };

const LIMITS = {
  metric: { cm: { min: 90, max: 250 }, kg: { min: 25, max: 250 } },
  us: { ft: { min: 3, max: 7 }, in: { min: 0, max: 11 }, lb: { min: 60, max: 550 } },
  uk: { ft: { min: 3, max: 7 }, in: { min: 0, max: 11 }, st: { min: 4, max: 50 }, lb: { min: 0, max: 13 } }
};

function sanitize(v: string, min: number, max: number) {
  const cleaned = v.replace(/[^\d.]/g, '').replace(/^(\d*\.\d*).*/, '$1').replace(/^0+(?=\d)/, '');
  const n = parseFloat(cleaned);
  if (Number.isNaN(n)) return { n: NaN, raw: cleaned };
  return { n: Math.min(max, Math.max(min, n)), raw: cleaned };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

const BMI_COPY: Record<string, string> = {
  Underweight: 'Focus on nutrient-dense meals and strength training—professional guidance can help you gain safely.',
  Normal: 'Maintain this healthy range with a balanced plate, good sleep and regular movement.',
  Overweight: 'Small calorie adjustments and increased activity can help rebalance body fat over time.',
  Obesity: 'Work with a health professional on a sustainable nutrition and activity plan tailored to you.'
};

export default function BmiClient() {
  const [unit, setUnit] = useState<Unit>('metric');
  const [ageRaw, setAgeRaw] = useState('30');
  const [gender, setGender] = useState<Gender>('male');
  const [cmRaw, setCmRaw] = useState('175');
  const [kgRaw, setKgRaw] = useState('75');
  const [ftRaw, setFtRaw] = useState('5');
  const [inRaw, setInRaw] = useState('9');
  const [lbRaw, setLbRaw] = useState('165');
  const [stRaw, setStRaw] = useState('11');
  const [stLbRaw, setStLbRaw] = useState('0');

  const ageData = useMemo(() => sanitize(ageRaw, AGE_LIMITS.min, AGE_LIMITS.max), [ageRaw]);
  const ageError = !ageData.raw ? 'Enter age.' : Number.isNaN(ageData.n) ? 'Invalid number.' : '';

  const { cm, kg, ft, inch, lb, st, error } = useMemo(() => {
    if (unit === 'metric') {
      const sH = sanitize(cmRaw, LIMITS.metric.cm.min, LIMITS.metric.cm.max);
      const sW = sanitize(kgRaw, LIMITS.metric.kg.min, LIMITS.metric.kg.max);
      const err = !sH.raw || !sW.raw ? 'Enter height and weight.' : (Number.isNaN(sH.n) || Number.isNaN(sW.n)) ? 'Invalid number.' : '';
      return { cm: sH.n, kg: sW.n, ft: NaN, inch: NaN, lb: NaN, st: NaN, error: err };
    }
    if (unit === 'us') {
      const sF = sanitize(ftRaw, LIMITS.us.ft.min, LIMITS.us.ft.max);
      const sI = sanitize(inRaw, LIMITS.us.in.min, LIMITS.us.in.max);
      const sL = sanitize(lbRaw, LIMITS.us.lb.min, LIMITS.us.lb.max);
      const err = !sF.raw || !sI.raw || !sL.raw ? 'Enter height and weight.' : (Number.isNaN(sF.n) || Number.isNaN(sI.n) || Number.isNaN(sL.n)) ? 'Invalid number.' : '';
      return { cm: NaN, kg: NaN, ft: sF.n, inch: sI.n, lb: sL.n, st: NaN, error: err };
    }
    const sF = sanitize(ftRaw, LIMITS.uk.ft.min, LIMITS.uk.ft.max);
    const sI = sanitize(inRaw, LIMITS.uk.in.min, LIMITS.uk.in.max);
    const sS = sanitize(stRaw, LIMITS.uk.st.min, LIMITS.uk.st.max);
    const sP = sanitize(stLbRaw, LIMITS.uk.lb.min, LIMITS.uk.lb.max);
    const err = !sF.raw || !sI.raw || !sS.raw || !sP.raw ? 'Enter height and weight.' : (Number.isNaN(sF.n) || Number.isNaN(sI.n) || Number.isNaN(sS.n) || Number.isNaN(sP.n)) ? 'Invalid number.' : '';
    return { cm: NaN, kg: NaN, ft: sF.n, inch: sI.n, lb: sP.n, st: sS.n, error: err };
  }, [unit, cmRaw, kgRaw, ftRaw, inRaw, lbRaw, stRaw, stLbRaw]);

  const bmi = useMemo(() => {
    if (error) return NaN;
    if (unit === 'metric') {
      const h = cm / 100;
      return +(kg / (h * h)).toFixed(1);
    }
    const totalIn = ft * 12 + inch;
    const weightLb = unit === 'us' ? lb : st * 14 + lb;
    return +((weightLb / (totalIn * totalIn)) * 703).toFixed(1);
  }, [unit, cm, kg, ft, inch, lb, st, error]);

  const cat = useMemo(() => {
    if (!Number.isFinite(bmi)) return '';
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Overweight';
    return 'Obesity';
  }, [bmi]);

  const bfp = useMemo(() => {
    if (!Number.isFinite(bmi) || ageError) return NaN;
    const g = gender === 'male' ? 1 : 0;
    return +(1.2 * bmi + 0.23 * ageData.n - 10.8 * g - 5.4).toFixed(1);
  }, [bmi, gender, ageData.n, ageError]);

  const healthyWeightRange = useMemo(() => {
    if (!Number.isFinite(bmi) || error) return null;
    if (unit === 'metric') {
      const meters = cm / 100;
      const min = 18.5 * meters * meters;
      const max = 24.9 * meters * meters;
      return {
        primary: `${min.toFixed(1)} – ${max.toFixed(1)} kg`,
        secondary: `${(min * 2.20462).toFixed(1)} – ${(max * 2.20462).toFixed(1)} lb`
      };
    }
    const totalIn = ft * 12 + inch;
    const meters = totalIn * 0.0254;
    const minKg = 18.5 * meters * meters;
    const maxKg = 24.9 * meters * meters;
    const minLb = minKg * 2.20462;
    const maxLb = maxKg * 2.20462;
    if (unit === 'us') {
      return {
        primary: `${minLb.toFixed(1)} – ${maxLb.toFixed(1)} lb`,
        secondary: `${minKg.toFixed(1)} – ${maxKg.toFixed(1)} kg`
      };
    }
    return {
      primary: `${(minLb / 14).toFixed(1)} – ${(maxLb / 14).toFixed(1)} st`,
      secondary: `${Math.round(minLb)} – ${Math.round(maxLb)} lb`
    };
  }, [unit, bmi, error, cm, ft, inch]);

  const bmiAdvice = BMI_COPY[cat] ?? '';
  const bmiPosition = useMemo(() => (Number.isFinite(bmi) ? clamp((bmi - 12) / (40 - 12), 0, 1) : 0), [bmi]);

  return (
    <>
      <CalcShell
          title="BMI Calculator"
          subtitle="Calculate your Body Mass Index and body fat percentage. Units: Metric, US or St/lb."
          result={
            <div className="bmi-result">
              <div className="bmi-stats">
                <div className="bmi-kpi">
                  <span className="label">BMI</span>
                  <strong>{Number.isFinite(bmi) ? bmi : '—'}</strong>
                </div>
                <div className="bmi-kpi">
                  <span className="label">Category</span>
                  <strong>{Number.isFinite(bmi) ? cat : '—'}</strong>
                </div>
                <div className="bmi-kpi">
                  <span className="label">Body fat %</span>
                  <strong>{Number.isFinite(bfp) ? `${bfp}%` : '—'}</strong>
                </div>
              </div>
              <div className="bmi-visual">
                <BmiGauge value={Number.isFinite(bmi) ? bmi : 0} />
                <div className="bmi-bar">
                  <div className="bmi-bar-track">
                    <div className="bmi-bar-fill" style={{ width: `${bmiPosition * 100}%` }} />
                  </div>
                  <div className="bmi-bar-labels">
                    <span>12</span>
                    <span>40</span>
                  </div>
                </div>
              </div>
              {healthyWeightRange && (
                <div className="bmi-range">
                  <div>
                    <span className="label">Healthy weight range</span>
                    <strong>{healthyWeightRange.primary}</strong>
                  </div>
                  <span className="alt">≈ {healthyWeightRange.secondary}</span>
                </div>
              )}
              {bmiAdvice && <p className="bmi-advice">{bmiAdvice}</p>}
              <p className="small">BMI and body fat % are screening tools only. Consult a health professional for personalised advice.</p>
            </div>
          }
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div className="segment" role="tablist" aria-label="Units">
              <button className={unit === 'metric' ? 'active' : ''} onClick={() => setUnit('metric')} role="tab" aria-selected={unit === 'metric'}>Metric</button>
              <button className={unit === 'us' ? 'active' : ''} onClick={() => setUnit('us')} role="tab" aria-selected={unit === 'us'}>US Units</button>
              <button className={unit === 'uk' ? 'active' : ''} onClick={() => setUnit('uk')} role="tab" aria-selected={unit === 'uk'}>St/lb</button>
            </div>
          </div>

          <div className="grid grid-2" style={{ marginBottom: 12 }}>
            <div>
              <label>Age</label>
              <input
                className={`input ${ageError ? 'error' : ''}`}
                inputMode="numeric"
                type="text"
                value={ageRaw}
                maxLength={3}
                onChange={(e) => setAgeRaw(e.target.value)}
                placeholder={`${AGE_LIMITS.min}–${AGE_LIMITS.max}`}
              />
            </div>
            <div>
              <label>Gender</label>
              <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <input type="radio" name="gender" value="male" checked={gender === 'male'} onChange={() => setGender('male')} />
                  Male
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <input type="radio" name="gender" value="female" checked={gender === 'female'} onChange={() => setGender('female')} />
                  Female
                </label>
              </div>
            </div>
          </div>
          {ageError && <div className="help-error">{ageError}</div>}

          {unit === 'metric' ? (
            <div className="grid grid-2">
              <div>
                <label>Height</label>
                <label className="label-unit">Centimeters</label>
                <input
                  className={`input ${error ? 'error' : ''}`}
                  inputMode="decimal"
                  type="text"
                  value={cmRaw}
                  maxLength={5}
                  onChange={(e) => setCmRaw(e.target.value)}
                  placeholder={`${LIMITS.metric.cm.min}–${LIMITS.metric.cm.max}`}
                />
              </div>
              <div>
                <label>Weight</label>
                <label className="label-unit">Kilograms</label>
                <input
                  className={`input ${error ? 'error' : ''}`}
                  inputMode="decimal"
                  type="text"
                  value={kgRaw}
                  maxLength={6}
                  onChange={(e) => setKgRaw(e.target.value)}
                  placeholder={`${LIMITS.metric.kg.min}–${LIMITS.metric.kg.max}`}
                />
              </div>
              {error && <div className="help-error" style={{ gridColumn: '1 / -1' }}>{error}</div>}
            </div>
          ) : unit === 'us' ? (
            <div className="grid grid-2">
              <div>
                <label>Height</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label className="label-unit">Feet</label>
                    <input className={`input ${error ? 'error' : ''}`} inputMode="numeric" type="text" value={ftRaw} maxLength={1} onChange={(e) => setFtRaw(e.target.value)} placeholder={`${LIMITS.us.ft.min}–${LIMITS.us.ft.max}`} />
                  </div>
                  <div>
                    <label className="label-unit">Inches</label>
                    <input className={`input ${error ? 'error' : ''}`} inputMode="numeric" type="text" value={inRaw} maxLength={2} onChange={(e) => setInRaw(e.target.value)} placeholder={`${LIMITS.us.in.min}–${LIMITS.us.in.max}`} />
                  </div>
                </div>
              </div>
              <div>
                <label>Weight</label>
                <div>
                  <label className="label-unit">Pounds</label>
                  <input className={`input ${error ? 'error' : ''}`} inputMode="decimal" type="text" value={lbRaw} maxLength={4} onChange={(e) => setLbRaw(e.target.value)} placeholder={`${LIMITS.us.lb.min}–${LIMITS.us.lb.max}`} />
                </div>
              </div>
              {error && <div className="help-error" style={{ gridColumn: '1 / -1' }}>{error}</div>}
            </div>
          ) : (
            <div className="grid grid-2">
              <div>
                <label>Height</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label className="label-unit">Feet</label>
                    <input className={`input ${error ? 'error' : ''}`} inputMode="numeric" type="text" value={ftRaw} maxLength={1} onChange={(e) => setFtRaw(e.target.value)} placeholder={`${LIMITS.uk.ft.min}–${LIMITS.uk.ft.max}`} />
                  </div>
                  <div>
                    <label className="label-unit">Inches</label>
                    <input className={`input ${error ? 'error' : ''}`} inputMode="numeric" type="text" value={inRaw} maxLength={2} onChange={(e) => setInRaw(e.target.value)} placeholder={`${LIMITS.uk.in.min}–${LIMITS.uk.in.max}`} />
                  </div>
                </div>
              </div>
              <div>
                <label>Weight</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label className="label-unit">Stone</label>
                    <input className={`input ${error ? 'error' : ''}`} inputMode="numeric" type="text" value={stRaw} maxLength={2} onChange={(e) => setStRaw(e.target.value)} placeholder={`${LIMITS.uk.st.min}–${LIMITS.uk.st.max}`} />
                  </div>
                  <div>
                    <label className="label-unit">Pounds</label>
                    <input className={`input ${error ? 'error' : ''}`} inputMode="numeric" type="text" value={stLbRaw} maxLength={2} onChange={(e) => setStLbRaw(e.target.value)} placeholder={`${LIMITS.uk.lb.min}–${LIMITS.uk.lb.max}`} />
                  </div>
                </div>
              </div>
              {error && <div className="help-error" style={{ gridColumn: '1 / -1' }}>{error}</div>}
            </div>
          )}
        </CalcShell>
      <section className="card bmi-info" style={{ marginTop: 24 }}>
        <h2>What is Body Mass Index?</h2>
        <p>Body mass index (BMI) is a simple measure of weight relative to height used to classify underweight, normal weight, overweight and obesity in adults.</p>
        <Image
          src="/images/obesity-bmi.png"
          width={800}
          height={733}
          alt="Illustration showing BMI categories: normal, overweight, obese"
          sizes="(max-width: 800px) 100vw, 800px"
          style={{ width: '100%', height: 'auto' }}
        />
        <h3 style={{ marginTop: 24 }}>How BMI is calculated</h3>
        <p>The formula is <strong>BMI = weight (kg) / height<sup>2</sup> (m<sup>2</sup>)</strong>. You can also use pounds and inches with the same calculator.</p>
        <Image
          src="/images/bmi-chart.png"
          width={800}
          height={450}
          alt="BMI chart for a range of heights and weights"
          sizes="(max-width: 800px) 100vw, 800px"
          style={{ width: '100%', height: 'auto' }}
        />
        <h3 style={{ marginTop: 24 }}>BMI categories</h3>
        <ul>
          <li>Underweight: BMI below 18.5</li>
          <li>Normal weight: 18.5 to 24.9</li>
          <li>Overweight: 25 to 29.9</li>
          <li>Obese: 30 or higher</li>
        </ul>
        <h3 style={{ marginTop: 24 }}>Limitations</h3>
        <p>BMI does not directly measure body fat and may misclassify muscular or elderly individuals. Consult a health professional for a full assessment.</p>
        <p className="small">Source: <a href="https://en.wikipedia.org/wiki/Body_mass_index" target="_blank" rel="noopener">Wikipedia</a></p>
      </section>
    </>
  );
}
