"use client";
import { useMemo, useState } from "react";
import { differenceInDays, differenceInWeeks, differenceInMonths, addYears } from "date-fns";
import CalcShell from "../components/CalcShell";
import AgeDial from "./AgeDial";
import "./styles.css";

const LIFE_EXPECTANCY_YEARS = 82;

function diffYMD(from: Date, to: Date){
  let y = to.getFullYear() - from.getFullYear();
  let m = to.getMonth() - from.getMonth();
  let d = to.getDate() - from.getDate();
  if (d < 0) { m -= 1; const prev = new Date(to.getFullYear(), to.getMonth(), 0).getDate(); d += prev; }
  if (m < 0) { y -= 1; m += 12; }
  return { y, m, d };
}

function nextBirthday(from: Date, now: Date){
  const candidate = new Date(now.getFullYear(), from.getMonth(), from.getDate());
  if (candidate < now) {
    return new Date(now.getFullYear() + 1, from.getMonth(), from.getDate());
  }
  return candidate;
}

function clamp(value: number, min: number, max: number){
  return Math.min(max, Math.max(min, value));
}

export default function AgeClient(){
  const [dob, setDob] = useState<string>(()=> new Date().toISOString().slice(0,10));
  const birthDate = useMemo(() => new Date(dob), [dob]);

  const res = useMemo(()=>{
    const from = birthDate;
    const now = new Date();
    if (Number.isNaN(+from)) return null;

    const ymd = diffYMD(from, now);
    const daysLived = differenceInDays(now, from);
    const weeksLived = differenceInWeeks(now, from);
    const monthsLived = differenceInMonths(now, from);
    const ageFraction = ymd.y + ymd.m / 12 + ymd.d / 365.25;
    const expectancyProgress = clamp(ageFraction / LIFE_EXPECTANCY_YEARS, 0, 1);

    const next = nextBirthday(from, now);
    const daysToNext = Math.max(0, differenceInDays(next, now));
    const milestone40 = addYears(from, 40);
    const milestone65 = addYears(from, 65);

    return {
      ymd,
      daysLived,
      weeksLived,
      monthsLived,
      expectancyProgress,
      nextBirthday: next,
      daysToNext,
      milestone40,
      milestone65,
      ageFraction
    };
  }, [birthDate]);

  return (
    <CalcShell title="Age Calculator" subtitle="Exact age with a live countdown to your next birthday." result={
      res ? (
        <div className="age-result">
          <AgeDial
            years={res.ymd.y}
            months={res.ymd.m}
            days={res.ymd.d}
            percent={res.expectancyProgress}
            expectancy={LIFE_EXPECTANCY_YEARS}
          />
          <div className="age-metrics">
            <div className="metric-card">
              <span className="metric-title">Days lived</span>
              <span className="metric-value">{res.daysLived.toLocaleString()}</span>
            </div>
            <div className="metric-card">
              <span className="metric-title">Weeks lived</span>
              <span className="metric-value">{res.weeksLived.toLocaleString()}</span>
            </div>
            <div className="metric-card">
              <span className="metric-title">Months lived</span>
              <span className="metric-value">{res.monthsLived.toLocaleString()}</span>
            </div>
            <div className="metric-card highlight">
              <span className="metric-title">Next birthday</span>
              <span className="metric-value">{res.daysToNext} days</span>
            </div>
          </div>
          <div className="age-timeline">
            <div className="timeline-row">
              <span>40 milestone</span>
              <div className="timeline-bar">
                <div
                  className="timeline-fill"
                  style={{ width: `${clamp(res.daysLived / differenceInDays(res.milestone40, birthDate) * 100, 0, 100)}%` }}
                />
              </div>
              <span>{res.milestone40.getFullYear()}</span>
            </div>
            <div className="timeline-row">
              <span>65 milestone</span>
              <div className="timeline-bar">
                <div
                  className="timeline-fill"
                  style={{ width: `${clamp(res.daysLived / differenceInDays(res.milestone65, birthDate) * 100, 0, 100)}%` }}
                />
              </div>
              <span>{res.milestone65.getFullYear()}</span>
            </div>
          </div>
          <p className="small">Life expectancy is set to {LIFE_EXPECTANCY_YEARS} years for visualisation.</p>
        </div>
      ) : (
        <div className="kpi"><span>Age</span><span>—</span></div>
      )
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
