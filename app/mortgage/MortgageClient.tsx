"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import CalcShell from "../components/CalcShell";
import { schemas, CountryCode } from "@/lib/mortgage";

const symbolMap: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  CAD: "$",
  AUD: "$",
  INR: "₹",
};

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
              <div key={f.id}>
                <div className="label-tooltip">
                  <label htmlFor={f.id}>{label}</label>
                  {f.tooltip && (
                    <span className="tooltip-icon" title={f.tooltip} aria-label={f.tooltip}>?</span>
                  )}
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
        <>
          <div className="kpi"><span>Monthly ({currency})</span><span>{formatter.format(calc.monthlyTotal)}</span></div>
          <div style={{ height: 10 }} />
          <div className="kpi"><span>Total interest</span><span>{formatter.format(calc.interest)}</span></div>
          <div style={{ height: 10 }} />
          <div className="kpi"><span>Total paid</span><span>{formatter.format(calc.total)}</span></div>
          {calc.upfront > 0 && (
            <>
              <div style={{ height: 10 }} />
              <div className="kpi"><span>Upfront costs</span><span>{formatter.format(calc.upfront)}</span></div>
            </>
          )}
          <p className="small">Estimates only. Taxes and fees are approximations.</p>
        </>
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
