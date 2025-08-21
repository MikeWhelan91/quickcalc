"use client";
import { useMemo, useState } from "react";
import CalcShell from "../components/CalcShell";

export default function TipPage(){
  const [bill, setBill] = useState(80);
  const [tip, setTip] = useState(12.5);
  const [people, setPeople] = useState(2);

  const tipAmt = useMemo(()=> +(bill * tip / 100).toFixed(2), [bill, tip]);
  const total = useMemo(()=> +(bill + tipAmt).toFixed(2), [bill, tipAmt]);
  const per = useMemo(()=> people > 0 ? +(total / people).toFixed(2) : 0, [total, people]);

  return (
    <CalcShell title="Tip Calculator" subtitle="Split the bill and tips quickly." result={
      <>
        <div className="kpi"><span>Tip</span><span>€{tipAmt.toFixed(2)}</span></div>
        <div style={{height:10}}/>
        <div className="kpi"><span>Total</span><span>€{total.toFixed(2)}</span></div>
        <div style={{height:10}}/>
        <div className="kpi"><span>Per person</span><span>€{per.toFixed(2)}</span></div>
      </>
    }>
      <div className="grid grid-2">
        <div><label>Bill (€)</label><input className="input" type="number" step="0.01" value={bill} onChange={e=>setBill(+e.target.value)} /></div>
        <div><label>Tip (%)</label><input className="input" type="number" step="0.1" value={tip} onChange={e=>setTip(+e.target.value)} /></div>
        <div><label>People</label><input className="input" type="number" min={1} step={1} value={people} onChange={e=>setPeople(+e.target.value)} /></div>
      </div>
    </CalcShell>
  );
}
