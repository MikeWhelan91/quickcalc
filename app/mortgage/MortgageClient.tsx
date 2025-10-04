"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import CalcShell from "../components/CalcShell";
import Tooltip from "../components/Tooltip";
import { schemas, CountryCode } from "@/lib/mortgage";
import "./styles.css";

const symbolMap: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  CAD: "$",
  AUD: "$",
  INR: "₹",
};

const RING_RADIUS = 88;
const RING_CIRC = 2 * Math.PI * RING_RADIUS;

export default function MortgageClient() {
  const countries = Object.keys(schemas) as CountryCode[];
  const router = useRouter();

  const [country, setCountry] = useState<CountryCode>("US");
  const schema = schemas[country];
  const [currency, setCurrency] = useState(schema.currency);
  const defaultValues = (() => {
    const d: Record<string, number> = {};
    ["basics", "recurring", "upfront"].forEach(group => {
      schema.fields[group as keyof typeof schema.fields].forEach(f => {
        d[f.id] = f.default;
      });
    });
    return d;
  })();
  const [values, setValues] = useState<Record<string, number>>(defaultValues);

  // initialise country from query/localStorage
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("country") as CountryCode | null;
    const stored = localStorage.getItem("mortgageCountry") as CountryCode | null;
    const init = query || stored || "US";
    setCountry(init);
  }, []);

  // when country changes, reset defaults and persist
  useEffect(() => {
    const s = schemas[country];
    setCurrency(s.currency);
    const defaults: Record<string, number> = {};
    ["basics", "recurring", "upfront"].forEach(group => {
      s.fields[group as keyof typeof s.fields].forEach(f => {
        defaults[f.id] = f.default;
      });
    });
    setValues(defaults);
    if (typeof window !== "undefined") {
      localStorage.setItem("mortgageCountry", country);
      const params = new URLSearchParams(window.location.search);
      params.set("country", country);
      router.replace(`?${params.toString()}`);
    }
  }, [country, router]);

  const update = (id: string, value: number) => {
    setValues(v => ({ ...v, [id]: value }));
  };

  const calc = useMemo(() => schema.calculate(values), [schema, values]);
  const formatter = useMemo(() => new Intl.NumberFormat(schema.locale, { style: "currency", currency }), [schema.locale, currency]);
  const breakdown = useMemo(() => {
    const monthly = calc.monthlyTotal || 0;
    const paymentShare = monthly > 0 ? calc.payment / monthly : 0;
    const extrasShare = monthly > 0 ? calc.extras / monthly : 0;
    return {
      paymentShare,
      extrasShare,
      extras: calc.extras,
      payment: calc.payment
    };
  }, [calc]);

  function renderFields(group: keyof typeof schema.fields, title: string) {
    return (
      <div className="form-section" style={{ gridColumn: "1 / -1" }}>
        <h3 className="section-title">{title}</h3>
        <div className="grid grid-2">
          {schema.fields[group].map(f => {
            let label = f.label;
            if (group === 'basics') {
              if (["price", "down"].includes(f.id)) label += ` (${symbolMap[currency]})`;
            } else if (group === 'recurring') {
              if (f.type !== 'percent') {
                if (f.annual) label += ` (${symbolMap[currency]}/yr)`;
                else label += ` (${symbolMap[currency]}/mo)`;
              }
            } else if (group === 'upfront') {
              if (f.type !== 'percent') label += ` (${symbolMap[currency]})`;
            }
            return (
              <div key={f.id} className="form-field">
                <div className="label-tooltip">
                  <label htmlFor={f.id}>{label}</label>
                  {f.tooltip && <Tooltip text={f.tooltip} />}
                </div>
                <input
                  id={f.id}
                  className="input"
                  type="number"
                  step={f.step || 1}
                  value={values[f.id] ?? ''}
                  onChange={e => update(f.id, +e.target.value)}
                  {...(f.tooltip ? { title: f.tooltip } : {})}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <CalcShell
      title="Mortgage Calculator"
      subtitle="Country-aware home loan estimates with taxes, insurance and fees."
      result={
        <div className="mortgage-result">
          <div className="mortgage-kpis">
            <div className="mortgage-card">
              <span className="label">Monthly ({currency})</span>
              <strong>{formatter.format(calc.monthlyTotal)}</strong>
            </div>
            <div className="mortgage-card">
              <span className="label">Total interest</span>
              <strong>{formatter.format(calc.interest)}</strong>
            </div>
            <div className="mortgage-card">
              <span className="label">Total paid</span>
              <strong>{formatter.format(calc.total)}</strong>
            </div>
          </div>
          <div className="mortgage-breakdown">
            <svg width="220" height="220" viewBox="0 0 220 220" role="presentation" aria-hidden="true">
              <defs>
                <linearGradient id="mortgagePrincipal" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--accent)" />
                  <stop offset="100%" stopColor="var(--primary)" />
                </linearGradient>
              </defs>
              <circle cx="110" cy="110" r={RING_RADIUS} stroke="rgba(15,31,58,0.08)" strokeWidth="26" fill="none" />
              <circle
                cx="110"
                cy="110"
                r={RING_RADIUS}
                stroke="url(#mortgagePrincipal)"
                strokeWidth="26"
                strokeDasharray={`${breakdown.paymentShare * RING_CIRC} ${(1 - breakdown.paymentShare) * RING_CIRC}`}
                strokeLinecap="butt"
                fill="none"
                transform="rotate(-90 110 110)"
              />
              <circle
                cx="110"
                cy="110"
                r={RING_RADIUS}
                stroke="color-mix(in oklab,var(--primary) 65%, var(--accent))"
                strokeWidth="26"
                strokeDasharray={`${breakdown.extrasShare * RING_CIRC} ${(1 - breakdown.extrasShare) * RING_CIRC}`}
                strokeDashoffset={-breakdown.paymentShare * RING_CIRC}
                strokeLinecap="butt"
                fill="none"
                transform="rotate(-90 110 110)"
              />
              <circle
                cx="110"
                cy="110"
                r="64"
                fill="color-mix(in oklab,var(--primary) 8%, var(--card))"
              />
              <text x="110" y="102" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--navy)">
                {formatter.format(calc.monthlyTotal)}
              </text>
              <text x="110" y="122" textAnchor="middle" fontSize="12" fill="var(--muted)">
                monthly cost
              </text>
            </svg>
            <dl className="mortgage-legend">
              <div><span className="dot principal" /> <dt>Principal & interest</dt><dd>{formatter.format(breakdown.payment)}</dd></div>
              <div><span className="dot extras" /> <dt>Taxes & fees</dt><dd>{formatter.format(breakdown.extras)}</dd></div>
            </dl>
          </div>
          {calc.upfront > 0 && (
            <div className="mortgage-upfront">
              <span className="label">Upfront costs</span>
              <strong>{formatter.format(calc.upfront)}</strong>
            </div>
          )}
          <p className="small">Estimates only. Taxes and fees are approximations.</p>
        </div>
      }
    >
      <div className="grid grid-2">
        <div>
          <div className="label-tooltip">
            <label htmlFor="country">Country</label>
          </div>
          <select
            id="country"
            className="input"
            value={country}
            onChange={e => setCountry(e.target.value as CountryCode)}
          >
            {countries.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <div className="label-tooltip">
            <label htmlFor="currency">Currency</label>
          </div>
          <select
            id="currency"
            className="input"
            value={currency}
            onChange={e => setCurrency(e.target.value)}
          >
            {[...new Set([schema.currency, 'USD', 'EUR', 'GBP'])].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        {renderFields('basics', 'Loan basics')}
        {renderFields('recurring', 'Recurring costs')}
        {renderFields('upfront', 'One-off costs')}
      </div>
    </CalcShell>
  );
}
