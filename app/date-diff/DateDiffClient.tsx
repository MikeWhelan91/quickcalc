"use client";
import { useMemo, useState } from "react";
import { differenceInDays } from "@/lib/dates";
import { differenceInMonths, differenceInYears } from "date-fns";
import CalcShell from "../components/CalcShell";
import "./styles.css";

export default function DateDiffClient(){
  const today = new Date().toISOString().slice(0,10);
  const [start, setStart] = useState<string>(today);
  const [end, setEnd] = useState<string>(today);

  const res = useMemo(()=>{
    const s = new Date(start); const e = new Date(end);
    if (isNaN(+s) || isNaN(+e)) return null;
    const asc = s <= e ? { s, e } : { s: e, e: s };
    const days = differenceInDays(asc.e, asc.s);
    const weeks = +((days) / 7).toFixed(2);
    const months = differenceInMonths(asc.e, asc.s);
    const years = differenceInYears(asc.e, asc.s);
    const hours = days * 24;
    const minutes = hours * 60;
    return { days, weeks, months, years, hours, minutes, order: asc };
  }, [start, end]);

  const timelinePercent = useMemo(() => {
    if (!res || res.days === 0) return 0;
    const capped = Math.min(res.days, 365);
    return capped / 365;
  }, [res]);

  return (
    <CalcShell title="Date Difference" subtitle="Days, weeks and timeline insight between two dates." result={
      res ? (
        <div className="date-result">
          <div className="date-cards">
            <div className="date-card">
              <span className="label">Total days</span>
              <strong>{res.days}</strong>
            </div>
            <div className="date-card">
              <span className="label">Weeks</span>
              <strong>{res.weeks}</strong>
            </div>
            <div className="date-card">
              <span className="label">Months</span>
              <strong>{res.months}</strong>
            </div>
          </div>
          <div className="date-timeline">
            <span className="stamp">{res.order.s.toLocaleDateString()}</span>
            <div className="track">
              <div className="fill" style={{ width: `${timelinePercent * 100}%` }} />
              <span className="days">{res.days} days</span>
            </div>
            <span className="stamp">{res.order.e.toLocaleDateString()}</span>
          </div>
          <div className="date-grid">
            <div>
              <span className="label">Years</span>
              <strong>{res.years}</strong>
            </div>
            <div>
              <span className="label">Hours</span>
              <strong>{res.hours.toLocaleString()}</strong>
            </div>
            <div>
              <span className="label">Minutes</span>
              <strong>{res.minutes.toLocaleString()}</strong>
            </div>
          </div>
          <p className="small">Bar highlights up to one calendar year for quick comparisons.</p>
        </div>
      ) : (
        <div className="kpi"><span>Total days</span><span>—</span></div>
      )
    }>
      <div className="grid grid-2">
        <div><label>Start date</label><input className="input" type="date" value={start} onChange={e=>setStart(e.target.value)}/></div>
        <div><label>End date</label><input className="input" type="date" value={end} onChange={e=>setEnd(e.target.value)} /></div>
      </div>
    </CalcShell>
  );
}
