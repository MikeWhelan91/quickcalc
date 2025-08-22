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
  const [fx, setFx] = useState<{ rates?: Record<string, number> }>({});

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

  // fx conversion
  useEffect(() => {
    const base = currency;
    const all = ["USD", "EUR", "GBP"];
    const symbols = all.filter(c => c !== base).join(",");
    fetch(`/api/fx?base=${base}&symbols=${symbols}`)
      .then(r => r.json())
      .then(setFx)
      .catch(() => {});
  }, [currency]);

  const update = (id: string, value: number) => {
    setValues(v => ({ ...v, [id]: value }));
  };

  const calc = useMemo(() => schema.calculate(values), [schema, values]);
  const formatter = useMemo(() => new Intl.NumberFormat(schema.locale, { style: "currency", currency }), [schema.locale, currency]);

  const conversions = Object.entries(fx.rates || {}).map(([code, rate]) => ({
    code,
    value: Math.round(calc.monthlyTotal * rate)
  }));

  function renderFields(group: keyof typeof schema.fields, title: string) {
    return (
      <>
        <div className="badge" style={{ gridColumn: "1 / -1", marginTop: 10 }}>{title}</div>
        {schema.fields[group].map(f => {
          let label = f.label;
          if (f.type === 'percent') label += ' (%)';
          else if (group === 'basics') {
            if (f.id === 'term') label += ' (years)';
            else if (f.id === 'rate') label += ' (% p.a.)';
            else label += ` (${symbolMap[currency]})`;
          } else if (group === 'recurring') {
            if (f.annual) label += ` (${symbolMap[currency]}/yr)`;
            else label += ` (${symbolMap[currency]}/mo)`;
          } else if (group === 'upfront') {
            label += ` (${symbolMap[currency]})`;
          }
          return (
            <div key={f.id}>
              <label title={f.tooltip}>{label}</label>
              <input
                className="input"
                type="number"
                step={f.step || 1}
                value={values[f.id] ?? ''}
                onChange={e => update(f.id, +e.target.value)}
              />
            </div>
          );
        })}
      </>
    );
  }

  return (
    <CalcShell
      title="Mortgage Calculator"
      subtitle="Country-aware home loan estimates with taxes, insurance and fees."
      result={
        <>
          <div className="kpi"><span>Monthly ({currency})</span><span>{formatter.format(calc.monthlyTotal)}</span></div>
          {conversions.map(c => (
            <div key={c.code}>
              <div style={{ height: 10 }} />
              <div className="kpi"><span>Monthly ({c.code})</span><span>{symbolMap[c.code as keyof typeof symbolMap] || ''}{c.value.toLocaleString()}</span></div>
            </div>
          ))}
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
          <label>Country</label>
          <select className="input" value={country} onChange={e => setCountry(e.target.value as CountryCode)}>
            {countries.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Currency</label>
          <select className="input" value={currency} onChange={e => setCurrency(e.target.value)}>
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
