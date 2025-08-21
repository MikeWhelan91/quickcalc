"use client";
import { useMemo, useState, useEffect } from "react";
import CalcShell from "../components/CalcShell";
import { amortizedPayment } from "@/lib/finance";

export default function MortgagePage(){
  const [amount, setAmount] = useState(300000);
  const [down, setDown] = useState(60000);
  const [rate, setRate] = useState(4.3);
  const [years, setYears] = useState(30);
  const [fx, setFx] = useState<{rates?: Record<string, number>}>({});

  useEffect(()=>{
    fetch("/api/fx?base=EUR&symbols=USD,GBP").then(r=>r.json()).then(setFx).catch(()=>{});
  }, []);

  const principal = Math.max(amount - down, 0);
  const m = useMemo(()=> amortizedPayment(principal, rate, years*12), [principal, rate, years]);
  const total = useMemo(()=> m * years * 12, [m, years]);
  const interest = useMemo(()=> total - principal, [total, principal]);

  const USD = fx.rates?.USD ? (m * (fx.rates.USD)).toFixed(0) : null;
  const GBP = fx.rates?.GBP ? (m * (fx.rates.GBP)).toFixed(0) : null;

  return (
    <CalcShell title="Mortgage Calculator" subtitle="Estimate monthly repayment and totals. FX conversion included." result={
      <>
        <div className="kpi"><span>Monthly (EUR)</span><span>€{Math.round(m).toLocaleString()}</span></div>
        <div style={{height:10}}/>
        {USD && <div className="kpi"><span>Monthly (USD)</span><span>${Number(USD).toLocaleString()}</span></div>}
        {GBP && <><div style={{height:10}}/><div className="kpi"><span>Monthly (GBP)</span><span>£{Number(GBP).toLocaleString()}</span></div></>}
        <div style={{height:10}}/>
        <div className="kpi"><span>Total interest</span><span>€{Math.round(interest).toLocaleString()}</span></div>
        <div style={{height:10}}/>
        <div className="kpi"><span>Total paid</span><span>€{Math.round(total).toLocaleString()}</span></div>
        <p className="small">Assumes fixed rate and standard amortization.</p>
      </>
    }>
      <div className="grid grid-2">
        <div><label>Home price (€)</label><input className="input" type="number" step={1000} value={amount} onChange={e=>setAmount(+e.target.value)} /></div>
        <div><label>Down payment (€)</label><input className="input" type="number" step={1000} value={down} onChange={e=>setDown(+e.target.value)} /></div>
        <div><label>Interest rate (% p.a.)</label><input className="input" type="number" step="0.01" value={rate} onChange={e=>setRate(+e.target.value)} /></div>
        <div><label>Term (years)</label><input className="input" type="number" min={1} max={40} value={years} onChange={e=>setYears(+e.target.value)} /></div>
      </div>
    </CalcShell>
  );
}
