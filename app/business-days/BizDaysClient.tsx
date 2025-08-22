"use client";
import { useEffect, useState } from "react";
import CalcShell from "../components/CalcShell";

export default function BizDaysClient(){
  const today = new Date().toISOString().slice(0,10);
  const [start, setStart] = useState(today);
  const [end, setEnd] = useState(today);
  const [country, setCountry] = useState("IE");
  const [result, setResult] = useState<number | null>(null);

  async function calc(){
    const url = `/api/business-days?country=${country}&start=${start}&end=${end}`;
    const r = await fetch(url);
    const j = await r.json();
    setResult(j.businessDays);
  }

  useEffect(()=>{ calc().catch(()=>{}); }, [start, end, country]);

  return (
    <CalcShell title="Business Days Calculator" subtitle="Working days between dates (excludes weekends & public holidays)." result={
      <>
        <div className="kpi"><span>Business days</span><span>{result ?? "—"}</span></div>
        <p className="small">Powered by Nager.Date public holiday API.</p>
      </>
    }>
      <div className="grid grid-2">
        <div><label>Start date</label><input className="input" type="date" value={start} onChange={e=>setStart(e.target.value)} /></div>
        <div><label>End date</label><input className="input" type="date" value={end} onChange={e=>setEnd(e.target.value)} /></div>
        <div>
          <label>Country</label>
          <select className="input" value={country} onChange={e=>setCountry(e.target.value)}>
            <option value="IE">Ireland</option>
            <option value="GB">United Kingdom</option>
            <option value="US">United States</option>
            <option value="DE">Germany</option>
            <option value="FR">France</option>
            <option value="ES">Spain</option>
            <option value="IT">Italy</option>
            <option value="NL">Netherlands</option>
          </select>
        </div>
      </div>
    </CalcShell>
  );
}
