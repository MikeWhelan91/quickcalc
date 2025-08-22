"use client";
import { useMemo, useState } from "react";
import CalcShell from "../components/CalcShell";
import { amortizedPayment } from "@/lib/finance";

export default function MortgageClient(){
  const currencies = ["EUR", "USD", "GBP"] as const;
  const symbolMap: Record<typeof currencies[number], string> = { EUR: "€", USD: "$", GBP: "£" };

  const [currency, setCurrency] = useState<typeof currencies[number]>("EUR");
  const [amount, setAmount] = useState(300000);
  const [down, setDown] = useState(60000);
  const [rate, setRate] = useState(4.3);
  const [years, setYears] = useState(30);
  const [propertyTax, setPropertyTax] = useState(2400); // annual
  const [insurance, setInsurance] = useState(1200); // annual
  const [hoa, setHoa] = useState(0); // monthly
  const [stampDuty, setStampDuty] = useState(0); // one-off
  const [fees, setFees] = useState(0); // one-off

  const principal = Math.max(amount - down, 0);
  const m = useMemo(() => amortizedPayment(principal, rate, years * 12), [principal, rate, years]);
  const monthlyTax = propertyTax / 12;
  const monthlyIns = insurance / 12;
  const monthlyTotal = useMemo(() => m + monthlyTax + monthlyIns + hoa, [m, monthlyTax, monthlyIns, hoa]);
  const total = useMemo(() => monthlyTotal * years * 12, [monthlyTotal, years]);
  const interest = useMemo(() => m * years * 12 - principal, [m, years, principal]);
  const upfront = useMemo(() => down + stampDuty + fees, [down, stampDuty, fees]);

  return (
    <CalcShell
      title="Mortgage Calculator"
      subtitle="Estimate repayments with taxes, insurance and fees."
      result={
        <>
          <div className="kpi"><span>Monthly ({currency})</span><span>{symbolMap[currency]}{Math.round(monthlyTotal).toLocaleString()}</span></div>
          <div style={{ height: 10 }} />
          <div className="kpi"><span>Total interest</span><span>{symbolMap[currency]}{Math.round(interest).toLocaleString()}</span></div>
          <div style={{ height: 10 }} />
          <div className="kpi"><span>Total paid</span><span>{symbolMap[currency]}{Math.round(total).toLocaleString()}</span></div>
          <div style={{ height: 10 }} />
          <div className="kpi"><span>Upfront costs</span><span>{symbolMap[currency]}{Math.round(upfront).toLocaleString()}</span></div>
          <p className="small">Estimates only. Taxes and fees are approximations.</p>
        </>
      }
    >
      <div className="form-section">
        <h2 className="section-title">Loan basics</h2>
        <div className="grid grid-2">
          <div><label>Home price <span className="label-unit">{symbolMap[currency]}</span></label><input className="input" type="number" step={1000} value={amount} onChange={e => setAmount(+e.target.value)} /></div>
          <div><label>Deposit <span className="label-unit">{symbolMap[currency]}</span></label><input className="input" type="number" step={1000} value={down} onChange={e => setDown(+e.target.value)} /></div>
          <div><label>Rate <span className="label-unit">% p.a.</span></label><input className="input" type="number" step="0.01" value={rate} onChange={e => setRate(+e.target.value)} /></div>
          <div><label>Term <span className="label-unit">years</span></label><input className="input" type="number" min={1} max={40} value={years} onChange={e => setYears(+e.target.value)} /></div>
        </div>
      </div>
      <div className="form-section">
        <h2 className="section-title">Recurring costs</h2>
        <div className="grid grid-2">
          <div><label>Property tax <span className="label-unit">{symbolMap[currency]}/yr</span></label><input className="input" type="number" step={100} value={propertyTax} onChange={e => setPropertyTax(+e.target.value)} /></div>
          <div><label>Insurance <span className="label-unit">{symbolMap[currency]}/yr</span></label><input className="input" type="number" step={100} value={insurance} onChange={e => setInsurance(+e.target.value)} /></div>
          <div><label>HOA/fees <span className="label-unit">{symbolMap[currency]}/mo</span></label><input className="input" type="number" step={10} value={hoa} onChange={e => setHoa(+e.target.value)} /></div>
          <div>
            <label>Currency</label>
            <select className="input" value={currency} onChange={e => setCurrency(e.target.value as typeof currencies[number])}>
              {currencies.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="form-section">
        <h2 className="section-title">One-off costs</h2>
        <div className="grid grid-2">
          <div><label>Stamp duty <span className="label-unit">{symbolMap[currency]}</span></label><input className="input" type="number" step={100} value={stampDuty} onChange={e => setStampDuty(+e.target.value)} /></div>
          <div><label>Other fees <span className="label-unit">{symbolMap[currency]}</span></label><input className="input" type="number" step={100} value={fees} onChange={e => setFees(+e.target.value)} /></div>
        </div>
      </div>
    </CalcShell>
  );
}
