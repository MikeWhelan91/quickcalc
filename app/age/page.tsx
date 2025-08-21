"use client";
import { useMemo, useState } from "react";
import CalcShell from "../components/CalcShell";

function diffYMD(from: Date, to: Date){
  let y = to.getFullYear() - from.getFullYear();
  let m = to.getMonth() - from.getMonth();
  let d = to.getDate() - from.getDate();
  if (d < 0) { m -= 1; const prev = new Date(to.getFullYear(), to.getMonth(), 0).getDate(); d += prev; }
  if (m < 0) { y -= 1; m += 12; }
  return { y, m, d };
}

export default function AgePage(){
  const [dob, setDob] = useState<string>(()=> new Date().toISOString().slice(0,10));
  const res = useMemo(()=>{
    const from = new Date(dob); const now = new Date();
    if (isNaN(+from)) return null;
    const ymd = diffYMD(from, now);
    const days = Math.floor((now.getTime() - from.getTime()) / 86400000);
    return { ymd, days };
  }, [dob]);

  return (
    <CalcShell title="Age Calculator" subtitle="Exact age in years, months, and days." result={
      res ? (<>
        <div className="kpi"><span>Age</span><span>{res.ymd.y}y {res.ymd.m}m {res.ymd.d}d</span></div>
        <div style={{height:10}}/>
        <div className="kpi"><span>Days lived</span><span>{res.days.toLocaleString()}</span></div>
      </>) : (<div className="kpi"><span>Age</span><span>—</span></div>)
    }>
      <div className="grid">
        <div>
          <label>Date of birth</label>
          <input className="input" type="date" value={dob} onChange={e=>setDob(e.target.value)} />
        </div>
      </div>
    </CalcShell>
  );
}
