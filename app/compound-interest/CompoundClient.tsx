'use client';
import { useMemo, useState } from 'react';
import CalcShell from '../components/CalcShell';
import { clampNumberInput } from '@/lib/numbers';
import './styles.css';

type GrowthPoint = { year: number; balance: number; contributions: number };

function compoundBalance(principal: number, rate: number, times: number, years: number, contrib: number) {
  const r = rate / 100;
  const n = times;
  if (r === 0) {
    return principal + contrib * n * years;
  }
  const pow = Math.pow(1 + r / n, n * years);
  const future = principal * pow + (contrib > 0 ? contrib * ((pow - 1) / (r / n)) : 0);
  return future;
}

export default function CompoundClient() {
  const [principalInput, setPrincipalInput] = useState('10000');
  const [rateInput, setRateInput] = useState('5');
  const [timesInput, setTimesInput] = useState('12');
  const [yearsInput, setYearsInput] = useState('10');
  const [contribInput, setContribInput] = useState('0');

  const principal = useMemo(() => clampNumberInput(principalInput, { min: 0, fallback: 0 }), [principalInput]);
  const rate = useMemo(() => clampNumberInput(rateInput, { min: 0, fallback: 0 }), [rateInput]);
  const times = useMemo(() => clampNumberInput(timesInput, { min: 1, fallback: 1 }), [timesInput]);
  const years = useMemo(() => clampNumberInput(yearsInput, { min: 1, fallback: 1 }), [yearsInput]);
  const contrib = useMemo(() => clampNumberInput(contribInput, { min: 0, fallback: 0 }), [contribInput]);

  const amount = useMemo(() => {
    return +compoundBalance(principal, rate, times, years, contrib).toFixed(2);
  }, [principal, rate, times, years, contrib]);

  const contributed = useMemo(() => principal + contrib * times * years, [principal, contrib, times, years]);
  const interest = useMemo(() => +(amount - contributed).toFixed(2), [amount, contributed]);

  const handlePrincipalBlur = () => {
    if (!principalInput.trim()) return;
    setPrincipalInput(`${principal}`);
  };

  const handleRateBlur = () => {
    if (!rateInput.trim()) return;
    setRateInput(`${rate}`);
  };

  const handleTimesBlur = () => {
    if (!timesInput.trim()) return;
    setTimesInput(`${times}`);
  };

  const handleYearsBlur = () => {
    if (!yearsInput.trim()) return;
    setYearsInput(`${years}`);
  };

  const handleContribBlur = () => {
    if (!contribInput.trim()) return;
    setContribInput(`${contrib}`);
  };

  const growth = useMemo<GrowthPoint[]>(() => {
    const points: GrowthPoint[] = [];
    for (let y = 0; y <= years; y++) {
      const balance = compoundBalance(principal, rate, times, y, contrib);
      const contributions = principal + contrib * times * y;
      points.push({ year: y, balance, contributions });
    }
    return points;
  }, [principal, rate, times, years, contrib]);

  const maxBalance = Math.max(...growth.map(g => g.balance), 1);

  return (
    <CalcShell
      title="Compound Interest Calculator"
      subtitle="Estimate investment growth with optional periodic contributions."
      result={
        <div className="compound-result">
          <div className="compound-kpis">
            <div className="compound-card">
              <span className="label">Future value</span>
              <strong>${amount.toFixed(2)}</strong>
            </div>
            <div className="compound-card">
              <span className="label">Interest earned</span>
              <strong>${interest.toFixed(2)}</strong>
            </div>
            <div className="compound-card">
              <span className="label">Total contributions</span>
              <strong>${contributed.toFixed(2)}</strong>
            </div>
          </div>
          <svg className="compound-chart" viewBox="0 0 600 260" role="img" aria-label="Projected balance over time">
            <defs>
              <linearGradient id="growthLine" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--accent)" />
                <stop offset="100%" stopColor="var(--primary)" />
              </linearGradient>
            </defs>
            <polyline
              fill="none"
              stroke="url(#growthLine)"
              strokeWidth="4"
              points={growth
                .map(p => {
                  const x = (p.year / Math.max(years, 1)) * 560 + 20;
                  const y = 220 - (p.balance / maxBalance) * 200;
                  return `${x},${y}`;
                })
                .join(' ')
              }
            />
            <polyline
              fill="none"
              stroke="rgba(15,31,58,0.25)"
              strokeWidth="2"
              strokeDasharray="6 6"
              points={growth
                .map(p => {
                  const x = (p.year / Math.max(years, 1)) * 560 + 20;
                  const y = 220 - (p.contributions / maxBalance) * 200;
                  return `${x},${y}`;
                })
                .join(' ')
              }
            />
            <line x1="20" y1="220" x2="580" y2="220" stroke="rgba(15,31,58,0.2)" />
            <line x1="20" y1="20" x2="20" y2="220" stroke="rgba(15,31,58,0.2)" />
            <text x="580" y="240" textAnchor="end" fill="var(--muted)" fontSize="12">Years</text>
            <text x="24" y="32" fill="var(--muted)" fontSize="12">Balance</text>
          </svg>
          <div className="compound-legend">
            <span className="dot growth" /> Growth
            <span className="dot contrib" /> Contributions
          </div>
          <p className="small">Solid line shows projected balance. Dashed line shows total contributions over time.</p>
        </div>
      }
    >
      <div className="grid grid-2">
        <div>
          <label>Principal ($)</label>
          <input className="input" type="number" value={principalInput} onChange={e => setPrincipalInput(e.target.value)} onBlur={handlePrincipalBlur} />
        </div>
        <div>
          <label>Rate (% per year)</label>
          <input className="input" type="number" step="0.01" value={rateInput} onChange={e => setRateInput(e.target.value)} onBlur={handleRateBlur} />
        </div>
        <div>
          <label>Compounds / year</label>
          <input className="input" type="number" value={timesInput} onChange={e => setTimesInput(e.target.value)} onBlur={handleTimesBlur} />
        </div>
        <div>
          <label>Years</label>
          <input className="input" type="number" value={yearsInput} onChange={e => setYearsInput(e.target.value)} onBlur={handleYearsBlur} />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label>Contribution per period ($)</label>
          <input className="input" type="number" value={contribInput} onChange={e => setContribInput(e.target.value)} onBlur={handleContribBlur} />
      </div>
      </div>
    </CalcShell>
  );
}
