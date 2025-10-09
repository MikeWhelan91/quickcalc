"use client";
import { useMemo, useState } from "react";
import CalcShell from "../components/CalcShell";
import { amortizedPayment } from "@/lib/finance";
import { clampNumberInput } from "@/lib/numbers";
import "./styles.css";

interface ScheduleRow {
  month: number;
  principal: number;
  interest: number;
  balance: number;
}

const RADIUS = 80;
const RING_CIRC = 2 * Math.PI * RADIUS;

function buildSchedule(amount: number, rate: number, months: number): ScheduleRow[] {
  if (months <= 0) return [];
  const payment = amortizedPayment(amount, rate, months);
  const monthlyRate = rate / 100 / 12;
  let balance = amount;
  const rows: ScheduleRow[] = [];
  for (let i = 1; i <= Math.min(months, 12); i++) {
    const interest = monthlyRate === 0 ? 0 : balance * monthlyRate;
    const principal = payment - interest;
    balance = Math.max(0, balance - principal);
    rows.push({ month: i, principal, interest, balance });
  }
  return rows;
}

export default function LoanClient(){
  const [amountInput, setAmountInput] = useState("15000");
  const [rateInput, setRateInput] = useState("7.9");
  const [monthsInput, setMonthsInput] = useState("48");

  const amount = useMemo(() => clampNumberInput(amountInput, { min: 0, fallback: 0 }), [amountInput]);
  const rate = useMemo(() => clampNumberInput(rateInput, { min: 0, fallback: 0 }), [rateInput]);
  const months = useMemo(() => clampNumberInput(monthsInput, { min: 1, fallback: 1 }), [monthsInput]);

  const payment = useMemo(()=> amortizedPayment(amount, rate, months), [amount, rate, months]);
  const total = useMemo(()=> payment * months, [payment, months]);
  const interest = useMemo(()=> total - amount, [total, amount]);

  const handleAmountBlur = () => {
    if (!amountInput.trim()) return;
    setAmountInput(`${amount}`);
  };

  const handleRateBlur = () => {
    if (!rateInput.trim()) return;
    setRateInput(`${rate}`);
  };

  const handleMonthsBlur = () => {
    if (!monthsInput.trim()) return;
    setMonthsInput(`${months}`);
  };

  const schedule = useMemo(() => buildSchedule(amount, rate, months), [amount, rate, months]);
  const interestShare = total > 0 ? interest / total : 0;

  return (
    <CalcShell title="Loan Calculator" subtitle="Payments, totals and your first year amortisation at a glance." result={
      <div className="loan-result">
        <div className="loan-kpis">
          <div className="loan-card">
            <span className="label">Monthly</span>
            <strong>€{Math.round(payment).toLocaleString()}</strong>
          </div>
          <div className="loan-card">
            <span className="label">Total interest</span>
            <strong>€{Math.round(interest).toLocaleString()}</strong>
          </div>
          <div className="loan-card">
            <span className="label">Total paid</span>
            <strong>€{Math.round(total).toLocaleString()}</strong>
          </div>
        </div>
        <div className="loan-ring" aria-hidden="true">
          <svg width="200" height="200" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r={RADIUS} stroke="rgba(15,31,58,0.1)" strokeWidth="24" fill="none" />
            <circle
              cx="100"
              cy="100"
              r={RADIUS}
              stroke="url(#loanGradient)"
              strokeWidth="24"
              strokeDasharray={`${interestShare * RING_CIRC} ${(1-interestShare) * RING_CIRC}`}
              strokeLinecap="round"
              fill="none"
              transform="rotate(-90 100 100)"
            />
            <defs>
              <linearGradient id="loanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--accent)" />
                <stop offset="100%" stopColor="var(--primary)" />
              </linearGradient>
            </defs>
            <text x="100" y="92" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--navy)">
              {Math.round(interestShare * 100)}%
            </text>
            <text x="100" y="112" textAnchor="middle" fontSize="12" fill="var(--muted)">
              interest share
            </text>
          </svg>
        </div>
        {schedule.length > 0 && (
          <div className="loan-bars">
            {schedule.map(row => {
              const totalBar = row.principal + row.interest;
              const principalWidth = totalBar > 0 ? (row.principal / totalBar) * 100 : 0;
              const interestWidth = totalBar > 0 ? (row.interest / totalBar) * 100 : 0;
              return (
                <div key={row.month} className="bar-row">
                  <span>Month {row.month}</span>
                  <div className="bar">
                    <div className="principal" style={{ width: `${principalWidth}%` }} />
                    <div className="interest" style={{ width: `${interestWidth}%` }} />
                  </div>
                  <span>€{Math.round(row.balance).toLocaleString()}</span>
                </div>
              );
            })}
          </div>
        )}
        <p className="small">Bars show principal vs interest for your first 12 payments. Balance is updated after each payment.</p>
      </div>
    }>
      <div className="grid grid-2">
        <div><label>Loan amount (€)</label><input className="input" type="number" value={amountInput} onChange={e=>setAmountInput(e.target.value)} onBlur={handleAmountBlur} /></div>
        <div><label>Interest rate (% p.a.)</label><input className="input" type="number" step="0.01" value={rateInput} onChange={e=>setRateInput(e.target.value)} onBlur={handleRateBlur} /></div>
        <div><label>Term (months)</label><input className="input" type="number" min={1} step={1} value={monthsInput} onChange={e=>setMonthsInput(e.target.value)} onBlur={handleMonthsBlur} /></div>
      </div>
    </CalcShell>
  );
}
