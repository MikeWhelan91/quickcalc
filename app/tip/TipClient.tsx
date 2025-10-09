"use client";
import { useMemo, useState } from "react";
import CalcShell from "../components/CalcShell";
import { clampNumberInput } from "@/lib/numbers";
import "./styles.css";

const SIZE = 180;
const STROKE = 18;
const RADIUS = (SIZE - STROKE) / 2;
const CIRC = 2 * Math.PI * RADIUS;

function createDash(percent: number) {
  const clamped = Math.min(1, Math.max(0, percent));
  const filled = CIRC * clamped;
  return `${filled} ${CIRC - filled}`;
}

export default function TipClient(){
  const [billInput, setBillInput] = useState("80");
  const [tipInput, setTipInput] = useState("12.5");
  const [peopleInput, setPeopleInput] = useState("2");

  const bill = useMemo(() => clampNumberInput(billInput, { min: 0, fallback: 0 }), [billInput]);
  const tip = useMemo(() => clampNumberInput(tipInput, { min: 0, fallback: 0 }), [tipInput]);
  const people = useMemo(() => clampNumberInput(peopleInput, { min: 1, fallback: 1 }), [peopleInput]);

  const tipAmt = useMemo(()=> +(bill * tip / 100).toFixed(2), [bill, tip]);
  const total = useMemo(()=> +(bill + tipAmt).toFixed(2), [bill, tipAmt]);
  const per = useMemo(()=> people > 0 ? +(total / people).toFixed(2) : 0, [total, people]);
  const perTip = useMemo(()=> people > 0 ? +(tipAmt / people).toFixed(2) : 0, [tipAmt, people]);
  const basePer = useMemo(()=> people > 0 ? +((bill) / people).toFixed(2) : 0, [bill, people]);

  const handleBillBlur = () => {
    if (!billInput.trim()) return;
    setBillInput(`${bill}`);
  };

  const handleTipBlur = () => {
    if (!tipInput.trim()) return;
    setTipInput(`${tip}`);
  };

  const handlePeopleBlur = () => {
    if (!peopleInput.trim()) return;
    setPeopleInput(`${people}`);
  };

  const tipShare = total > 0 ? tipAmt / total : 0;

  return (
    <CalcShell title="Tip Calculator" subtitle="Split the bill and tips quickly with a visual share dial." result={
      <div className="tip-result">
        <div className="tip-visual" aria-hidden="true">
          <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} role="presentation">
            <defs>
              <linearGradient id="tipGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--accent)" />
                <stop offset="100%" stopColor="var(--primary)" />
              </linearGradient>
            </defs>
            <circle cx={SIZE/2} cy={SIZE/2} r={RADIUS} stroke="rgba(15,31,58,0.1)" strokeWidth={STROKE} fill="none" />
            <circle
              cx={SIZE/2}
              cy={SIZE/2}
              r={RADIUS}
              stroke="url(#tipGradient)"
              strokeWidth={STROKE}
              strokeDasharray={createDash(tipShare)}
              strokeLinecap="round"
              fill="none"
              transform={`rotate(-90 ${SIZE/2} ${SIZE/2})`}
            />
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="24" fontWeight="700" fill="var(--navy)">
              {(tipShare * 100).toFixed(1)}%
            </text>
            <text x="50%" y="50%" dominantBaseline="hanging" textAnchor="middle" dy="18" fontSize="12" fill="var(--muted)">
              tip share
            </text>
          </svg>
        </div>
        <div className="tip-metrics">
          <div className="tip-card">
            <span className="label">Tip</span>
            <strong>€{tipAmt.toFixed(2)}</strong>
          </div>
          <div className="tip-card">
            <span className="label">Total</span>
            <strong>€{total.toFixed(2)}</strong>
          </div>
          <div className="tip-card">
            <span className="label">Per person</span>
            <strong>€{per.toFixed(2)}</strong>
            <span className="sub">€{basePer.toFixed(2)} food / €{perTip.toFixed(2)} tip</span>
          </div>
        </div>
      </div>
    }>
      <div className="grid grid-2">
        <div><label>Bill (€)</label><input className="input" type="number" step="0.01" value={billInput} onChange={e=>setBillInput(e.target.value)} onBlur={handleBillBlur} /></div>
        <div><label>Tip (%)</label><input className="input" type="number" step="0.1" value={tipInput} onChange={e=>setTipInput(e.target.value)} onBlur={handleTipBlur} /></div>
        <div><label>People</label><input className="input" type="number" min={1} step={1} value={peopleInput} onChange={e=>setPeopleInput(e.target.value)} onBlur={handlePeopleBlur} /></div>
      </div>
    </CalcShell>
  );
}
