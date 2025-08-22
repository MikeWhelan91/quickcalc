"use client";
import { useMemo, useState } from "react";
import CalcShell from "../components/CalcShell";
import { amortizedPayment } from "@/lib/finance";

export default function LoanClient(){
  const [amount, setAmount] = useState(15000);
  const [rate, setRate] = useState(7.9);
  const [months, setMonths] = useState(48);

  const m = useMemo(()=> amortizedPayment(amount, rate, months), [amount, rate, months]);
  const total = useMemo(()=> m * months, [m, months]);
  const interest = useMemo(()=> total - amount, [total, amount]);

  return (
    <CalcShell title="Loan Calculator" subtitle="Payments and totals for personal/auto loans." result={
      <>
        <div className="kpi"><span>Monthly</span><span>€{Math.round(m).toLocaleString()}</span></div>
        <div style={{height:10}}/>
        <div className="kpi"><span>Total interest</span><span>€{Math.round(interest).toLocaleString()}</span></div>
        <div style={{height:10}}/>
        <div className="kpi"><span>Total paid</span><span>€{Math.round(total).toLocaleString()}</span></div>
      </>
    }>
      <div className="grid grid-2">
        <div><label>Loan amount (€)</label><input className="input" type="number" value={amount} onChange={e=>setAmount(+e.target.value)} /></div>
        <div><label>Interest rate (% p.a.)</label><input className="input" type="number" step="0.01" value={rate} onChange={e=>setRate(+e.target.value)} /></div>
        <div><label>Term (months)</label><input className="input" type="number" min={1} step={1} value={months} onChange={e=>setMonths(+e.target.value)} /></div>
      </div>
    </CalcShell>
  );
}
