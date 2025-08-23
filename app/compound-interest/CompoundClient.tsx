'use client';
import { useMemo, useState } from 'react';
import CalcShell from '../components/CalcShell';

export default function CompoundClient() {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(5);
  const [times, setTimes] = useState(12);
  const [years, setYears] = useState(10);
  const [contrib, setContrib] = useState(0);

  const amount = useMemo(() => {
    const P = principal;
    const r = rate / 100;
    const n = times;
    const t = years;
    const c = contrib;
    const pow = Math.pow(1 + r / n, n * t);
    const future = P * pow + (c > 0 ? c * ( (pow - 1) / (r / n) ) : 0);
    return +future.toFixed(2);
  }, [principal, rate, times, years, contrib]);

  const contributed = useMemo(() => principal + contrib * times * years, [principal, contrib, times, years]);
  const interest = useMemo(() => +(amount - contributed).toFixed(2), [amount, contributed]);

  return (
    <CalcShell
      title="Compound Interest Calculator"
      subtitle="Estimate investment growth with optional periodic contributions."
      result={
        <>
          <div className="kpi"><span>Future Value</span><span>${amount.toFixed(2)}</span></div>
          <div style={{ height: 10 }} />
          <div className="kpi"><span>Interest Earned</span><span>${interest.toFixed(2)}</span></div>
        </>
      }
    >
      <div className="grid grid-2">
        <div>
          <label>Principal ($)</label>
          <input className="input" type="number" value={principal} onChange={e => setPrincipal(+e.target.value)} />
        </div>
        <div>
          <label>Rate (% per year)</label>
          <input className="input" type="number" step="0.01" value={rate} onChange={e => setRate(+e.target.value)} />
        </div>
        <div>
          <label>Compounds / year</label>
          <input className="input" type="number" value={times} onChange={e => setTimes(+e.target.value)} />
        </div>
        <div>
          <label>Years</label>
          <input className="input" type="number" value={years} onChange={e => setYears(+e.target.value)} />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label>Contribution per period ($)</label>
          <input className="input" type="number" value={contrib} onChange={e => setContrib(+e.target.value)} />
        </div>
      </div>
    </CalcShell>
  );
}
