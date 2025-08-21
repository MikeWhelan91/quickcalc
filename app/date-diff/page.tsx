"use client";
import { useMemo, useState } from "react";
import CalcShell from "../components/CalcShell";
import { differenceInDays } from "@/lib/dates";

export default function DateDiffPage(){
  const today = new Date().toISOString().slice(0,10);
  const [start, setStart] = useState<string>(today);
  const [end, setEnd] = useState<string>(today);

  const res = useMemo(()=>{
    const s = new Date(start); const e = new Date(end);
    if (isNaN(+s) || isNaN(+e)) return null;
    const days = differenceInDays(e, s);
    const weeks = +(days / 7).toFixed(2);
    return { days, weeks };
  }, [start, end]);

  return (
    <CalcShell title="Date Difference" subtitle="Days and weeks between two dates." result={
      res ? (<>
        <div className="kpi"><span>Total days</span><span>{res.days}</span></div>
        <div style={{height:10}}/>
        <div className="kpi"><span>Total weeks</span><span>{res.weeks}</span></div>
      </>) : (<div className="kpi"><span>Total days</span><span>—</span></div>)
    }>
      <div className="grid grid-2">
        <div><label>Start date</label><input className="input" type="date" value={start} onChange={e=>setStart(e.target.value)} /></div>
        <div><label>End date</label><input className="input" type="date" value={end} onChange={e=>setEnd(e.target.value)} /></div>
      </div>
    </CalcShell>
  );
}
