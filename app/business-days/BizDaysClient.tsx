"use client";
import { useEffect, useMemo, useState } from "react";
import CalcShell from "../components/CalcShell";
import "./styles.css";

type Result = {
  businessDays: number;
  weekendDays: number;
  holidayDays: number;
  calendarDays: number;
};

export default function BizDaysClient(){
  const today = new Date().toISOString().slice(0,10);
  const [start, setStart] = useState(today);
  const [end, setEnd] = useState(today);
  const [country, setCountry] = useState("IE");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function calc(){
    if (new Date(start) > new Date(end)) {
      setError('End date must be after start date.');
      setResult(null);
      return;
    }
    setError(null);
    const url = `/api/business-days?country=${country}&start=${start}&end=${end}`;
    const r = await fetch(url);
    const j = await r.json();
    if (r.ok) {
      setResult(j as Result);
      setError(null);
    } else {
      setError("Unable to reach holiday service. Try again later.");
      setResult(null);
    }
  }

  useEffect(()=>{
    calc().catch(() => {
      setError("Unable to reach holiday service. Try again later.");
      setResult(null);
    });
  }, [start, end, country]);

  const summary = useMemo(() => {
    if (!result) return null;
    const { businessDays, weekendDays, holidayDays, calendarDays } = result;
    const workingShare = calendarDays > 0 ? businessDays / calendarDays : 0;
    const weekendShare = calendarDays > 0 ? weekendDays / calendarDays : 0;
    const holidayShare = calendarDays > 0 ? holidayDays / calendarDays : 0;
    return {
      businessDays,
      weekendDays,
      holidayDays,
      calendarDays,
      workingShare,
      weekendShare,
      holidayShare,
      nonWorkDays: weekendDays + holidayDays
    };
  }, [result]);

  return (
    <CalcShell title="Business Days Calculator" subtitle="Working days between dates (excludes weekends & public holidays)." result={
      <div className="biz-result">
        <div className="biz-kpis">
          <div className="biz-card">
            <span className="label">Business days</span>
            <strong>{summary ? summary.businessDays : "—"}</strong>
          </div>
          <div className="biz-card">
            <span className="label">Non-working</span>
            <strong>{summary ? summary.nonWorkDays : "—"}</strong>
          </div>
          <div className="biz-card">
            <span className="label">Range length</span>
            <strong>{summary ? summary.calendarDays : "—"}</strong>
          </div>
        </div>
        {summary && (
          <div className="biz-bar" aria-hidden="true">
            <div className="segment weekend" style={{ width: `${summary.weekendShare * 100}%` }} title={`${summary.weekendDays} weekend days`} />
            <div className="segment holiday" style={{ width: `${summary.holidayShare * 100}%` }} title={`${summary.holidayDays} public holidays`} />
            <div className="segment work" style={{ width: `${summary.workingShare * 100}%` }} title={`${summary.businessDays} business days`} />
          </div>
        )}
        {summary && (
          <dl className="biz-legend">
            <div><span className="dot weekend" /> <dt>Weekend</dt><dd>{summary.weekendDays}</dd></div>
            <div><span className="dot holiday" /> <dt>Holidays</dt><dd>{summary.holidayDays}</dd></div>
            <div><span className="dot work" /> <dt>Business</dt><dd>{summary.businessDays}</dd></div>
          </dl>
        )}
        {error ? <p className="small" role="status">{error}</p> : <p className="small">Powered by the Nager.Date public holiday API.</p>}
      </div>
    }>
      <div className="grid grid-2">
        <div><label>Start date</label><input className="input" type="date" value={start} onChange={e=>setStart(e.target.value)}/></div>
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
            <option value="PT">Portugal</option>
            <option value="PL">Poland</option>
          </select>
        </div>
      </div>
    </CalcShell>
  );
}
