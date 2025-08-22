"use client";
import { useMemo, useState, useEffect } from "react";
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
  const [fx, setFx] = useState<{ rates?: Record<string, number> }>({});

  useEffect(() => {
    const symbols = currencies.filter(c => c !== currency).join(",");
    fetch(`/api/fx?base=${currency}&symbols=${symbols}`).then(r => r.json()).then(setFx).catch(() => {});
  }, [currency]);

  const principal = Math.max(amount - down, 0);
  const m = useMemo(() => amortizedPayment(principal, rate, years * 12), [principal, rate, years]);
  const monthlyTax = propertyTax / 12;
  const monthlyIns = insurance / 12;
  const monthlyTotal = useMemo(() => m + monthlyTax + monthlyIns + hoa, [m, monthlyTax, monthlyIns, hoa]);
  const total = useMemo(() => m * years * 12, [m, years]);
  const interest = useMemo(() => total - principal, [total, principal]);

  const conversions = Object.entries(fx.rates || {}).map(([code, rate]) => ({
    code,
    value: Math.round(monthlyTotal * rate)
  }));

  return (
    <CalcShell
      title="Mortgage Calculator"
      subtitle="Estimate repayments with taxes, insurance and fees. FX conversion included."
      result={
        <>
          <div className="kpi"><span>Monthly ({currency})</span><span>{symbolMap[currency]}{Math.round(monthlyTotal).toLocaleString()}</span></div>
          {conversions.map(c => (
            <div key={c.code}>
              <div style={{ height: 10 }} />
              <div className="kpi"><span>Monthly ({c.code})</span><span>{symbolMap[c.code as keyof typeof symbolMap]}{c.value.toLocaleString()}</span></div>
            </div>
          ))}
          <div style={{ height: 10 }} />
          <div className="kpi"><span>Total interest</span><span>{symbolMap[currency]}{Math.round(interest).toLocaleString()}</span></div>
          <div style={{ height: 10 }} />
          <div className="kpi"><span>Total paid</span><span>{symbolMap[currency]}{Math.round(total).toLocaleString()}</span></div>
          <p className="small">Assumes fixed rate and standard amortization.</p>
        </>
      }
    >
      <div className="grid grid-2">
        <div><label>Home price ({symbolMap[currency]})</label><input className="input" type="number" step={1000} value={amount} onChange={e => setAmount(+e.target.value)} /></div>
        <div><label>Down payment ({symbolMap[currency]})</label><input className="input" type="number" step={1000} value={down} onChange={e => setDown(+e.target.value)} /></div>
        <div><label>Interest rate (% p.a.)</label><input className="input" type="number" step="0.01" value={rate} onChange={e => setRate(+e.target.value)} /></div>
        <div><label>Term (years)</label><input className="input" type="number" min={1} max={40} value={years} onChange={e => setYears(+e.target.value)} /></div>
        <div><label>Property tax ({symbolMap[currency]}/yr)</label><input className="input" type="number" step={100} value={propertyTax} onChange={e => setPropertyTax(+e.target.value)} /></div>
        <div><label>Home insurance ({symbolMap[currency]}/yr)</label><input className="input" type="number" step={100} value={insurance} onChange={e => setInsurance(+e.target.value)} /></div>
        <div><label>HOA/fees ({symbolMap[currency]}/mo)</label><input className="input" type="number" step={10} value={hoa} onChange={e => setHoa(+e.target.value)} /></div>
        <div>
          <label>Currency</label>
          <select className="input" value={currency} onChange={e => setCurrency(e.target.value as typeof currencies[number])}>
            {currencies.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>
    </CalcShell>
  );
}
